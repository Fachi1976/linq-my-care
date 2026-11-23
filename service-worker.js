/* linQ MY CARE v14: static app shell only; never cache user records or network API data. */
const CACHE = 'linq-my-care-shell-v14-2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('linq-my-care-shell-') && k !== CACHE).map(k => caches.delete(k)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Application navigation: prefer fresh code, fall back to cached shell offline.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('./index.html')));
    return;
  }
  // Serve only known static assets from cache; avoid caching arbitrary requests.
  if (SHELL.some(path => new URL(path, self.registration.scope).href === url.href)) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
  }
});
