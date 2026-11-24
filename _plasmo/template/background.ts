import { createStatus } from './core/status'

chrome.runtime.onMessage.addListener((request: unknown, _sender, sendResponse) => {
  if (typeof request === 'object' && request !== null && 'type' in request && request.type === 'get-status') {
    sendResponse(createStatus())
  }
  return false
})
