const CACHE_NAME = 'angel-steady-v7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝階段：將暖色調介面資源存入本地
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Angel SW] 正在更新穩定練習資源');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 激活階段：徹底清除舊版「深色/排版錯誤」的快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Angel SW] 移除舊版快取:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// 攔截請求：達成 30 秒穩定練習隨處可用（離線優先）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
