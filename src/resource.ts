import { COLOR_SETS as sets } from './colors.js'
import { relPoly } from './geometry.js'

type ColorPair = readonly [fill: string, text: string]

// The Screeps constants are globals, so every table is built on first use rather than at import
// time. That keeps this module free of side effects and importable outside the game.
let colorsCache: Partial<Record<ResourceConstant, ColorPair>> | undefined
function resourceColors() {
  colorsCache ??= {
    [RESOURCE_ENERGY]: sets.yellow,
    [RESOURCE_POWER]: sets.red,

    [RESOURCE_HYDROGEN]: sets.grey,
    [RESOURCE_OXYGEN]: sets.grey,
    [RESOURCE_UTRIUM]: sets.blue,
    [RESOURCE_LEMERGIUM]: sets.green,
    [RESOURCE_KEANIUM]: sets.purple,
    [RESOURCE_ZYNTHIUM]: sets.yellow,
    [RESOURCE_CATALYST]: sets.red,
    [RESOURCE_GHODIUM]: sets.white,

    [RESOURCE_HYDROXIDE]: sets.grey,
    [RESOURCE_ZYNTHIUM_KEANITE]: sets.grey,
    [RESOURCE_UTRIUM_LEMERGITE]: sets.grey,

    [RESOURCE_UTRIUM_HYDRIDE]: sets.blue,
    [RESOURCE_UTRIUM_OXIDE]: sets.blue,
    [RESOURCE_KEANIUM_HYDRIDE]: sets.purple,
    [RESOURCE_KEANIUM_OXIDE]: sets.purple,
    [RESOURCE_LEMERGIUM_HYDRIDE]: sets.green,
    [RESOURCE_LEMERGIUM_OXIDE]: sets.green,
    [RESOURCE_ZYNTHIUM_HYDRIDE]: sets.yellow,
    [RESOURCE_ZYNTHIUM_OXIDE]: sets.yellow,
    [RESOURCE_GHODIUM_HYDRIDE]: sets.white,
    [RESOURCE_GHODIUM_OXIDE]: sets.white,

    [RESOURCE_UTRIUM_ACID]: sets.blue,
    [RESOURCE_UTRIUM_ALKALIDE]: sets.blue,
    [RESOURCE_KEANIUM_ACID]: sets.purple,
    [RESOURCE_KEANIUM_ALKALIDE]: sets.purple,
    [RESOURCE_LEMERGIUM_ACID]: sets.green,
    [RESOURCE_LEMERGIUM_ALKALIDE]: sets.green,
    [RESOURCE_ZYNTHIUM_ACID]: sets.yellow,
    [RESOURCE_ZYNTHIUM_ALKALIDE]: sets.yellow,
    [RESOURCE_GHODIUM_ACID]: sets.white,
    [RESOURCE_GHODIUM_ALKALIDE]: sets.white,

    [RESOURCE_CATALYZED_UTRIUM_ACID]: sets.blue,
    [RESOURCE_CATALYZED_UTRIUM_ALKALIDE]: sets.blue,
    [RESOURCE_CATALYZED_KEANIUM_ACID]: sets.purple,
    [RESOURCE_CATALYZED_KEANIUM_ALKALIDE]: sets.purple,
    [RESOURCE_CATALYZED_LEMERGIUM_ACID]: sets.green,
    [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE]: sets.green,
    [RESOURCE_CATALYZED_ZYNTHIUM_ACID]: sets.yellow,
    [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE]: sets.yellow,
    [RESOURCE_CATALYZED_GHODIUM_ACID]: sets.white,
    [RESOURCE_CATALYZED_GHODIUM_ALKALIDE]: sets.white,
  }
  return colorsCache
}

function isMineral(type: ResourceConstant): boolean {
  return (
    type === RESOURCE_CATALYST ||
    type === RESOURCE_HYDROGEN ||
    type === RESOURCE_OXYGEN ||
    type === RESOURCE_LEMERGIUM ||
    type === RESOURCE_UTRIUM ||
    type === RESOURCE_ZYNTHIUM ||
    type === RESOURCE_KEANIUM
  )
}

