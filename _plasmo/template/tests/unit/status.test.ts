import { describe, expect, it } from 'vitest'
import { createStatus } from '../../core/status'

describe('extension status', () => {
  it('reports the active framework', () => {
    expect(createStatus()).toEqual({ ready: true, framework: 'plasmo' })
  })
})
