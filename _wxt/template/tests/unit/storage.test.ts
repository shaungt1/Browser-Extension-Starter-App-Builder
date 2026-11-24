import { beforeEach, describe, expect, it } from 'vitest'
import { fakeBrowser } from 'wxt/testing/fake-browser'
import { settingsStorage } from '../../src/core/storage'

describe('settings storage', () => {
  beforeEach(() => fakeBrowser.reset())

  it('uses secure defaults', async () => {
    expect(await settingsStorage.getValue()).toEqual({ apiEnabled: false })
  })
})
