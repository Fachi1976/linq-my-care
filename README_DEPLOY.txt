linQ MY CARE — v14 PWA test package

Upload ALL six files in this folder to the ROOT of the same GitHub repository (main branch):
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- apple-touch-icon.png

Keep a backup of v13 before replacing index.html.
GitHub Pages: Settings > Pages > Deploy from a branch > main > /(root).
Verify install and offline behavior on an HTTPS Pages URL; local file:// will not register the service worker.

IMPORTANT: This is a TEST build, not approved for real patient medical data.
Existing IndexedDB data is not intentionally modified by v14, but a backup before upgrades is recommended.
Offline availability requires one successful online opening of the application after deployment.
The reminder feature does NOT push background notifications when the app is closed.
A locally stored record may be lost if browser/site data is cleared or if storage is evicted.
Security/privacy review and device QA are required before patient release.
