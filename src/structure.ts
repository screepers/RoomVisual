import { COLORS as colors } from './colors.js'
import { closed, NONE, OFF, type Point, relPoly } from './geometry.js'

export interface StructureOpts {
  /** 0..1, defaults to 1 */
  opacity?: number
}

function factoryLevelGaps(): Point[] {
  let x = -0.08
  let y = -0.52
  const result: Point[] = []

  const gapAngle = 16 * (Math.PI / 180)
  const c1 = Math.cos(gapAngle)
  const s1 = Math.sin(gapAngle)

  const angle = 72 * (Math.PI / 180)
  const c2 = Math.cos(angle)
  const s2 = Math.sin(angle)

  for (let i = 0; i < 5; ++i) {
    result.push([0.0, 0.0])
    result.push([x, y])
    result.push([x * c1 - y * s1, x * s1 + y * c1])
    const tmpX = x * c2 - y * s2
    y = x * s2 + y * c2
    x = tmpX
  }
  return result
}

const FACTORY_OUTLINE: Point[] = [
  [-0.68, -0.11],
  [-0.84, -0.18],
  [-0.84, -0.32],
  [-0.44, -0.44],
  [-0.32, -0.84],
  [-0.18, -0.84],
  [-0.11, -0.68],

  [0.11, -0.68],
  [0.18, -0.84],
  [0.32, -0.84],
  [0.44, -0.44],
  [0.84, -0.32],
  [0.84, -0.18],
  [0.68, -0.11],

  [0.68, 0.11],
  [0.84, 0.18],
  [0.84, 0.32],
  [0.44, 0.44],
  [0.32, 0.84],
  [0.18, 0.84],
  [0.11, 0.68],

  [-0.11, 0.68],
  [-0.18, 0.84],
  [-0.32, 0.84],
  [-0.44, 0.44],
  [-0.84, 0.32],
  [-0.84, 0.18],
  [-0.68, 0.11],
]

const FACTORY_SPIKES: Point[] = [
  [-0.4, -0.1],
  [-0.8, -0.2],
  [-0.8, -0.3],
  [-0.4, -0.4],
  [-0.3, -0.8],
  [-0.2, -0.8],
  [-0.1, -0.4],

  [0.1, -0.4],
  [0.2, -0.8],
  [0.3, -0.8],
  [0.4, -0.4],
  [0.8, -0.3],
  [0.8, -0.2],
  [0.4, -0.1],

  [0.4, 0.1],
  [0.8, 0.2],
  [0.8, 0.3],
  [0.4, 0.4],
  [0.3, 0.8],
  [0.2, 0.8],
  [0.1, 0.4],

  [-0.1, 0.4],
  [-0.2, 0.8],
  [-0.3, 0.8],
  [-0.4, 0.4],
  [-0.8, 0.3],
  [-0.8, 0.2],
  [-0.4, 0.1],
]

const FACTORY_LEVEL_GAPS = /*#__PURE__*/ factoryLevelGaps()

const LINK_OUTER: Point[] = [
  [0.0, -0.5],
  [0.4, 0.0],
  [0.0, 0.5],
  [-0.4, 0.0],
]
const LINK_INNER: Point[] = [
  [0.0, -0.3],
  [0.25, 0.0],
  [0.0, 0.3],
  [-0.25, 0.0],
]

const TERMINAL_OUTER: Point[] = [
  [0.0, -0.8],
  [0.55, -0.55],
  [0.8, 0.0],
  [0.55, 0.55],
  [0.0, 0.8],
  [-0.55, 0.55],
  [-0.8, 0.0],
  [-0.55, -0.55],
]
const TERMINAL_INNER: Point[] = [
  [0.0, -0.65],
  [0.45, -0.45],
  [0.65, 0.0],
  [0.45, 0.45],
  [0.0, 0.65],
  [-0.45, 0.45],
  [-0.65, 0.0],
  [-0.45, -0.45],
]

const LAB_BOX: Point[] = [
  [-0.45, 0.3],
  [-0.45, 0.55],
  [0.45, 0.55],
  [0.45, 0.3],
]

const STORAGE_OUTLINE: Point[] = [
  [-0.45, -0.55],
  [0, -0.65],
  [0.45, -0.55],
  [0.55, 0],
  [0.45, 0.55],
  [0, 0.65],
  [-0.45, 0.55],
  [-0.55, 0],
  [-0.45, -0.55],
]

const NUKER_OUTLINE: Point[] = [
  [0, -1],
  [-0.47, 0.2],
  [-0.5, 0.5],
  [0.5, 0.5],
  [0.47, 0.2],
  [0, -1],
]
const NUKER_INLINE: Point[] = [
  [0, -0.8],
  [-0.4, 0.2],
  [0.4, 0.2],
  [0, -0.8],
]

/** Road positions per visual, consumed by `connectRoads`. */
export const roadsByVisual = new WeakMap<RoomVisual, Point[]>()

