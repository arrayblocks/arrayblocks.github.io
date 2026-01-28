// Countdown and auto-redirect functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const countdownElement = document.getElementById('countdown');
    const redirectLink = document.getElementById('redirect-link');
    
    // Countdown settings
    let countdown = 10;
    countdownElement.textContent = countdown;
    
    // Start countdown
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        // When countdown reaches 0, redirect
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            redirectToMainSite();
        }
    }, 1000);
    
    // Manual redirect when link is clicked
    redirectLink.addEventListener('click', function(e) {
        e.preventDefault();
        redirectToMainSite();
    });
    
    // Redirect function
    function redirectToMainSite() {
        // Show redirecting message
        const redirectMessage = document.querySelector('.redirect-message');
        if (redirectMessage) {
            redirectMessage.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting to ArrayBlocks.net...';
        }
        
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = "https://arrayblocks.net/";
        }, 500);
    }
    
    // Add animation to the main button
    setTimeout(() => {
        redirectLink.style.transform = 'scale(1.05)';
        setTimeout(() => {
            redirectLink.style.transform = 'scale(1)';
        }, 300);
    }, 500);
    
    // Add hover effects to features
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });
        
        feature.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});
