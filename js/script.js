/**
 * Punto a Punto Logística - JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Effect on Navbar
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Initial check in case page is refreshed while scrolled down
    handleScroll();
    
    // Listen to scroll event
    window.addEventListener('scroll', handleScroll);

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon based on state
        if (navLinks.classList.contains('active')) {
            mobileToggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        } else {
            mobileToggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        }
    });

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                `;
            }
        });
    });

    // 3. Smooth Scrolling for Anchor Links (handled gracefully natively via CSS scroll-behavior)
    // Optional JS handling for edge cases or specific offsets can be added here if needed.

    // 4. Contact Form Submission (Mock behavior)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Visual feedback
            btn.innerText = 'Enviando...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                btn.innerText = '¡Mensaje Enviado!';
                btn.style.backgroundColor = '#25D366'; // WhatsApp Green for success
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    // 5. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15, // Trigger when 15% of the element is visible
            rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the very bottom
        };

        const revealOnScroll = new IntersectionObserver(function(
            entries,
            observer
        ) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    }

    // 6. Mensajerias Logo Color Toggle
    const brandCards = document.querySelectorAll('.brand-card');
    brandCards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle the color-active class on the clicked card
            card.classList.toggle('color-active');
        });
    });

    // 7. ScrollSpy Navbar Highlight
    const sections = document.querySelectorAll('section, header[id="inicio"]');
    const navItems = document.querySelectorAll('.nav-link');

    const updateActiveNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
});
