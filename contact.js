// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Staggered animation for contact cards
    const animateContactCards = () => {
        const items = document.querySelectorAll('.contact-card');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.9)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
    };

    setTimeout(animateContactCards, 100);

    // Toast notification system
    function showToast(message, duration = 3000) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, duration);
        }
    }

    // Contact link interactions
    const phoneLink = document.getElementById('phone-link');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            showToast('📞 Telefon nömrəsi açılır...');
        });
    }

    const instagramLink = document.getElementById('instagram-link');
    if (instagramLink) {
        instagramLink.addEventListener('click', function(e) {
            showToast('📱 Instagram açılır...');
        });
    }

    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            showToast('✉️ E-poçt proqramı açılır...');
        });
    }

    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            const originalText = this.textContent;
            
            this.innerHTML = '<span style="display: inline-block; width: 20px; height: 20px; border: 3px solid var(--color-border); border-radius: 50%; border-top-color: var(--color-primary); animation: spin 1s ease-in-out infinite;"></span>';
            this.disabled = true;
            
            const copyPromise = navigator.clipboard && navigator.clipboard.writeText
                ? navigator.clipboard.writeText(textToCopy)
                : fallbackCopy(textToCopy);
            
            copyPromise
                .then(() => {
                    showToast('✓ Kopyalandı!');
                    this.textContent = '✓ Kopyalandı!';
                    this.style.color = 'var(--color-primary)';
                    this.style.borderColor = 'var(--color-primary)';
                    this.style.transform = 'scale(1.1)';
                    this.disabled = false;
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                        this.style.borderColor = '';
                        this.style.transform = '';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Kopyalama uğursuz oldu:', err);
                    showToast('❌ Kopyalama uğursuz oldu');
                    this.textContent = originalText;
                    this.disabled = false;
                });
        });
    });
    
    function fallbackCopy(text) {
        return new Promise((resolve, reject) => {
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
                    resolve();
                } else {
                    reject(new Error('Copy command failed'));
                }
            } catch (err) {
                document.body.removeChild(textArea);
                reject(err);
            }
        });
    }

    // Magnetic button effect
    const magneticButtons = document.querySelectorAll('.contact-link, .copy-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
});