export type Point = [number, number]

/** Translate every point of `poly` by (x, y). Does not mutate the input. */
export function relPoly(x: number, y: number, poly: readonly Point[]): Point[] {
  return poly.map(([px, py]): Point => [px + x, py + y])
}

/** Repeat the first point at the end so the polygon is closed. */
export function closed(poly: Point[]): Point[] {
  const first = poly[0]
  return first ? [...poly, first] : poly
}

export function rotate(x: number, y: number, s: number, c: number, px: number, py: number): Point {
  return [px + (x * c - y * s), py + (x * s + y * c)]
}

/**
 * The renderer treats a falsy `stroke`/`fill` as "off", but the Screeps typings only allow
 * strings. These keep the original drawing calls intact without sprinkling casts.
 */
export const OFF = false as never
export const NONE = null as never
