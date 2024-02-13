const CACHE_NAME = 'OCXQCache';
let cachelist = [
    'https://img.ordchaos.com/img/2023/01/557e41f1eba9dab1399774a8ef7e679a.jpg',
    'https://img.ordchaos.com/img/2023/01/557e41f1eba9dab1399774a8ef7e679a.webp',
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
                console.log('[SW] Opened cache.');
                return cache.addAll(cachelist);
            })
    );
});
self.addEventListener('fetch', async event => {
    var requestUrl = event.request.url;
    if(event.request.url.indexOf('hm.baidu.com') !== -1) {
        return;
    }

    if(event.request.url.indexOf('img.ordchaos.com') !== -1) {
        var supportsWebp = false;
        if (event.request.headers.has('accept')){
            supportsWebp = event.request.headers
                                .get('accept')
                                .includes('webp');
        }
        if (supportsWebp) {
            var imageUrl = requestUrl.split(".");
            if(imageUrl[imageUrl.length - 1] === 'jpg' || imageUrl[imageUrl.length - 1] === 'tif' || imageUrl[imageUrl.length - 1] === 'png' || imageUrl[imageUrl.length - 1] === 'jpeg'){
                var newUrl = requestUrl.replace(imageUrl[imageUrl.length - 1], 'webp');
                var newRequest = new Request(newUrl);
                event.respondWith(fetch(newRequest));
                console.log("[SW] Redirect " + requestUrl + " to " + newUrl + " .");
                event.waitUntil(
                    fetch(newRequest).then(function(response) {
                        if (!response.ok) throw new Error("[SW] Failed to load image: " + newUrl);
                        caches.open(CACHE_NAME).then(function(cache) {
                            cache.put(newRequest, response);
                        });
                    }).catch(function(error) {
                        console.log(error);
                    })
                );
                event.stopImmediatePropagation();
                return;
            }
        }
        else {
            console.log("[SW] Don't support webp image, skip " + requestUrl + " .");
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
let cdn = {//镜像列表
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
    const urlStr = req.url
    const domain = (urlStr.split('/'))[2]

    let urls = []
    for (let i in cdn) {
        for (let j in cdn[i]) {
            if (domain == cdn[i][j].url.split('https://')[1].split('/')[0] && urlStr.match(cdn[i][j].url)) {
                urls = []
                for (let k in cdn[i]) {
                    urls.push(urlStr.replace(cdn[i][j].url, cdn[i][k].url))
                }
                if (urlStr.indexOf('@latest/') > -1) {
                    return lfetch(urls, urlStr)
                } else {
                    return caches.match(req).then(function (resp) {
                        return resp || lfetch(urls, urlStr).then(function (res) {
                            return caches.open(CACHE_NAME).then(function (cache) {
                                cache.put(req, res.clone());
                                return res;
                            });
                        });
                    })
                }
            }
        }
    }

    for (var i in cache_url_list) {
        if (is_latest(req.url)) { return fetch(req) }
        if (req.url.match(cache_url_list[i])) {
            return caches.match(req).then(function (resp) {
                return resp || fetch(req).then(function (res) {
                    return caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(req, res.clone());
                        return res;
                    });
                });
            })
        }
    }

    return fetch(req);
}

const lfetch = async (urls, url) => {
    let controller = new AbortController();
    const PauseProgress = async (res) => {
        return new Response(await (res).arrayBuffer(), { status: res.status, headers: res.headers });
    };
    if (!Promise.any) {
        Promise.any = function (promises) {
            return new Promise((resolve, reject) => {
                promises = Array.isArray(promises) ? promises : []
                let len = promises.length
                let errs = []
                if (len === 0) return reject(new AggregateError('All promises were rejected'))
                promises.forEach((promise) => {
                    promise.then(value => {
                        resolve(value)
                    }, err => {
                        len--
                        errs.push(err)
                        if (len === 0) {
                            reject(new AggregateError(errs))
                        }
                    })
                })
            })
        }
    }
    return Promise.any(urls.map(urls => {
        return new Promise((resolve, reject) => {
            fetch(urls, {
                signal: controller.signal
            })
                .then(PauseProgress)
                .then(res => {
                    if (res.status == 200) {
                        controller.abort();
                        resolve(res)
                    } else {
                        reject(res)
                    }
                })
        })
    }))
}