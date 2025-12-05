// Share Button Functionality
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const shareBtn = document.getElementById('shareBtn');
        const shareMenu = document.getElementById('shareMenu');
        const shareOptions = document.querySelectorAll('.share-option');

        if (!shareBtn || !shareMenu) return;

        // Get current page URL
        const currentUrl = window.location.href;
        const portfolioUrl = currentUrl.includes('elmir.html') 
            ? currentUrl 
            : currentUrl.replace(/\/[^/]*\.html$/, '/elmir.html');

        // Toggle share menu
        shareBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            shareMenu.classList.toggle('active');
            shareBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!shareBtn.contains(e.target) && !shareMenu.contains(e.target)) {
                shareMenu.classList.remove('active');
                shareBtn.classList.remove('active');
            }
        });

        // Share functionality
        shareOptions.forEach(option => {
            option.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                handleShare(platform, portfolioUrl);
                
                // Close menu after sharing
                setTimeout(function() {
                    shareMenu.classList.remove('active');
                    shareBtn.classList.remove('active');
                }, 300);
            });
        });

        // Handle different share platforms
        function handleShare(platform, url) {
            const text = 'Elmir Bağırovun Portfolio Saytına Baxın! 🚀';
            
            switch(platform) {
                case 'whatsapp':
                    shareToWhatsApp(url, text);
                    break;
                case 'instagram':
                    shareToInstagram(url);
                    break;
                case 'copy':
                    copyToClipboard(url);
                    break;
            }
        }

        // WhatsApp share
        function shareToWhatsApp(url, text) {
            const message = encodeURIComponent(`${text}\n${url}`);
            const whatsappUrl = `https://wa.me/?text=${message}`;
            
            // Open WhatsApp in new window
            window.open(whatsappUrl, '_blank', 'width=600,height=700');
            
            showToast('💬 WhatsApp açılır...');
        }

        // Instagram share (opens Instagram profile with instruction)
        function shareToInstagram(url) {
            // Instagram doesn't allow direct link sharing via web
            // Copy link and open Instagram
            copyToClipboard(url);
            
            // Try to open Instagram
            const instagramUrl = 'https://www.instagram.com/';
            window.open(instagramUrl, '_blank');
            
            showToast('📷 Link kopyalandı! Instagram-da bio-da paylaşa bilərsiniz.');
        }

        // Copy to clipboard
        function copyToClipboard(text) {
            // Modern clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(function() {
                        showToast('✓ Link panoya kopyalandı!');
                    })
                    .catch(function(err) {
                        fallbackCopy(text);
                    });
            } else {
                fallbackCopy(text);
            }
        }

        // Fallback copy method
        function fallbackCopy(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (successful) {
                    showToast('✓ Link panoya kopyalandı!');
                } else {
                    showToast('❌ Kopyalama uğursuz oldu');
                }
            } catch (err) {
                document.body.removeChild(textArea);
                showToast('❌ Kopyalama uğursuz oldu');
            }
        }

        // Toast notification
        function showToast(message, duration = 3000) {
            let toast = document.getElementById('toast');
            
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'toast';
                toast.className = 'toast';
                toast.setAttribute('role', 'alert');
                toast.setAttribute('aria-live', 'polite');
                document.body.appendChild(toast);
            }
            
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(function() {
                toast.classList.remove('show');
            }, duration);
        }
    });
})();