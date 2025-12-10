// Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Staggered animation for nav boxes
    const animateGridItems = () => {
        const items = document.querySelectorAll('.nav-box');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.9)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 120);
        });
    };

    setTimeout(animateGridItems, 100);

    // Hero title typing effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.textContent.trim()) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let charIndex = 0;
        const typingSpeed = 80;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Mouse parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const profilePhoto = document.querySelector('.profile-photo');
        
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        });
        
        function animateParallax() {
            targetX += (mouseX - targetX) * 0.1;
            targetY += (mouseY - targetY) * 0.1;
            
            if (profilePhoto) {
                const moveX = targetX * 30;
                const moveY = targetY * 30;
                profilePhoto.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
            
            requestAnimationFrame(animateParallax);
        }
        
        animateParallax();
        
        hero.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
        });
    }

    // 3D tilt effect for nav boxes
    const cards = document.querySelectorAll('.nav-box');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 15;
            const rotateY = ((centerX - x) / centerX) * 15;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.05, 1.05, 1.05)
                translateZ(20px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)';
        });
    });
});
// Loading Screen Control
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    // 2.3 saniyə gözlə
    setTimeout(function() {
        // Loading ekranını gizlət
        loadingScreen.classList.add('hidden');
        
        // Əsas məzmunu göstər
        mainContent.classList.add('visible');
    }, 2300);
});

// Burada index.js-in digər kodları ola bilər
// Məsələn: animasiyalar, click eventləri və s.