// Skills Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Staggered animation for skill cards
    const animateSkillCards = () => {
        const items = document.querySelectorAll('.skill-card');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.9)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    };

    setTimeout(animateSkillCards, 100);

    // Skill progress bar animation
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width') || 
                                       progressBar.style.width || 
                                       '0%';
                    
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 200);
                    
                    skillObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            if (!bar.getAttribute('data-width')) {
                bar.setAttribute('data-width', bar.style.width || '0%');
            }
            skillObserver.observe(bar);
        });
    };

    animateSkillBars();

    // 3D tilt effect for skill cards
    const cards = document.querySelectorAll('.skill-card');
    
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