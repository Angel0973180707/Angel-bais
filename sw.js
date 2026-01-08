const CACHE_NAME = 'angel-v1'; // 更新內容後請改版本號，例如 v1.1
const ASSETS = [
  'index.html',
  'script.js',
  'data.json',
  'manifest.json',
  'https://img.icons8.com/ios-filled/192/F2D388/clover.png'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('正在快取資源');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 啟動並清理舊快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 攔截請求，優先從快取中讀取（實現離線使用）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
