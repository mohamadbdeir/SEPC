document.addEventListener('DOMContentLoaded', function() {
    const ctaContainer = document.querySelector('.CTA-container');
    const contentContainer = document.querySelector('.content-container');

    ctaContainer.addEventListener('click', function() {
        contentContainer.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});


// Mobile parallax effect using JavaScript
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Check if background-attachment: fixed is supported
    const isFixedSupported = () => {
        const testDiv = document.createElement('div');
        testDiv.style.backgroundAttachment = 'fixed';
        return testDiv.style.backgroundAttachment === 'fixed';
    };
    
    // For mobile devices or browsers that don't support fixed attachment well
    if (window.innerWidth <= 1024 || !isFixedSupported()) {
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                const windowHeight = window.innerHeight;
                
                // Only apply parallax when element is in viewport
                if (rect.top < windowHeight && rect.bottom > 0) {
                    // Calculate parallax offset
                    const rate = (scrolled - elementTop) * 0.5;
                    element.style.backgroundPosition = `center ${rate}px`;
                }
            });
        });
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initParallax);

// Re-initialize on resize (in case user rotates device)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        initParallax();
    }, 250);
});

// Trigger "peintures-titre" animation when it enters viewport
document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('.peintures-titre');
    if (!title) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                title.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(title);
});

// Trigger saw animation when it enters viewport
document.addEventListener('DOMContentLoaded', function () {
    const sawImage = document.querySelector('.saw-image');
    if (!sawImage) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                sawImage.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(sawImage);
});