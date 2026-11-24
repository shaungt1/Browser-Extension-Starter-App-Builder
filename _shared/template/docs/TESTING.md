# Testing workflow

1. Unit tests cover framework-neutral logic, storage adapters, message handlers, and transports.
2. `bash start.sh verify` type-checks, runs unit tests once, and builds Chrome and Firefox production outputs without starting watchers.
3. `bash start.sh install-browser` installs Playwright's managed Chromium once per machine.
4. `bash start.sh test e2e` loads the production Chrome bundle and exercises extension behavior in a real browser.
5. Before release, manually verify permissions, service-worker suspension/restart, offline/reconnect behavior, and upgrades from the prior store version.

Firefox and Safari need their own manual release gates even when shared logic is covered in Chromium automation.
