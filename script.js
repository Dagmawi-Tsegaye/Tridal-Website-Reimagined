document.addEventListener('DOMContentLoaded', () => {

    // Helper function to detect touch devices
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- WOW FACTOR: CUSTOM CURSOR ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        // Disable custom cursor on touch devices for better performance and usability
        if (isTouchDevice()) {
            cursor.style.display = 'none';
        } else {
            window.addEventListener('mousemove', e => {
                cursor.style.top = e.clientY + 'px';
                cursor.style.left = e.clientX + 'px';
            });
            document.querySelectorAll('a, button, .service-item, .portrait, .map-point-revised, .person-card-revised').forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
        }
    }

    // --- WOW FACTOR: PAGE TRANSITIONS ---
    const transitionOverlay = document.querySelector('.page-transition');
    if (transitionOverlay) {
        transitionOverlay.style.transform = 'scaleY(0)';
        transitionOverlay.style.transformOrigin = 'top';
    }
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        const isLocal = href && (href.startsWith('/') || href.includes('.html')) && !href.startsWith('#');
        const isNotNewTab = link.getAttribute('target') !== '_blank';
        if (isLocal && isNotNewTab) {
            link.addEventListener('click', e => {
                e.preventDefault();
                if (transitionOverlay) {
                    transitionOverlay.style.transform = 'scaleY(1)';
                    transitionOverlay.style.transformOrigin = 'bottom';
                    setTimeout(() => { window.location = href; }, 800);
                } else { window.location = href; }
            });
        }
    });
    
    // --- ADVANCED SCROLL ANIMATIONS ---
    const animatedElements = document.querySelectorAll('.fade-up, .image-reveal-container, .timeline-container, .gallery-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
    document.querySelectorAll('.stagger-container').forEach(container => {
        const children = container.querySelectorAll('.fade-up');
        children.forEach((child, index) => { child.style.setProperty('--stagger-index', index); });
    });

    // --- ANIMATED HERO TEXT ---
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.03}s`;
            heroTitle.appendChild(span);
        });
    }

    // --- SCROLLED HEADER EFFECT ---
    const header = document.querySelector('header');
    if (header) { window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 50); }); }

    // --- RESPONSIVE NAVIGATION ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navMenu.classList.toggle('nav-active');
        });
    }

    // --- HOME: INTERACTIVE SERVICES (FIXED FOR MOBILE) ---
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceBackgrounds = document.querySelectorAll('.services-background');
    if(serviceItems.length > 0 && serviceBackgrounds.length > 0) {
        serviceItems.forEach((item, index) => {
            const activateService = () => {
                serviceItems.forEach(i => i.classList.remove('is-active'));
                serviceBackgrounds.forEach(bg => bg.classList.remove('is-active'));
                item.classList.add('is-active');
                if(serviceBackgrounds[index]) {
                    serviceBackgrounds[index].classList.add('is-active');
                }
            };
            
            if (isTouchDevice()) {
                // On touch devices, use a click to toggle the active state.
                item.addEventListener('click', () => {
                    const wasActive = item.classList.contains('is-active');
                    // Deactivate all first
                    serviceItems.forEach(i => i.classList.remove('is-active'));
                    serviceBackgrounds.forEach(bg => bg.classList.remove('is-active'));
                    // If it wasn't already active, make it active
                    if (!wasActive) {
                       activateService();
                    }
                });
            } else {
                // On desktop, keep the original mouseenter behavior.
                item.addEventListener('mouseenter', activateService);
            }
        });
    }

    // --- HOME: TESTIMONIAL SHOWCASE (REDESIGNED) ---
    // This already used 'click', so no changes were needed. It's safe for mobile.
    const portraits = document.querySelectorAll('.portrait');
    const quotes = document.querySelectorAll('.testimonial-quote');
    if (portraits.length > 0 && quotes.length > 0) {
        portraits.forEach((portrait, index) => {
            portrait.addEventListener('click', () => {
                portraits.forEach(p => p.classList.remove('is-active'));
                quotes.forEach(q => q.classList.remove('is-active'));
                portrait.classList.add('is-active');
                if (quotes[index]) {
                    quotes[index].classList.add('is-active');
                }
            });
        });
    }
    
    // --- ABOUT PAGE: MOBILE FIX FOR CSS HOVER EFFECTS ---
    // This new block adds 'click' functionality for elements that only used ':hover' in CSS.
    if (isTouchDevice() && document.getElementById('about-our-people')) {
        const peopleCards = document.querySelectorAll('.person-card-revised');
        const mapPoints = document.querySelectorAll('.map-point-revised');
        const tappableElements = [...peopleCards, ...mapPoints];

        const closeAllTapped = (exceptThisOne) => {
            tappableElements.forEach(el => {
                if (el !== exceptThisOne) {
                    el.classList.remove('is-tapped');
                }
            });
        };

        tappableElements.forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the body click listener from firing
                const wasTapped = el.classList.contains('is-tapped');
                closeAllTapped(el);
                if (!wasTapped) {
                    el.classList.add('is-tapped');
                }
            });
        });

        // Add a listener to the whole document to close tapped elements when clicking away
        document.addEventListener('click', () => closeAllTapped(null));
    }


    // --- CONTACT FORM VALIDATION ---
    // This section was split into its own `contact-script.js` file in your project.
    // The original logic in this file is redundant. I've left it out to avoid conflicts.
    // The existing contact-script.js will handle the contact form correctly.
});
