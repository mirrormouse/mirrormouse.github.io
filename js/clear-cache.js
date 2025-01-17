// js/clear-cache.js

document.getElementById('clear-cache-button').addEventListener('click', () => {
    if ('caches' in window) {
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            alert('キャッシュがクリアされました。ページをリロードしてください。');
            window.location.reload();
        }).catch(err => {
            console.error('キャッシュクリア中にエラーが発生:', err);
        });
    } else {
        alert('このブラウザではキャッシュAPIがサポートされていません。');
    }
});