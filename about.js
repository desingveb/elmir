// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Timeline marker animation
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    if (timelineMarkers.length > 0) {
        const markerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'markerPulse 2.5s ease-in-out infinite';
                        entry.target.style.opacity = '1';
                    }, index * 200);
                }
            });
        }, { threshold: 0.5 });

        timelineMarkers.forEach(marker => {
            marker.style.opacity = '0';
            markerObserver.observe(marker);
        });
    }
});