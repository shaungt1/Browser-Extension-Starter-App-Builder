import type { PlasmoCSConfig } from 'plasmo'

// Replace this example origin with the narrowest host pattern your feature needs.
export const config: PlasmoCSConfig = { matches: ['https://example.com/*'] }
document.documentElement.dataset.extensionReady = 'true'
