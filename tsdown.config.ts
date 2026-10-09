import { defineConfig } from 'tsdown'

export default defineConfig([
  // npm package: ESM + CJS + types. `index` is side-effect free (tree-shakable),
  // `register` patches RoomVisual.prototype on import.
  {
    entry: { index: 'src/index.ts', register: 'src/register.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    platform: 'neutral',
  },
  // Single file for dropping straight into a Screeps code folder.
  {
    entry: { RoomVisual: 'src/register.ts' },
    format: 'cjs',
    outDir: 'dist/screeps',
    outExtensions: () => ({ js: '.js' }),
    dts: false,
    clean: false,
    platform: 'neutral',
  },
])
