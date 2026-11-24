import { Storage } from '@plasmohq/storage'

export const extensionStorage = new Storage({ area: 'local' })
export const SETTINGS_KEY = 'settings'
export const defaultSettings = { apiEnabled: false }
