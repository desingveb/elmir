// Projects Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Reveal animation on scroll
    revealOnScroll();
    
    // Add event listeners for project buttons
    addProjectButtonListeners();
    
    // Add smooth hover effects
    addSmoothHoverEffects();
    
    // Lazy load images
    lazyLoadImages();
});

// Reveal elements on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

// Add event listeners for project buttons
function addProjectButtonListeners() {
    const primaryButtons = document.querySelectorAll('.primary-btn');
    const secondaryButtons = document.querySelectorAll('.secondary-btn');
    
    primaryButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Demo açılır...', 'success');
            // Burada demo linki əlavə edə bilərsiniz
        });
    });
    
    secondaryButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Kod görünür...', 'info');
            // Burada GitHub linki əlavə edə bilərsiniz
        });
    });
}

// Show notification
function showNotification(message, type = 'success') {
    // Check if toast exists, if not create it
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
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add smooth hover effects
function addSmoothHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            createRipple(this);
        });
        
        card.addEventListener('mousemove', function(e) {
            // 3D tilt effect
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Create ripple effect
function createRipple(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(0, 255, 65, 0.3), transparent)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleAnimation 0.8s ease-out';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('.project-image');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                // Simulate image load
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 300);
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Add parallax effect on scroll
window.addEventListener('scroll', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const scrolled = window.pageYOffset;
    
    projectCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed / 100);
        
        if (card.classList.contains('active')) {
            card.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const projectCards = document.querySelectorAll('.project-card');
    const currentFocus = document.activeElement;
    
    // Arrow key navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        let currentIndex = -1;
        projectCards.forEach((card, index) => {
            if (card.contains(currentFocus) || card === currentFocus) {
                currentIndex = index;
            }
        });
        
        if (e.key === 'ArrowDown' && currentIndex < projectCards.length - 1) {
            projectCards[currentIndex + 1].focus();
            projectCards[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            projectCards[currentIndex - 1].focus();
            projectCards[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    .toast {
        position: fixed;
        bottom: -100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
        color: var(--color-bg);
        padding: 1.2rem 2.5rem;
        border-radius: 10px;
        font-weight: 600;
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: 9999;
        box-shadow: 
            0 8px 32px rgba(0, 255, 65, 0.5),
            0 0 20px rgba(0, 255, 65, 0.3);
    }
    
    .toast.show {
        bottom: 2rem;
        animation: toastBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .toast.info {
        background: linear-gradient(135deg, #00ccff, #0099cc);
    }
    
    @keyframes toastBounce {
        0% {
            transform: translateX(-50%) scale(0.5) rotate(-5deg);
            opacity: 0;
        }
        50% {
            transform: translateX(-50%) scale(1.1) rotate(2deg);
        }
        70% {
            transform: translateX(-50%) scale(0.95) rotate(-1deg);
        }
        100% {
            transform: translateX(-50%) scale(1) rotate(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScroll = debounce(() => {
    // Scroll-related animations
}, 10);

window.addEventListener('scroll', optimizedScroll);