// Yüklənmə Ekranı - Yalnız ilk açılışda göstərilir (0.6 saniyə)
(function() {
    'use strict';

    // Səhifənin əvvəllər açılıb-açılmadığını yoxla
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
        // Artıq ziyarət edilib - loading ekranını göstərmə
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        if (mainContent) {
            mainContent.classList.add('visible');
        }
        return;
    }

    // İlk dəfə açılır - 0.6 saniyə loading göstər
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        // 0.6 saniyə gözlə
        setTimeout(function() {
            // Loading ekranını gizlət
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            
            // Əsas məzmunu göstər
            setTimeout(function() {
                if (mainContent) {
                    mainContent.classList.add('visible');
                }
                // Ziyarəti qeyd et
                sessionStorage.setItem('hasVisited', 'true');
            }, 100);
            
            // Loading ekranını DOM-dan sil
            setTimeout(function() {
                if (loadingScreen && loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 400);
        }, 600); // 0.6 saniyə
    });
    
    // Ehtiyat: 2 saniyə keçsə məcburi göstər
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            if (mainContent) {
                mainContent.classList.add('visible');
            }
            sessionStorage.setItem('hasVisited', 'true');
        }
    }, 2000);
})();