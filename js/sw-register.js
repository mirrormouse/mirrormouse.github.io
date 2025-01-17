// js/sw-register.js

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker登録成功:', registration.scope);

                // 更新を検出
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // 新しいコンテンツが利用可能
                                alert('新しいバージョンが利用可能です。ページをリロードしてください。');
                            } else {
                                // コンテンツがキャッシュされた
                                console.log('コンテンツがキャッシュされました。');
                            }
                        }
                    };
                };
            })
            .catch(error => {
                console.log('Service Worker登録失敗:', error);
            });
    });
}
