/* ============================================================
   NEXORA SERVICE WORKER
============================================================ */

const CACHE_NAME = "nexora-v7";

const FILES_TO_CACHE = [

    "/",
    "/index.html",
    "/about.html",
    "/services.html",
    "/work.html",
    "/contact.html",
    "/404.html",

    "/manifest.json",

    "/static/css/style.css",
    "/static/css/responsive/style.css",
    "/static/css/about/about.css",
    "/static/css/services/style.css",
    "/static/css/work/style.css",
    "/static/css/contact/style.css",
    "/static/css/404.css",

    "/static/js/pwa.js",
    "/static/js/app.js",
    "/static/js/about.js",
    "/static/js/service.js",
    "/static/js/work.js",
    "/static/js/contact.js",
    "/static/js/404.js",

    "/assets/favicon/nexora-favicon/favicon.svg",
    "/assets/favicon/nexora-favicon/favicon-96x96.png",
    "/assets/favicon/nexora-favicon/apple-touch-icon.png",
    "/assets/favicon/nexora-favicon/web-app-manifest-192x192.png",
    "/assets/favicon/nexora-favicon/web-app-manifest-512x512.png"
];


/* ============================================================
   INSTALL
============================================================ */

self.addEventListener("install", (event) => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then((cache) => {

                console.log(
                    "[SW] Caching Nexora files..."
                );

                return cache.addAll(
                    FILES_TO_CACHE
                );

            })
            .catch((error) => {

                console.error(
                    "[SW] Cache installation failed:",
                    error
                );

            })

    );

    self.skipWaiting();

});


/* ============================================================
   ACTIVATE
============================================================ */

self.addEventListener("activate", (event) => {

    event.waitUntil(

        caches.keys()
            .then((cacheNames) => {

                return Promise.all(

                    cacheNames.map((cacheName) => {

                        if (
                            cacheName !== CACHE_NAME
                        ) {

                            console.log(
                                "[SW] Removing old cache:",
                                cacheName
                            );

                            return caches.delete(
                                cacheName
                            );

                        }

                    })

                );

            })

            .then(() => {

                return self.clients.claim();

            })

    );

});


/* ============================================================
   FETCH
============================================================ */
self.addEventListener("fetch", (event) => {

    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    if (url.pathname === "/manifest.json") {

        event.respondWith(
            fetch(event.request)
                .then((response) => {

                    if (response.ok) {
                        const responseClone = response.clone();

                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }

                    return response;

                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );

        return;
    }

    event.respondWith(

        caches.match(event.request)
            .then((cachedResponse) => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then((networkResponse) => {

                        if (
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            networkResponse.type !== "basic"
                        ) {
                            return networkResponse;
                        }

                        const responseClone =
                            networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(
                                    event.request,
                                    responseClone
                                );
                            });

                        return networkResponse;

                    });

            })
            .catch(() => {

                if (
                    event.request.destination === "document"
                ) {
                    return caches.match("/index.html");
                }

            })
    );

});