// Symbol resources only exist on seasonal servers, and aren't in @types/screeps, so they are
// looked up by global name. On servers without them the table is simply empty.
const SYMBOL_DEFS: readonly [global: string, glyph: string, color: string][] = [
  ['RESOURCE_SYMBOL_ALEPH', '𐤀', '#C63946'],
  ['RESOURCE_SYMBOL_BETH', '𐤁', '#B72E6F'],
  ['RESOURCE_SYMBOL_GIMMEL', '𐤂', '#B72FA5'],
  ['RESOURCE_SYMBOL_DALETH', '𐤃', '#A334B7'],
  ['RESOURCE_SYMBOL_HE', '𐤄', '#9D41ED'],
  ['RESOURCE_SYMBOL_WAW', '𐤅', '#8441ED'],
  ['RESOURCE_SYMBOL_ZAYIN', '𐤆', '#6E49FF'],
  ['RESOURCE_SYMBOL_HETH', '𐤇', '#4E71FF'],
  ['RESOURCE_SYMBOL_TETH', '𐤈', '#5088F4'],
  ['RESOURCE_SYMBOL_YODH', '𐤉', '#3DA1EA'],
  ['RESOURCE_SYMBOL_KAPH', '𐤊', '#38A9C7'],
  ['RESOURCE_SYMBOL_LAMEDH', '𐤋', '#35B7B5'],
  ['RESOURCE_SYMBOL_MEM', '𐤌', '#36B79A'],
  ['RESOURCE_SYMBOL_NUN', '𐤍', '#33B75D'],
  ['RESOURCE_SYMBOL_SAMEKH', '𐤎', '#3FB147'],
  ['RESOURCE_SYMBOL_AYIN', '𐤏', '#69A239'],
  ['RESOURCE_SYMBOL_PE', '𐤐', '#7EA232'],
  ['RESOURCE_SYMBOL_TSADE', '𐤑', '#9FA23B'],
  ['RESOURCE_SYMBOL_QOPH', '𐤒', '#BB933A'],
  ['RESOURCE_SYMBOL_RES', '𐤓', '#D88942'],
  ['RESOURCE_SYMBOL_SIN', '𐤔', '#DC763D'],
  ['RESOURCE_SYMBOL_TAW', '𐤕', '#D64B3D'],
]

let symbolsCache: Map<string, { glyph: string; color: string }> | undefined
function symbols() {
  if (!symbolsCache) {
    const g = globalThis as unknown as Record<string, string | undefined>
    symbolsCache = new Map()
    for (const [name, glyph, color] of SYMBOL_DEFS) {
      const value = g[name]
      if (value) symbolsCache.set(value, { glyph, color })
    }
  }
  return symbolsCache
}

const SYMBOL_OUTLINE = /*#__PURE__*/ (
  [
    [64, 128],
    [24.45, 121.78],
    [6.31, 86.07],
    [0, 46.52],
    [28.35, 18.23],
    [64, 0],
    [99.65, 18.23],
    [128, 46.52],
    [121.69, 86.07],
    [103.55, 121.78],
    [64, 128],
  ] as const
).map(([px, py]): [number, number] => [(px - 64) / 128, (py - 64) / 128])

function fluid(visual: RoomVisual, type: ResourceConstant, x: number, y: number, size: number) {
  const [fill, text] = resourceColors()[type] ?? sets.grey
  visual.circle(x, y, { radius: size, fill, opacity: 1 })
  visual.text(type[0] ?? '', x, y - size * 0.1, {
    font: size * 1.5,
    color: text,
    backgroundColor: fill,
    backgroundPadding: 0,
  })
}

function mineral(visual: RoomVisual, type: ResourceConstant, x: number, y: number, size: number) {
  const [fill, text] = resourceColors()[type] ?? sets.grey
  visual.circle(x, y, { radius: size, fill, opacity: 1 })
  visual.circle(x, y, { radius: size * 0.8, fill: text, opacity: 1 })
  visual.text(type, x, y + size * 0.03, {
    font: `bold ${size * 1.25} arial`,
    color: fill,
    backgroundColor: text,
    backgroundPadding: 0,
  })
}

function compound(visual: RoomVisual, type: ResourceConstant, x: number, y: number, size: number) {
  const [fill, text] = resourceColors()[type] ?? sets.grey
  visual.text(type.replace('2', '₂'), x, y, {
    font: `bold ${size} arial`,
    color: text,
    backgroundColor: fill,
    backgroundPadding: 0.3 * size,
  })
}

/** Default `size`. Symbol outlines are drawn 1 tile wide at this size and scale linearly from it. */
const DEFAULT_SIZE = 0.25

function symbol(visual: RoomVisual, type: string, x: number, y: number, size: number) {
  const s = symbols().get(type)
  if (!s) return
  const scale = size / DEFAULT_SIZE
  const outline = SYMBOL_OUTLINE.map(([px, py]): [number, number] => [px * scale, py * scale])
  visual.poly(relPoly(x, y, outline), {
    opacity: 1,
    fill: s.color,
    stroke: 'transparent',
  })
  visual.text(s.glyph, x, y + size * 0.35, {
    font: `bold ${size * 0.8} arial`,
    color: 'black',
  })
}

/**
 * Draws a resource badge. Returns `OK` (0), or `ERR_INVALID_ARGS` (-10) for unknown resources.
 */
export function resource(
  visual: RoomVisual,
  type: ResourceConstant | string,
  x: number,
  y: number,
  size = DEFAULT_SIZE,
): 0 | -10 {
  const res = type as ResourceConstant
  if (res === RESOURCE_ENERGY || res === RESOURCE_POWER) fluid(visual, res, x, y, size)
  else if (isMineral(res)) mineral(visual, res, x, y, size)
  else if (resourceColors()[res] !== undefined) compound(visual, res, x, y, size)
  else if (symbols().has(type)) symbol(visual, type, x, y, size)
  else return ERR_INVALID_ARGS
  return OK
}
