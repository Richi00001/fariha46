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

// Simple PDF Download Function
const downloadCVBtn = document.getElementById('downloadCV');
if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', function() {
        // Show loading state
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        this.disabled = true;
        
        try {
            // Create a new window with the CV content
            const printWindow = window.open('', '_blank');
            
            // Get the profile image source
            const profileImage = document.querySelector('#cvCard .cv-profile-image img');
            let imageSrc = '';
            
            if (profileImage && profileImage.src) {
                imageSrc = profileImage.src;
            }
            
            // Create HTML content for PDF
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Razoyana Fariha - CV</title>
                    <meta charset="UTF-8">
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                        
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        
                        body {
                            font-family: 'Poppins', sans-serif;
                            line-height: 1.6;
                            padding: 0;
                            margin: 0;
                            background: #f5f5f5;
                        }
                        
                        .cv-container {
                            max-width: 210mm;
                            min-height: 297mm;
                            margin: 0 auto;
                            background: white;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        }
                        
                        .cv-layout {
                            display: grid;
                            grid-template-columns: 250px 1fr;
                            min-height: 297mm;
                        }
                        
                        .cv-left-column {
                            background: #20b2aa;
                            color: white;
                            padding: 40px 25px;
                        }
                        
                        .cv-right-column {
                            background: #f5f5dc;
                            padding: 40px 40px;
                        }
                        
                        .cv-profile-image {
                            width: 180px;
                            height: 180px;
                            margin: 0 auto 30px;
                            border-radius: 50%;
                            overflow: hidden;
                            border: 5px solid rgba(255, 255, 255, 0.3);
                        }
                        
                        .cv-profile-image img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                        
                        .cv-name-header {
                            background: linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 100%);
                            padding: 25px 40px;
                            margin: -40px -40px 30px -40px;
                        }
                        
                        .cv-name {
                            font-size: 2.2rem;
                            font-weight: 800;
                            color: #000;
                            margin: 0;
                            letter-spacing: 1px;
                        }
                        
                        .cv-title {
                            font-size: 1.1rem;
                            color: #333;
                            margin: 5px 0 0 0;
                        }
                        
                        .cv-section-title-left {
                            font-size: 1rem;
                            font-weight: 700;
                            margin: 30px 0 15px 0;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
                            padding-bottom: 8px;
                        }
                        
                        .cv-profile-text {
                            font-size: 0.9rem;
                            line-height: 1.5;
                            text-align: justify;
                        }
                        
                        .cv-contact-item {
                            margin: 15px 0;
                            font-size: 0.9rem;
                        }
                        
                        .cv-contact-item i {
                            margin-right: 10px;
                            width: 16px;
                        }
                        
                        .cv-section-title-right {
                            font-size: 0.95rem;
                            font-weight: 700;
                            color: #20b2aa;
                            margin: 25px 0 12px 0;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        }
                        
                        .cv-right-item {
                            margin-bottom: 20px;
                        }
                        
                        .cv-right-item p {
                            font-size: 0.9rem;
                            color: #333;
                            line-height: 1.5;
                            margin-bottom: 5px;
                        }
                        
                        .cv-education-item {
                            margin-bottom: 15px;
                        }
                        
                        .cv-education-institution {
                            font-weight: 700;
                            color: #000;
                            font-size: 0.9rem;
                            margin-bottom: 4px;
                        }
                        
                        .cv-education-degree {
                            color: #555;
                            font-size: 0.85rem;
                            margin-bottom: 4px;
                        }
                        
                        .cv-education-period {
                            color: #666;
                            font-size: 0.8rem;
                        }
                        
                        @media print {
                            body {
                                margin: 0;
                                padding: 0;
                                background: white;
                            }
                            .cv-container {
                                box-shadow: none;
                                margin: 0;
                                width: 210mm;
                                min-height: 297mm;
                            }
                            @page {
                                size: A4;
                                margin: 0;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="cv-container">
                        <div class="cv-layout">
                            <!-- Left Column (Teal) -->
                            <div class="cv-left-column">
                                <div class="cv-profile-image">
                                    <img src="${imageSrc}" alt="Razoyana Fariha">
                                </div>
                                <div class="cv-profile-section">
                                    <h3 class="cv-section-title-left">PROFILE</h3>
                                    <p class="cv-profile-text">Educational Technology and Engineering student skilled in digital tools, multimedia design, and e-learning platforms. Passionate about technology-driven education and looking forward to my first professional opportunity.</p>
                                </div>
                                <div class="cv-contact-section">
                                    <h3 class="cv-section-title-left">CONTACT ME</h3>
                                    <div class="cv-contact-item">
                                        <i class="fas fa-phone"></i> 01886374018
                                    </div>
                                    <div class="cv-contact-item">
                                        <i class="fas fa-envelope"></i> razoyanaf@gmail.com
                                    </div>
                                    <div class="cv-contact-item">
                                        <i class="fas fa-map-marker-alt"></i> Gazipur Dhaka, Bangladesh
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Right Column (Light Pink/Beige) -->
                            <div class="cv-right-column">
                                <div class="cv-name-header">
                                    <h1 class="cv-name">RAZOYANA FARIHA</h1>
                                    <p class="cv-title">Student</p>
                                </div>
                                
                                <div class="cv-content-section">
                                    <div class="cv-right-item">
                                        <h3 class="cv-section-title-right">EDUCATION</h3>
                                        <div class="cv-education-item">
                                            <p class="cv-education-institution">UNIVERSITY OF FRONTIER TECHNOLOGY, BANGLADESH</p>
                                            <p class="cv-education-degree">Educational technology and Engineering</p>
                                        </div>
                                        <div class="cv-education-item">
                                            <p class="cv-education-institution">GOVERNMENT COLLEGE, DINAJPUR</p>
                                            <p class="cv-education-period">2019-2020</p>
                                        </div>
                                    </div>
                                    
                                    <div class="cv-right-item">
                                        <h3 class="cv-section-title-right">LANGUAGE</h3>
                                        <p>English (proficient)</p>
                                        <p>Bangla (Native)</p>
                                    </div>
                                    
                                    <div class="cv-right-item">
                                        <h3 class="cv-section-title-right">COMPUTER SKILLS</h3>
                                        <p>Ms office/Google workspace</p>
                                        <p>Operating system</p>
                                        <p>Slide presentation</p>
                                        <p>Basic programming (HTML/CSS, C++)</p>
                                    </div>
                                    
                                    <div class="cv-right-item">
                                        <h3 class="cv-section-title-right">VOLUNTEER EXPERIENCE</h3>
                                        <p>Volunteered in organizing educational workshops and promoting digital learning initiatives.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
                    <script>
                        // Automatically print when page loads
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                                // Close window after printing
                                setTimeout(function() {
                                    window.close();
                                }, 500);
                            }, 1000);
                        };
                    </script>
                </body>
                </html>
            `;
            
            // Write the content to the new window
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            
            // Restore button after a short delay
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again. You can also take a screenshot of the CV section.');
            
            // Restore button on error
            this.innerHTML = originalHTML;
            this.disabled = false;
        }
    });
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
        if (!e.target.closest('nav') && navLinks && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks) {
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