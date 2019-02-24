// service-worker.js

var urlsToCache = [
  '/',
  '/p.html'
];

  self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    return install(e);
  });
  
  self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
  });
  
  // 現状では、この処理を書かないとService Workerが有効と判定されないようです
  self.addEventListener('fetch', function(event) {});
  
  // HTML側からのメッセージハンドラ
  self.addEventListener('message', function(event) {
    return install(event);
  });
  
  const install = (event) => {
    return event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          urlsToCache.map(url => {
            return fetch(new Request(url)).then(response => {
              return cache.put(url, response);
            });
          })
        })
        .catch(function(err) {
          console.log(err);
        })
    );
  }