import { animatedPosition } from './animatedPosition.js'
import { demo } from './demo.js'
import { resource } from './resource.js'
import { connectRoads } from './roads.js'
import { speech } from './speech.js'
import { structure } from './structure.js'

declare global {
  interface RoomVisual {
    /** Draws `type` at `x`, `y`. */
    structure(
      x: number,
      y: number,
      type: StructureConstant,
      opts?: import('./structure.js').StructureOpts,
    ): RoomVisual
    /** Connects roads drawn with `.structure()` the way the game would. */
    connectRoads(opts?: import('./roads.js').ConnectRoadsOpts): RoomVisual
    /** Simulates `creep.say()` through room visuals. */
    speech(text: string, x: number, y: number, opts?: import('./speech.js').SpeechOpts): RoomVisual
    /** Animates a marker at `x`, `y`. */
    animatedPosition(
      x: number,
      y: number,
      opts?: import('./animatedPosition.js').AnimatedPositionOpts,
    ): RoomVisual
    /** Clears the visual and draws a few structures near (19, 24) for a quick preview. */
    test(): RoomVisual
    /** Draws a resource badge. Returns `OK` or `ERR_INVALID_ARGS`. */
    resource(type: ResourceConstant | string, x: number, y: number, size?: number): 0 | -10
  }
}

/**
 * Adds `structure`, `connectRoads`, `speech`, `animatedPosition`, `resource` and `test` to
 * `RoomVisual.prototype`. Pass a different prototype to install elsewhere (e.g. in tests).
 */
export function install(proto: RoomVisual = RoomVisual.prototype): void {
  proto.structure = function (x, y, type, opts) {
    return structure(this, x, y, type, opts)
  }
  proto.connectRoads = function (opts) {
    return connectRoads(this, opts)
  }
  proto.speech = function (text, x, y, opts) {
    return speech(this, text, x, y, opts)
  }
  proto.animatedPosition = function (x, y, opts) {
    return animatedPosition(this, x, y, opts)
  }
  proto.test = function () {
    return demo(this)
  }
  proto.resource = function (type, x, y, size) {
    return resource(this, type, x, y, size)
  }
}
