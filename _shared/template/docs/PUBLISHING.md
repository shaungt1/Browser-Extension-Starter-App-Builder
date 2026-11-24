# Publishing checklist

1. Update the version and changelog.
2. Run `bash start.sh verify` and `bash start.sh package all`.
3. Inspect the generated manifests, archives, permissions, source maps, and bundled files.
4. Complete privacy disclosures and store listing assets.
5. Submit manually the first time. Add CI publishing only after store credentials are scoped and protected.
6. Roll out gradually where the store supports it, then monitor crashes, auth failures, and API compatibility.

Never place store credentials in the repository. Safari requires Apple's converter/Xcode wrapper and a macOS release path.

The generated Firefox ID ends in `@local.invalid`. Replace it with the product's permanent unique ID before first AMO submission. If the extension begins collecting or transmitting data, replace the generated `data_collection_permissions.required: ["none"]` declaration with an accurate disclosure.
