import { resource } from './resource.js'
import { connectRoads } from './roads.js'
import { structure } from './structure.js'

/**
 * Clears the visual and draws a sample of everything near (19, 24), for a quick visual preview:
 * structures, connected roads, resource badges and (on servers that have them) symbol badges.
 */
export function demo(visual: RoomVisual): RoomVisual {
  const x = 19
  visual.clear()

  const row = (y: number, types: StructureConstant[]) => {
    types.forEach((type, i) => {
      structure(visual, x + i, y, type)
    })
  }
  row(24, [
    STRUCTURE_LAB,
    STRUCTURE_TOWER,
    STRUCTURE_LINK,
    STRUCTURE_TERMINAL,
    STRUCTURE_EXTENSION,
    STRUCTURE_SPAWN,
  ])
  row(27, [
    STRUCTURE_POWER_SPAWN,
    STRUCTURE_STORAGE,
    STRUCTURE_OBSERVER,
    STRUCTURE_NUKER,
    STRUCTURE_FACTORY,
    STRUCTURE_CONTAINER,
  ])
  row(30, [STRUCTURE_RAMPART, STRUCTURE_WALL, STRUCTURE_ROAD, STRUCTURE_ROAD, STRUCTURE_ROAD])
  structure(visual, x + 3, 31, STRUCTURE_ROAD)
  connectRoads(visual)

  const resources: ResourceConstant[] = [
    RESOURCE_ENERGY,
    RESOURCE_POWER,
    RESOURCE_HYDROGEN,
    RESOURCE_CATALYST,
    RESOURCE_HYDROXIDE,
    RESOURCE_UTRIUM_ACID,
    RESOURCE_CATALYZED_GHODIUM_ALKALIDE,
  ]
  resources.forEach((type, i) => {
    resource(visual, type, x + i, 34)
  })

  const symbols = (globalThis as { SYMBOLS?: string[] }).SYMBOLS ?? []
  symbols.forEach((type, i) => {
    resource(visual, type, x + (i % 11), 36 + Math.floor(i / 11) * 2)
  })

  return visual
}
