import { COLORS } from './colors.js'
import type { Point } from './geometry.js'
import { roadsByVisual } from './structure.js'

export interface ConnectRoadsOpts {
  color?: string
  opacity?: number
}

/** Half of the 8 neighbours is enough: every pair is visited from one side. */
const ROAD_DIRS: readonly Point[] = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
]

/** Connects roads drawn with `structure(..., 'road')` the way the game does. */
export function connectRoads(visual: RoomVisual, opts: ConnectRoadsOpts = {}): RoomVisual {
  const roads = roadsByVisual.get(visual)
  if (!roads) return visual

  const color = opts.color || COLORS.road || 'white'
  for (const [rx, ry] of roads) {
    for (const [dx, dy] of ROAD_DIRS) {
      const cx = rx + dx
      const cy = ry + dy
      if (roads.some(([ox, oy]) => ox === cx && oy === cy)) {
        visual.line(rx, ry, cx, cy, { color, width: 0.35, opacity: opts.opacity || 1 })
      }
    }
  }

  return visual
}
