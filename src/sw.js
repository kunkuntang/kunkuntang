
var CACHE_VERSION = 1;
var CACHE_NAME = 'cache-v' + CACHE_VERSION;
var CACHE_URLS = [
  '/',
  '/js/index.js',
  '/css/index.css',
  '/img/BYJ2015.jpg',
  '/img/BYJ2016.jpg',
  '/img/nav-bg.jpg',
  '/img/xc3.jpg',
  '/img/xcpost.jpg',
  '/img/xcpostPc.jpg',
]


/** 预缓存 */
function preCache() {
  return caches.open(CACHE_NAME).then(function(cache) {
    return cache.addAll(CACHE_URLS);
  })
}

/** 清楚缓存 */
function clearCache() {
  return caches.keys().then(function(keys) {
    keys.forEach(function(key) {
      if (key !== CACHE_NAME) {
        caches.delete(key)
      }
    })
  })
}

self.addEventListener('install', function(evt) {
  evt.waitUntil(preCache().then(self.skipWaiting));
  // evt.waitUntil(preCache());
});

self.addEventListener('activate', function(evt) {
  // evt.waitUntil(Promise.all([
  //   clearCache(),
  //   self.clients.claim(),
  // ]))
  evt.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log(cache)
      clearCache()
      return cache;
    }).then(function (cache) {
      return cache.keys().then(function(reqList) {
        console.log('reqList', reqList)
        // 如果原来 cache 没有内容，则代表第一次安装，不用提示用户
        if (reqList.length) {
          self.clients.matchAll().then(function (clients) {
            console.log('client', clients)
            if (clients && clients.length) {
              clients.forEach(function(client) {
                client.postMessage('sw.update')
              });
            }
          })
        }
      })
    })
  )
})

self.addEventListener('fetch', function(evt) {
  // 判断是否是同域名，如果不是同域名则不处理（cdn情况）
  var url = new URL(evt.request.url)
  if (url.origin !== self.origin) {
    return
  }

  // 网络请求优先
  evt.respondWith(
    caches.match(evt.request).then(function(response) {
      if (response) {
        return response;
      }
      var request = evt.request.clone();
      return fetch(request).then(function(response) {
        if (!response && response.status !== 200 && !response.headers.get('Content-type').match(/imgage/)) {
          return response;
        }
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(evt.request, responseClone);
        })
        return response;
      })
    }).catch(function() {
      return caches.match(evt.request)
    })
  )
})