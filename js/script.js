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

    // 4. Contact Form Submission (Web3Forms - Envío real de correo)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Visual feedback
            btn.innerText = 'Enviando mensaje...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Preparar los datos del formulario
            const formData = new FormData(form);
            
            // =================================================================
            // INSTRUCCIONES PARA CONFIGURAR EL CORREO:
            // 1. Entra a https://web3forms.com/
            // 2. Ingresa tu correo real (al que quieres que lleguen los clientes)
            // 3. Recibirás en tu correo un Access Key. 
            // 4. Pega ese Access Key justo abajo reemplazando 'TU_ACCESS_KEY_AQUI'
            // =================================================================
            formData.append("access_key", "TU_ACCESS_KEY_AQUI");
            
            // Asunto del correo que recibirás
            formData.append("subject", "Nuevo contacto desde Landing Page PP Logística");

            try {
                // Enviar la petición a Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();

                if (data.success) {
                    btn.innerText = '¡Mensaje Enviado!';
                    btn.style.backgroundColor = '#25D366'; // WhatsApp Green
                    form.reset();
                } else {
                    btn.innerText = 'Error al enviar (' + data.message + ')';
                    btn.style.backgroundColor = '#E63946'; // Red
                }
            } catch (error) {
                btn.innerText = 'Error de conexión';
                btn.style.backgroundColor = '#E63946';
            }
            
            // Restaurar el botón original después de 4 segundos
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 4000);
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
