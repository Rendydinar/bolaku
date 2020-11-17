const CACHE_NAME = "bolaku-v3";
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/klasemen.html",
  "/pages/jadwal-pertandingan.html",
  "/pages/detail-team.html",
  "/pages/home.html",
  "/pages/saved.html",
  "/pages/404.html",
  "/push.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/db.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/script.js",
  "/css/materialize.min.css",
  "/css/style.css",
  "/icon-192.png",
  "/icon-512.png",
  "/img/icon.png",
  "/img/laliga.png",
  "/img/liga-champions.jpg",
  "/img/liga-inggris.jpg",
  "/img/serie-A.jpg",
  "/img/profile-dicoding.jpg",
  "/img/stadium-wallpaper.jpg",
  "/manifest.json",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  let base_url = "https://api.football-data.org/";
  if(event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
       caches.match(event.request, { ignoreSearch: true }).then(function(response) {
         return response || fetch(event.request);
       })
    );
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'img/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});