// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                // Close mobile menu if open
                closeMobileMenu();
            }
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = this.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

function closeMobileMenu() {
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animated counter for stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target.querySelector('h3');
            if (stat && !stat.classList.contains('counted')) {
                animateCounter(stat);
                stat.classList.add('counted');
            }
        }
    });
}, observerOptions);

const stats = document.querySelectorAll('.stat');
stats.forEach(stat => {
    observer.observe(stat);
});

function animateCounter(element) {
    const target = element.textContent;
    const number = parseInt(target.replace('+', ''));
    const suffix = target.includes('+') ? '+' : '';
    
    let current = 0;
    const increment = number / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Success animation
            const btn = this.querySelector('button');
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#43e97b';
            
            // Reset after 3 seconds
            setTimeout(() => {
                this.reset();
                btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                btn.style.background = '';
            }, 3000);
            
            // In production, send data to server
            console.log('Form submitted:', { name, email, message });
        }
    });
}

// Add scroll animations
const observerOptionsForCards = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptionsForCards);

// Observe project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    cardObserver.observe(card);
});

// Observe skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    cardObserver.observe(card);
});

// Parallax effect for floating shapes
window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translate(${scrollY * speed * 0.01}px, ${scrollY * speed * 0.02}px)`;
    });
});

// Add typing effect to home section (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll('.home-text > *');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animation = `fadeInUp 1s ease ${index * 0.2}s forwards`;
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize
document.body.style.opacity = '0';

// Add particle effect (optional enhancement)
function createParticles() {
    const homeSection = document.querySelector('.home-section');
    if (!homeSection) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = 10 + Math.random() * 20;
        
        particle.style.left = startX + '%';
        particle.style.top = startY + '%';
        particle.style.animation = `float-particle ${duration}s infinite ease-in-out`;
        
        homeSection.appendChild(particle);
    }
}

// Create particle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% { transform: translate(0, 0); opacity: 0.3; }
        25% { transform: translate(20px, -20px); opacity: 0.7; }
        50% { transform: translate(-10px, 10px); opacity: 0.5; }
        75% { transform: translate(10px, 15px); opacity: 0.6; }
    }
`;
document.head.appendChild(style);

// Uncomment to enable particles
// createParticles();