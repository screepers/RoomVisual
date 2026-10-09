import { install } from './install.js'

// Side-effect entry point: `require('@screepers/room-visual/register')` patches RoomVisual.prototype.
install()

// Re-exported on purpose: the global `RoomVisual` method typings live next to `install`, and
// without a value export the bundler drops them, leaving register.d.ts as an empty `export {}`.
export { install }
