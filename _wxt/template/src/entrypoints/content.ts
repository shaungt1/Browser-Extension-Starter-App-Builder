export default defineContentScript({
  // Replace this example origin with the narrowest host pattern your feature needs.
  matches: ['https://example.com/*'],
  main() {
    document.documentElement.dataset.extensionReady = 'true'
  }
})
