const CACHE = 'anxiety-balloon-v2';

const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
