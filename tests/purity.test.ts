import { expect, it } from 'vitest'

it('importing the package needs no Screeps globals', async () => {
  expect('STRUCTURE_TOWER' in globalThis).toBe(false)
  const mod = await import('../src/index.js')
  expect(Object.keys(mod)).toContain('resource')
})
