const CACHE_NAME = 'angel-steady-voice-v9';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝階段：將暖色調介面與新邏輯存入本地快取
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Angel SW] 已快取完整語音導引與自動倒數資源');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 激活階段：徹底清理所有舊版快取，避免新舊邏輯衝突
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Angel SW] 正在移除過時資源:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// 攔截請求：達成離線練習功能，無論是否有網路皆可開啟
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
