"use strict";var CACHE_VERSION=1,CACHE_NAME="cache-v"+CACHE_VERSION,CACHE_URLS=["/","/js/index.js","/css/index.css","/img/BYJ2015.jpg","/img/BYJ2016.jpg","/img/nav-bg.jpg","/img/xc3.jpg","/img/xcpost.jpg","/img/xcpostPc.jpg"];function preCache(){return caches.open(CACHE_NAME).then(function(e){return e.addAll(CACHE_URLS)})}function clearCache(){return caches.keys().then(function(e){e.forEach(function(e){e!==CACHE_NAME&&caches.delete(e)})})}self.addEventListener("install",function(e){e.waitUntil(preCache().then(self.skipWaiting))}),self.addEventListener("activate",function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(e){return console.log(e),clearCache(),e}).then(function(e){return e.keys().then(function(e){console.log("reqList",e),e.length&&self.clients.matchAll().then(function(e){console.log("client",e),e&&e.length&&e.forEach(function(e){e.postMessage("sw.update")})})})}))}),self.addEventListener("fetch",function(t){new URL(t.request.url).origin===self.origin&&t.respondWith(caches.match(t.request).then(function(e){if(e)return e;var n=t.request.clone();return fetch(n).then(function(e){if(!e&&200!==e.status&&!e.headers.get("Content-type").match(/imgage/))return e;var n=e.clone();return caches.open(CACHE_NAME).then(function(e){e.put(t.request,n)}),e})}).catch(function(){return caches.match(t.request)}))});
//# sourceMappingURL=sw.js.map