import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
    ssr: { noExternal: ['@webext-core/messaging'] }
  }),
  manifest: {
    name: '{{NAME}}',
    description: 'A secure, cross-browser extension generated with WXT.',
    permissions: ['storage'],
    browser_specific_settings: {
      gecko: {
        id: '{{PACKAGE_NAME}}@local.invalid',
        data_collection_permissions: { required: ['none'] }
      }
    }
  }
})
