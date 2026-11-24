export type ExtensionStatus = { ready: boolean; framework: 'plasmo' }

export function createStatus(): ExtensionStatus {
  return { ready: true, framework: 'plasmo' }
}
