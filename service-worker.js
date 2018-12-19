const CACHE_NAME = "cappy-hoding-pwa";

var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/blog.html",
  "/pages/github.html",
  "/pages/medium.html",
  "/pages/project.html",
  "/images/404.jpg",
  "/images/bdc.jpeg",
  "/images/pwa.png",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          return response;
        }

        console.log(
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});