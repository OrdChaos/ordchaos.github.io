const CACHE_NAME = 'OCXQCache';
let cachelist = [
    '/img/back.jpg',
    '/img/back.webp',
    '/img/back.avif',
    '/img/loading.gif',
    '/js/jump.js',
];

self.addEventListener('install', async function (installEvent) {
    self.skipWaiting();
    installEvent.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('[OCXQ Blog Helper - SW] Opened cache.');
                return cache.addAll(cachelist);
            })
    );
});

self.addEventListener('fetch', async event => {
    var requestUrl = event.request.url;

    if (event.request.url.indexOf('img.ordchaos.com') !== -1) {
        var supportsWebp = false;
        var supportsAvif = false;
        if (event.request.headers.has('accept')) {
            var acceptHeader = event.request.headers.get('accept');
            supportsWebp = acceptHeader.includes('webp');
            supportsAvif = acceptHeader.includes('avif');
        }

        var imageUrl = requestUrl.split(".");
        var fileExtension = imageUrl[imageUrl.length - 1];

        if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg') {
            var newUrl;
            if (supportsAvif) {
                newUrl = requestUrl.replace(fileExtension, 'avif');
                console.log("[OCXQ Blog Helper - SW] Redirect " + requestUrl + " to " + newUrl + " (AVIF).");
            } else if (supportsWebp) {
                newUrl = requestUrl.replace(fileExtension, 'webp');
                console.log("[OCXQ Blog Helper - SW] Redirect " + requestUrl + " to " + newUrl + " (WebP).");
            } else {
                console.log("[OCXQ Blog Helper - SW] Don't support AVIF or WebP, using original format for " + requestUrl + ".");
                newUrl = requestUrl;
            }

            var newRequest = new Request(newUrl);
            event.respondWith(
                fetch(newRequest)
                    .then(function (response) {
                        if (!response.ok) throw new Error("[OCXQ Blog Helper - SW] Failed to load image: " + newUrl);
                        return caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(newRequest, response.clone());
                            return response;
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                        return fetch(event.request);
                    })
            );

            return;
        }
    }
    
    event.respondWith(fetch(event.request));
});