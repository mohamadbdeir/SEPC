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
