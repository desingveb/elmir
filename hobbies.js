// Hobbies Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Staggered animation for hobby cards
    const animateHobbyCards = () => {
        const items = document.querySelectorAll('.hobby-card');
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

    setTimeout(animateHobbyCards, 100);

    // 3D tilt effect for hobby cards
    const cards = document.querySelectorAll('.hobby-card');
    
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