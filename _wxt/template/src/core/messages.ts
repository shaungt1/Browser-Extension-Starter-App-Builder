import { defineExtensionMessaging } from '@webext-core/messaging'

export interface ExtensionProtocol {
  getStatus(): { ready: boolean; framework: 'wxt' }
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ExtensionProtocol>()
