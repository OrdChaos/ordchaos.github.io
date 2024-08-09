const CACHE_NAME = 'OCXQCache';
let cachelist = [
    'https://img.ordchaos.com/img/2024/08/2bf7b046756fe6c77badf139bfcbec09.jpg',
    'https://img.ordchaos.com/img/2024/08/2bf7b046756fe6c77badf139bfcbec09.webp',
    'https://img.ordchaos.com/img/2024/08/2bf7b046756fe6c77badf139bfcbec09.avif',
    'https://img.ordchaos.com/img/2023/01/557e41f1eba9dab1399774a8ef7e679a.jpg',
    'https://img.ordchaos.com/img/2023/01/557e41f1eba9dab1399774a8ef7e679a.webp',
    'https://img.ordchaos.com/img/2023/01/557e41f1eba9dab1399774a8ef7e679a.avif',
    '/img/back.jpg',
    '/img/back.webp',
    '/img/back.avif',
    '/img/loading.gif',
    '/css/navbar.css',
    '/css/custom.css',
    '/css/fcircle-ext.css',
    '/css/notice.css',
    '/js/jump.js',
    '/js/tw_cn_tran.js',
    '/js/rand.js',
    '/js/lately.min.js',
    '/js/duration.js',
    '/js/jquery.min.js',
    '/js/moment.min.js',
    '/js/aisummary.js',
    '/owo.json'
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
    if (event.request.url.indexOf('hm.baidu.com') !== -1) {
        return;
    }

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

    try {
        event.respondWith(handle(event.request))
    } catch (msg) {
        event.respondWith(handleerr(event.request, msg))
    }
});

const handleerr = async (req, msg) => {
    return new Response(`<h1>CDN分流器遇到了致命错误</h1>
    <b>${msg}</b>`, { headers: { "content-type": "text/html; charset=utf-8" } })
}

let cdn = {
    "gh": {
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/gh"
        },
        jsdelivr_fastly: {
            "url": "https://fastly.jsdelivr.net/gh"
        },
        jsdelivr_gcore: {
            "url": "https://gcore.jsdelivr.net/gh"
        },
        jsdelivr_ocxq: {
            "url": "https://jsd.ordchaos.top/gh"
        }
    },
    "combine": {
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/combine"
        },
        jsdelivr_fastly: {
            "url": "https://fastly.jsdelivr.net/combine"
        },
        jsdelivr_gcore: {
            "url": "https://gcore.jsdelivr.net/combine"
        },
        jsdelivr_ocxq: {
            "url": "https://jsd.ordchaos.top/combine"
        }
    },
    "npm": {
        eleme: {
            "url": "https://npm.elemecdn.com"
        },
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/npm"
        },
        zhimg: {
            "url": "https://unpkg.zhimg.com"
        },
        unpkg: {
            "url": "https://unpkg.com"
        },
        bdstatic: {
            "url": "https://code.bdstatic.com/npm"
        },
        tianli: {
            "url": "https://cdn1.tianli0.top/npm"
        },
        sourcegcdn: {
            "url": "https://npm.sourcegcdn.com/npm"
        },
        jsdelivr_ocxq: {
            "url": "https://jsd.ordchaos.top/npm"
        }
    }
}

const is_latest = (url) => {
    return url.replace('https://', '').split('/')[1].split('@')[1] === 'latest';
}

const cache_url_list = [
    /(http:\/\/|https:\/\/)cdn\.jsdelivr\.net/g,
    /(http:\/\/|https:\/\/)fastly\.jsdelivr\.net/g,
    /(http:\/\/|https:\/\/)gcore\.jsdelivr\.net/g,
    /(http:\/\/|https:\/\/)jsd\.ordchaos\.top/g,
    /(http:\/\/|https:\/\/)npm\.elemecdn\.com/g,
    /(http:\/\/|https:\/\/)cdn\.bootcss\.com/g,
    /(http:\/\/|https:\/\/)zhimg\.unpkg\.com/g,
    /(http:\/\/|https:\/\/)unpkg\.com/g,
    /(http:\/\/|https:\/\/)code\.bdstatic\.com/g,
    /(http:\/\/|https:\/\/)cdn1\.tianli0\.top/g,
    /(http:\/\/|https:\/\/)npm\.sourcegcdn\.com/g,
    /(http:\/\/|https:\/\/)cdn\.bootcdn\.net/g
];

//主控函数
const handle = async function (req) {
    const urlStr = req.url;
    const domain = (urlStr.split('/'))[2];

    let urls = [];
    for (let i in cdn) {
        for (let j in cdn[i]) {
            if (domain == cdn[i][j].url.split('https://')[1].split('/')[0] && urlStr.match(cdn[i][j].url)) {
                urls = [];
                for (let k in cdn[i]) {
                    urls.push(urlStr.replace(cdn[i][j].url, cdn[i][k].url));
                }
                if (urlStr.indexOf('@latest/') > -1) {
                    return lfetch(urls, urlStr);
                } else {
                    return caches.match(req).then(function (resp) {
                        return resp || lfetch(urls, urlStr).then(function (res) {
                            return caches.open(CACHE_NAME).then(function (cache) {
                                cache.put(req, res.clone());
                                return res;
                            });
                        });
                    });
                }
            }
        }
    }

    for (var i in cache_url_list) {
        if (is_latest(req.url)) {
            return fetch(req);
        }
        if (req.url.match(cache_url_list[i])) {
            return caches.match(req).then(function (resp) {
                return resp || fetch(req).then(function (res) {
                    return caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(req, res.clone());
                        return res;
                    });
                });
            });
        }
    }

    return fetch(req);
}

const lfetch = async (urls) => {
    const controller = new AbortController();

    const PauseProgress = async (res) => {
        // 处理响应，将其转换为 ArrayBuffer 并创建新的 Response 对象
        const buffer = await res.arrayBuffer();
        return new Response(buffer, { status: res.status, headers: res.headers });
    };

    // 如果浏览器不支持 Promise.any，则实现 polyfill
    if (!Promise.any) {
        Promise.any = function (promises) {
            return new Promise((resolve, reject) => {
                promises = Array.isArray(promises) ? promises : [];
                let remaining = promises.length;
                let errors = [];

                if (remaining === 0) return reject(new AggregateError(errors, 'All promises were rejected'));

                promises.forEach((promise) => {
                    promise.then(resolve).catch((err) => {
                        errors.push(err);
                        if (--remaining === 0) {
                            reject(new AggregateError(errors));
                        }
                    });
                });
            });
        };
    }

    // 执行 fetch 请求，返回第一个成功的响应
    return Promise.any(urls.map(url => {
        return fetch(url, { signal: controller.signal })
            .then(PauseProgress)
            .then(res => {
                if (res.status === 200) {
                    controller.abort(); // 成功后终止其他请求
                    return res;
                } else {
                    // 如果状态码不是 200，则抛出错误
                    throw new Error(`[OCXQ Blog Helper - SW] Fetch failed with status ${res.status}`);
                }
            })
            .catch(err => {
                // 处理 fetch 请求中的错误
                console.error(`[OCXQ Blog Helper - SW] Error fetching ${url}:`, err);
                throw err;
            });
    }));
};