import { chromium, expect, test } from '@playwright/test'
import path from 'node:path'

test('loads the built extension', async () => {
  const extensionPath = path.resolve('build/chrome-mv3-prod')
  const context = await chromium.launchPersistentContext('', {
    channel: 'chromium',
    headless: false,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`]
  })
  try {
    let worker = context.serviceWorkers()[0]
    worker ??= await context.waitForEvent('serviceworker')
    expect(worker.url()).toContain('chrome-extension://')
  } finally {
    await context.close()
  }
})
