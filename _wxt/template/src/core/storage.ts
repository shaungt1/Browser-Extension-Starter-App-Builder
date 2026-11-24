import { storage } from '#imports'

export const settingsStorage = storage.defineItem<{ apiEnabled: boolean }>('local:settings', {
  defaultValue: { apiEnabled: false }
})
