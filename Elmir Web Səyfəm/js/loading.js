// Loading Screen Controller
(function() {
    'use strict';

    // Wait for all content to load
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        // Ensure minimum loading time of 2.3 seconds
        const minimumLoadTime = 2300;
        const startTime = Date.now();
        
        function hideLoadingScreen() {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);
            
            setTimeout(function() {
                // Hide loading screen with fade out
                loadingScreen.classList.add('hidden');
                
                // Show main content with fade in
                setTimeout(function() {
                    mainContent.classList.add('visible');
                }, 100);
                
                // Remove loading screen from DOM after animation
                setTimeout(function() {
                    if (loadingScreen && loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 1000);
            }, remainingTime);
        }
        
        // Execute the hiding function
        hideLoadingScreen();
    });
    
    // Fallback: If load event takes too long, force show content
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            if (mainContent) {
                mainContent.classList.add('visible');
            }
        }
    }, 5000);
})();