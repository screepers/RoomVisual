import { rotate } from './geometry.js'

export interface AnimatedPositionOpts {
  color?: string
  opacity?: number
  radius?: number
  /** Frames per animation cycle */
  frames?: number
}

/** Animates a marker at `x`, `y`. Uses `Game.time` as the clock. */
export function animatedPosition(
  visual: RoomVisual,
  x: number,
  y: number,
  opts: AnimatedPositionOpts = {},
): RoomVisual {
  const color = opts.color || 'blue'
  const opacity = opts.opacity || 0.5
  const frames = opts.frames || 6
  let radius = opts.radius || 0.75

  const angle = (((Game.time % frames) * 90) / frames) * (Math.PI / 180)
  const s = Math.sin(angle)
  const c = Math.cos(angle)

  const sizeMod = Math.abs((Game.time % frames) - frames / 2) / 10
  radius += radius * sizeMod

  const points = [
    rotate(0, -radius, s, c, x, y),
    rotate(radius, 0, s, c, x, y),
    rotate(0, radius, s, c, x, y),
    rotate(-radius, 0, s, c, x, y),
    rotate(0, -radius, s, c, x, y),
  ]

  visual.poly(points, { stroke: color, opacity })

  return visual
}
