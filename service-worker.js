const CACHE_NAME = 'travel-app-v1';
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/bundle.js',
];

// Sự kiện cài đặt
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Đang lưu trữ tài sản');
                return cache.addAll(CACHE_ASSETS);
            })
    );
});

// Sự kiện lấy
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                return cachedResponse || fetch(event.request);
            })
    );
});

// Sự kiện kích hoạt
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Đang xóa bộ nhớ cache cũ:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
