// sw.js

const CACHE_VERSION = 'v3.0.6'; // バージョン番号を更新
const CACHE_NAME = `site-card-links-cache-${CACHE_VERSION}`;
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/script.js',
    '/js/sw-register.js',
    '/assets/images/favicon.ico',
    '/assets/images/favicon.png',
    '/assets/images/favicon-192.png',
    '/assets/images/favicon-512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    // 必要な他のリソースをここに追加
];

// インストールイベント
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log(`キャッシュにリソースを追加中: ${CACHE_NAME}`);
                return cache.addAll(urlsToCache);
            })
    );
});

// アクティベーションイベント
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('古いキャッシュを削除:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// フェッチイベント
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // キャッシュがあればそれを返す
                }
                return fetch(event.request); // ネットワークから取得
            })
    );
});