/** Draws `type` at `x`, `y`. Returns `visual` for chaining. */
export function structure(
  visual: RoomVisual,
  x: number,
  y: number,
  type: StructureConstant,
  opts: StructureOpts = {},
): RoomVisual {
  const opacity = opts.opacity ?? 1

  switch (type) {
    case STRUCTURE_FACTORY:
      visual.poly(relPoly(x, y, FACTORY_OUTLINE), {
        fill: NONE,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity,
      })
      // outer circle
      visual.circle(x, y, {
        radius: 0.65,
        fill: '#232323',
        strokeWidth: 0.035,
        stroke: '#140a0a',
        opacity,
      })
      visual.poly(relPoly(x, y, FACTORY_SPIKES), {
        fill: colors.gray,
        stroke: '#140a0a',
        strokeWidth: 0.04,
        opacity,
      })
      // factory level circle
      visual.circle(x, y, {
        radius: 0.54,
        fill: '#302a2a',
        strokeWidth: 0.04,
        stroke: '#140a0a',
        opacity,
      })
      visual.poly(relPoly(x, y, FACTORY_LEVEL_GAPS), {
        fill: '#140a0a',
        stroke: NONE,
        opacity,
      })
      // inner black circle
      visual.circle(x, y, { radius: 0.42, fill: '#140a0a', opacity })
      visual.rect(x - 0.24, y - 0.24, 0.48, 0.48, { fill: '#3f3f3f', opacity })
      break
    case STRUCTURE_EXTENSION:
      visual.circle(x, y, {
        radius: 0.5,
        fill: colors.dark,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity,
      })
      visual.circle(x, y, { radius: 0.35, fill: colors.gray, opacity })
      break
    case STRUCTURE_SPAWN:
      visual.circle(x, y, {
        radius: 0.65,
        fill: colors.dark,
        stroke: '#CCCCCC',
        strokeWidth: 0.1,
        opacity,
      })
      visual.circle(x, y, { radius: 0.4, fill: colors.energy, opacity })
      break
    case STRUCTURE_POWER_SPAWN:
      visual.circle(x, y, {
        radius: 0.65,
        fill: colors.dark,
        stroke: colors.power,
        strokeWidth: 0.1,
        opacity,
      })
      visual.circle(x, y, { radius: 0.4, fill: colors.energy, opacity })
      break
    case STRUCTURE_LINK:
      visual.poly(closed(relPoly(x, y, LINK_OUTER)), {
        fill: colors.dark,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity,
      })
      visual.poly(closed(relPoly(x, y, LINK_INNER)), {
        fill: colors.gray,
        stroke: OFF,
        opacity,
      })
      break
    case STRUCTURE_TERMINAL:
      visual.poly(closed(relPoly(x, y, TERMINAL_OUTER)), {
        fill: colors.dark,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity,
      })
      visual.poly(closed(relPoly(x, y, TERMINAL_INNER)), {
        fill: colors.light,
        stroke: OFF,
        opacity,
      })
      visual.rect(x - 0.45, y - 0.45, 0.9, 0.9, {
        fill: colors.gray,
        stroke: colors.dark,
        strokeWidth: 0.1,
        opacity,
      })
      break
    case STRUCTURE_LAB:
      visual.circle(x, y - 0.025, {
        radius: 0.55,
        fill: colors.dark,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity,
      })
      visual.circle(x, y - 0.025, { radius: 0.4, fill: colors.gray, opacity })
      visual.rect(x - 0.45, y + 0.3, 0.9, 0.25, {
        fill: colors.dark,
        stroke: OFF,
        opacity,
      })
      visual.poly(relPoly(x, y, LAB_BOX), {
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity,
      })
      break
    case STRUCTURE_TOWER:
      visual.circle(x, y, {
        radius: 0.6,
        fill: colors.dark,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity,
      })
      visual.rect(x - 0.4, y - 0.3, 0.8, 0.6, { fill: colors.gray, opacity })
      visual.rect(x - 0.2, y - 0.9, 0.4, 0.5, {
        fill: colors.light,
        stroke: colors.dark,
        strokeWidth: 0.07,
        opacity,
      })
      break
    case STRUCTURE_ROAD: {
      visual.circle(x, y, { radius: 0.175, fill: colors.road, stroke: OFF, opacity })
      let roads = roadsByVisual.get(visual)
      if (!roads) {
        roads = []
        roadsByVisual.set(visual, roads)
      }
      roads.push([x, y])
      break
    }
    case STRUCTURE_RAMPART:
      visual.circle(x, y, {
        radius: 0.65,
        fill: '#434C43',
        stroke: '#5D735F',
        strokeWidth: 0.1,
        opacity,
      })
      break
    case STRUCTURE_WALL:
      visual.circle(x, y, {
        radius: 0.4,
        fill: colors.dark,
        stroke: colors.light,
        strokeWidth: 0.05,
        opacity,
      })
      break
    case STRUCTURE_STORAGE:
      visual.poly(relPoly(x, y, STORAGE_OUTLINE), {
        stroke: colors.outline,
        strokeWidth: 0.05,
        fill: colors.dark,
        opacity,
      })
      visual.rect(x - 0.35, y - 0.45, 0.7, 0.9, { fill: colors.energy, opacity })
      break
    case STRUCTURE_OBSERVER:
      visual.circle(x, y, {
        fill: colors.dark,
        radius: 0.45,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity,
      })
      visual.circle(x + 0.225, y, { fill: colors.outline, radius: 0.2, opacity })
      break
    case STRUCTURE_NUKER:
      visual.poly(relPoly(x, y, NUKER_OUTLINE), {
        stroke: colors.outline,
        strokeWidth: 0.05,
        fill: colors.dark,
        opacity,
      })
      visual.poly(relPoly(x, y, NUKER_INLINE), {
        stroke: colors.outline,
        strokeWidth: 0.01,
        fill: colors.gray,
        opacity,
      })
      break
    case STRUCTURE_CONTAINER:
      visual.rect(x - 0.225, y - 0.3, 0.45, 0.6, {
        fill: colors.gray,
        opacity,
        stroke: colors.dark,
        strokeWidth: 0.09,
      })
      visual.rect(x - 0.17, y + 0.07, 0.34, 0.2, { fill: colors.energy, opacity })
      break
    default:
      visual.circle(x, y, {
        fill: colors.light,
        radius: 0.35,
        stroke: colors.dark,
        strokeWidth: 0.2,
        opacity,
      })
      break
  }

  return visual
}
