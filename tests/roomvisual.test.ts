import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  animatedPosition,
  connectRoads,
  demo,
  install,
  resource,
  speech,
  structure,
} from '../src/index.js'

import { stubScreepsGlobals } from './globals.js'

beforeEach(stubScreepsGlobals)

type Call = [method: string, ...args: unknown[]]

/** A RoomVisual stand-in that records draw calls. */
function fakeVisual() {
  const calls: Call[] = []
  const v = {} as Record<string, unknown>
  for (const m of ['circle', 'rect', 'poly', 'line', 'text']) {
    v[m] = (...args: unknown[]) => {
      calls.push([m, ...args])
      return v
    }
  }
  return { visual: v as unknown as RoomVisual, calls }
}

const STRUCTURES: StructureConstant[] = [
  'spawn',
  'extension',
  'road',
  'constructedWall',
  'rampart',
  'keeperLair',
  'portal',
  'controller',
  'link',
  'storage',
  'tower',
  'observer',
  'powerBank',
  'powerSpawn',
  'extractor',
  'lab',
  'terminal',
  'container',
  'nuker',
  'factory',
  'invaderCore',
]

describe('structure', () => {
  it.each(STRUCTURES)('draws %s and returns the visual', (type) => {
    const { visual, calls } = fakeVisual()
    expect(structure(visual, 10, 10, type)).toBe(visual)
    expect(calls.length).toBeGreaterThan(0)
  })

  it('applies opacity and does not leak into later calls', () => {
    const a = fakeVisual()
    structure(a.visual, 1, 1, 'tower', { opacity: 0.3 })
    expect(a.calls.every((c) => (c[c.length - 1] as { opacity: number }).opacity === 0.3)).toBe(
      true,
    )
    const b = fakeVisual()
    structure(b.visual, 1, 1, 'tower')
    expect(b.calls.every((c) => (c[c.length - 1] as { opacity: number }).opacity === 1)).toBe(true)
  })
})

describe('connectRoads', () => {
  it('does nothing without roads', () => {
    const { visual, calls } = fakeVisual()
    expect(connectRoads(visual)).toBe(visual)
    expect(calls).toEqual([])
  })

  it('connects orthogonal and diagonal neighbours once, skipping distant roads', () => {
    const { visual, calls } = fakeVisual()
    for (const [x, y] of [
      [5, 5],
      [6, 5],
      [7, 6],
      [20, 20],
    ] as const)
      structure(visual, x, y, 'road')
    calls.length = 0
    connectRoads(visual)
    const lines = calls.filter((c) => c[0] === 'line').map((c) => c.slice(1, 5))
    expect(lines).toEqual([
      [5, 5, 6, 5],
      [6, 5, 7, 6],
    ])
  })
})

describe('resource', () => {
  it.each(['energy', 'power', 'H', 'X', 'GH2O', 'XGHO2', 'symbol_aleph'])('draws %s', (type) => {
    const { visual, calls } = fakeVisual()
    expect(resource(visual, type, 1, 1)).toBe(0)
    expect(calls.length).toBeGreaterThan(0)
  })

  it('rejects unknown resources', () => {
    const { visual, calls } = fakeVisual()
    expect(resource(visual, 'nope', 1, 1)).toBe(-10)
    expect(calls).toEqual([])
  })

  it('uses subscript 2 in compound labels', () => {
    const { visual, calls } = fakeVisual()
    resource(visual, 'UH2O', 1, 1)
    expect(calls[0]?.[1]).toBe('UH₂O')
  })
})

describe('speech', () => {
  it('draws a pointer and text with defaults', () => {
    const { visual, calls } = fakeVisual()
    speech(visual, 'hi', 10, 10)
    expect(calls.map((c) => c[0])).toEqual(['poly', 'text'])
    expect(calls[1]?.[4]).toMatchObject({ font: '0.5 Times New Roman' })
  })
})

describe('animatedPosition', () => {
  beforeEach(() => vi.stubGlobal('Game', { time: 3 }))

  it('draws a closed diamond', () => {
    const { visual, calls } = fakeVisual()
    animatedPosition(visual, 10, 10)
    const points = calls[0]?.[1] as number[][]
    expect(points).toHaveLength(5)
    expect(points[0]).toEqual(points[4])
  })
})

describe('symbols', () => {
  it("uses the game's values, even where they differ from the constant name", async () => {
    // mod-season2 really defines RESOURCE_SYMBOL_SIN as 'symbol_sim'.
    // The lookup table is cached per module instance, so load a fresh one.
    vi.stubGlobal('RESOURCE_SYMBOL_SIN', 'symbol_sim')
    vi.resetModules()
    const fresh = await import('../src/index.js')
    const { visual, calls } = fakeVisual()
    expect(fresh.resource(visual, 'symbol_sim', 1, 1)).toBe(0)
    expect(calls.length).toBeGreaterThan(0)
  })
})

describe('symbol size', () => {
  const halfWidth = (size?: number) => {
    const { visual, calls } = fakeVisual()
    resource(visual, 'symbol_aleph', 10, 10, size)
    const points = calls.find((c) => c[0] === 'poly')?.[1] as [number, number][]
    const xs = points.map(([px]) => px)
    return (Math.max(...xs) - Math.min(...xs)) / 2
  }

  it('defaults to one full tile wide, as before', () => {
    expect(halfWidth()).toBeCloseTo(0.5, 1)
  })

  it('keeps the default glyph metrics unchanged', () => {
    const { visual, calls } = fakeVisual()
    resource(visual, 'symbol_aleph', 10, 10)
    const text = calls.find((c) => c[0] === 'text')
    expect(text?.[4]).toMatchObject({ font: 'bold 0.2 arial' })
    expect(text?.[3]).toBeCloseTo(10.0875, 5)
  })

  it('treats size as a radius, like the other badges', () => {
    expect(halfWidth(0.5)).toBeCloseTo(0.5, 1)
    expect(halfWidth(0.25)).toBeCloseTo(0.25, 1)
    expect(halfWidth(1)).toBeCloseTo(1, 1)
  })
})

describe('demo', () => {
  it('clears the visual, then draws six structures', () => {
    const { visual, calls } = fakeVisual()
    const clear = vi.fn()
    ;(visual as unknown as { clear: () => void }).clear = clear
    expect(demo(visual)).toBe(visual)
    expect(clear).toHaveBeenCalledOnce()
    expect(calls.length).toBeGreaterThan(6)
  })
})

describe('install', () => {
  it('adds chainable methods to the given prototype', () => {
    const proto = {} as RoomVisual
    install(proto)
    for (const m of [
      'structure',
      'connectRoads',
      'speech',
      'animatedPosition',
      'resource',
    ] as const) {
      expect(typeof proto[m]).toBe('function')
    }
    const { visual } = fakeVisual()
    const v = Object.assign(visual, proto)
    expect(v.structure(1, 1, 'spawn')).toBe(v)
    expect(v.resource('energy', 1, 1)).toBe(0)
  })
})
