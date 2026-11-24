# Other browser-extension frameworks

These choices are documented but intentionally not generated in this release.

| Tool | Choose it when | Main caution | Link |
| --- | --- | --- | --- |
| Extension.js | A manifest-first, low-configuration path and Safari support are central. | Less control over custom bundler/Rust integration. | <https://extension.js.org/> |
| CRXJS | You want to own Vite configuration and assemble storage/messaging/testing yourself. | Smaller helper layer and maintenance history must be rechecked. | <https://github.com/crxjs/chrome-extension-tools> |
| Bedframe | Cross-browser CI versioning, packaging, and publishing are the primary pain. | Small community and concentrated maintenance risk. | <https://bedframe.dev/> |
| Quasar BEX | A Vue/Quasar client shares code across web, mobile, desktop, and extension surfaces. | Vue/Quasar commitment is the point; skip otherwise. | <https://quasar.dev/quasar-cli-vite/developing-browser-extensions/introduction/> |
| oxichrome | The objective is an experimental all-Rust/Leptos extension. | Very young ecosystem and no TypeScript layer. | <https://github.com/0xsouravm/oxichrome> |
| web-ext | A plain TypeScript/no-framework Firefox-oriented toolchain is preferred. | You own manifests, messaging, reload, and packaging integration. | <https://github.com/mozilla/web-ext> |

Also review Apple's Safari converter when Safari or iOS distribution is required: <https://developer.apple.com/documentation/safariservices/converting-a-web-extension-for-safari>.
