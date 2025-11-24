// Handle smooth scrolling for mobile devices
document.addEventListener('DOMContentLoaded', function() {
  // Get all anchor links that point to sections on the same page
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (href === '#' || href === '') {
        return;
      }
      
      // Get the target element
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset (account for any fixed headers)
        const offset = 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        // For mobile devices, use a more reliable scroll method
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
          // On mobile, use requestAnimationFrame for smoother scrolling
          const startPosition = window.pageYOffset;
          const distance = offsetPosition - startPosition;
          const duration = 800;
          let start = null;
          
          function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            // Easing function for smooth animation
            const ease = percentage < 0.5 
              ? 2 * percentage * percentage 
              : 1 - Math.pow(-2 * percentage + 2, 2) / 2;
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < duration) {
              requestAnimationFrame(step);
            }
          }
          
          requestAnimationFrame(step);
        } else {
          // Use native smooth scroll for desktop
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else {
            // Fallback for older browsers
            window.scrollTo(0, offsetPosition);
          }
        }
      }
    });
  });
});

