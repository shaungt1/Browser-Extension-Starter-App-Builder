import { onMessage } from '../core/messages'

export default defineBackground(() => {
  onMessage('getStatus', () => ({ ready: true, framework: 'wxt' }))
})
