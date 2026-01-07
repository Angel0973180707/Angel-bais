const CACHE_NAME = 'angel-steady-final-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝：將所有詩意 UI 資源存入本地快取
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Angel SW] 已快取完整練習資源');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 激活：清理舊版快取，確保排版與導引語是最新的
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Angel SW] 移除舊版資源:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// 攔截：離線優先，讓 30 秒穩定練習隨時隨地都能進行
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
