// Type-checked against the built package (run `pnpm build` first). Importing only the side-effect
// entry must be enough to get the RoomVisual method typings.
import '@screepers/room-visual/register'

declare const visual: RoomVisual

visual
  .structure(10, 10, STRUCTURE_TOWER, { opacity: 0.5 })
  .connectRoads({ color: 'red' })
  .speech('hello', 5, 5)
  .animatedPosition(1, 1)
  .test()

const code: 0 | -10 = visual.resource(RESOURCE_ENERGY, 1, 1, 0.5)
void code
