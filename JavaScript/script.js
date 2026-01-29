document.addEventListener('DOMContentLoaded', function() {
    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card, .dubai-card, .why-dubai-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.cta-btn, .website-btn, .contact-card:not(.location)');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cta-btn, .website-btn, .contact-card:not(.location) {
            position: relative;
            overflow: hidden;
        }
        
        .dubai-badge i {
            animation: spin 4s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Add logo fallback
    const logos = document.querySelectorAll('.main-logo, .footer-logo-img');
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            this.style.display = 'none';
            const fallbackIcon = document.createElement('i');
            fallbackIcon.className = 'fas fa-burj';
            fallbackIcon.style.fontSize = '60px';
            fallbackIcon.style.color = 'var(--secondary-color)';
            this.parentNode.insertBefore(fallbackIcon, this);
        });
    });
    
    // Add current year to copyright
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2023', currentYear);
    }
    
    // Add hover effect to stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(0deg) scale(1)';
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Dubai-themed particle effect
    function createDubaiParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'dubai-particles';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '0';
        
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 10 + 5 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = i % 2 === 0 ? '#00b26c' : '#0066ff';
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0.3';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            
            particlesContainer.appendChild(particle);
            
            // Animate particle
            animateParticle(particle);
        }
    }
    
    function animateParticle(particle) {
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let xSpeed = (Math.random() - 0.5) * 0.5;
        let ySpeed = (Math.random() - 0.5) * 0.5;
        
        function move() {
            x += xSpeed;
            y += ySpeed;
            
            // Bounce off edges
            if (x <= 0 || x >= 100) xSpeed *= -1;
            if (y <= 0 || y >= 100) ySpeed *= -1;
            
            particle.style.left = x + 'vw';
            particle.style.top = y + 'vh';
            
            requestAnimationFrame(move);
        }
        
        move();
    }
    
    // Create particles after page load
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            createDubaiParticles();
        }, 100);
    });
    
    // Add Dubai theme toggle for fun
    const dubaiThemeBtn = document.createElement('button');
    dubaiThemeBtn.className = 'theme-toggle';
    dubaiThemeBtn.innerHTML = '<i class="fas fa-burj"></i>';
    dubaiThemeBtn.style.position = 'fixed';
    dubaiThemeBtn.style.bottom = '20px';
    dubaiThemeBtn.style.right = '20px';
    dubaiThemeBtn.style.width = '50px';
    dubaiThemeBtn.style.height = '50px';
    dubaiThemeBtn.style.borderRadius = '50%';
    dubaiThemeBtn.style.background = 'linear-gradient(135deg, #00b26c, #0066ff)';
    dubaiThemeBtn.style.color = 'white';
    dubaiThemeBtn.style.border = 'none';
    dubaiThemeBtn.style.cursor = 'pointer';
    dubaiThemeBtn.style.zIndex = '1000';
    dubaiThemeBtn.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    dubaiThemeBtn.style.fontSize = '20px';
    
    dubaiThemeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dubai-night');
        this.innerHTML = document.body.classList.contains('dubai-night') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-burj"></i>';
    });
    
    document.body.appendChild(dubaiThemeBtn);
    
    // Add night mode styles
    const nightStyle = document.createElement('style');
    nightStyle.textContent = `
        .dubai-night {
            filter: hue-rotate(180deg) brightness(0.9);
            transition: filter 0.5s ease;
        }
        
        .theme-toggle {
            transition: transform 0.3s ease;
        }
        
        .theme-toggle:hover {
            transform: rotate(30deg) scale(1.1);
        }
    `;
    document.head.appendChild(nightStyle);
});
