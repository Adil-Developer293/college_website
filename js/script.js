// Complete script - Menu closes when clicking ANYWHERE
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileToggle || !navLinks) {
        console.error('Elements not found!');
        return;
    }
    
    // Track if menu is open
    let isMenuOpen = false;
    
    // 1. Toggle button click - open/close menu
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering document click
        
        if (!isMenuOpen) {
            // Open the menu
            openMenu();
        } else {
            // Close the menu
            closeMenu();
        }
    });
    
    // 2. Click ANYWHERE on document to close menu
    document.addEventListener('click', function() {
        if (isMenuOpen) {
            closeMenu();
        }
    });
    
    // 3. But don't close when clicking INSIDE the menu
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation(); // Stop click from bubbling to document
    });
    
    // 4. Also close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Functions
    function openMenu() {
        navLinks.classList.add('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-times';
        isMenuOpen = true;
        
        // Optional: Add body scroll lock
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
        isMenuOpen = false;
        
        // Optional: Restore body scroll
        document.body.style.overflow = '';
    }
});
      window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
        // Mobile Menu Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navActions = document.getElementById('navActions');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            navActions.classList.toggle('mobile-active');
            
            // Change icon
            if (navLinks.classList.contains('mobile-active')) {
                mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navLinks.classList.remove('mobile-active');
                    navActions.classList.remove('mobile-active');
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
        
        // Button click effects
        document.querySelectorAll('.nav-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = event.clientX - rect.left - size/2;
                const y = event.clientY - rect.top - size/2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
                
                // Demo action
                if(this.textContent.includes('Register')) {
                    alert('Registration form would open here!');
                } else if(this.textContent.includes('Login')) {
                    alert('Login modal would appear here!');
                } else if(this.textContent.includes('Explore')) {
                    alert('Redirecting to courses page...');
                }
            });
        });
        
        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
           // Animated Counter
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200; // Lower = faster
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText.replace('+', '').replace('%', '');
                const increment = target / speed;
                
                if(count < target) {
                    counter.innerText = Math.ceil(count + increment).toLocaleString();
                    
                    // Add + or % if present
                    const span = counter.querySelector('span');
                    if(span) {
                        counter.innerHTML = Math.ceil(count + increment).toLocaleString() + span.innerHTML;
                    }
                    
                    setTimeout(() => animateCounters(), 1);
                } else {
                    counter.innerText = target.toLocaleString();
                    if(counter.querySelector('span')) {
                        counter.innerHTML = target.toLocaleString() + counter.querySelector('span').innerHTML;
                    }
                }
            });
        }
        
        // Intersection Observer for animation on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        // Observe stats section
        const statsSection = document.getElementById('statistics');
        if (statsSection) {
            observer.observe(statsSection);
        }
        
        // Alternative: Animate on page load (if section is visible)
        window.addEventListener('load', () => {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                setTimeout(animateCounters, 500);
            }
        });
        
        // Hover effect enhancement
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.stat-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.stat-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // Add click to reveal more info
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('.stat-title').textContent;
                const number = this.querySelector('.stat-number').textContent;
                alert(`${title}: ${number}\n\nClick OK to continue.`);
            });
        });
        
        // Timeline animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.6s ease';
            timelineObserver.observe(item);
        });// Back to Top Button
        const backTop = document.getElementById('backTop');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backTop.style.opacity = '1';
                backTop.style.visibility = 'visible';
            } else {
                backTop.style.opacity = '0';
                backTop.style.visibility = 'hidden';
            }
        });
        
        backTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Animated Counters
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText.replace('K+', '000').replace('%', '');
                const increment = target / 100;
                
                if (count < target) {
                    let newCount = Math.ceil(count + increment);
                    if (target >= 1000) {
                        counter.innerText = (newCount/1000).toFixed(1).replace('.0', '') + 'K+';
                    } else if (counter.textContent.includes('%')) {
                        counter.innerText = newCount + '%';
                    } else {
                        counter.innerText = newCount;
                    }
                    setTimeout(animateCounters, 20);
                } else {
                    if (target >= 1000) {
                        counter.innerText = (target/1000).toFixed(1).replace('.0', '') + 'K+';
                    } else if (counter.textContent.includes('%')) {
                        counter.innerText = target + '%';
                    } else {
                        counter.innerText = target;
                    }
                }
            });
        }
        
        // Animate counters when footer is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(document.querySelector('.footer'));
        
        // Newsletter Form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('.email-input');
                const button = this.querySelector('.subscribe-btn');
                
                if (emailInput.value) {
                    const originalText = button.textContent;
                    button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                    button.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = 'linear-gradient(135deg, var(--secondary-color), #3b82f6)';
                        emailInput.value = '';
                    }, 3000);
                }
            });
        }
        
        // Social Media Hover Effects
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                const platform = this.querySelector('i').className.split(' ')[1];
                const colors = {
                    'fa-facebook-f': '#1877f2',
                    'fa-twitter': '#1da1f2',
                    'fa-instagram': '#e4405f',
                    'fa-linkedin-in': '#0a66c2',
                    'fa-youtube': '#ff0000'
                };
                
                if (colors[platform]) {
                    this.style.background = colors[platform];
                }
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            });
        });
        
        // Footer Links Hover Effects
        document.querySelectorAll('.footer-links a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(5px)';
                    icon.style.color = 'var(--accent-color)';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(0)';
                    icon.style.color = 'var(--secondary-color)';
                }
            });
        });
        
        // Add animation delays to columns
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.footer-col').forEach((col, index) => {
                col.style.animationDelay = `${index * 0.1}s`;
            });
        });