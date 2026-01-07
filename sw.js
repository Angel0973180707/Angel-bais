const CACHE_NAME = 'angel-steady-v5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝階段：快取必要的資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Angel SW] 正在快取溫柔導引資源');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 激活階段：清理過時的舊版快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Angel SW] 清理舊版快取:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// 攔截請求：達成離線開啟功能
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果快取有就用快取，沒有就發起網路請求
      return response || fetch(event.request);
    })
  );
});
