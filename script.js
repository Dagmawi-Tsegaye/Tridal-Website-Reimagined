document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL DEVICE DETECTION ---
    // A flag to check if the device is touch-enabled. This helps decide whether to apply tap or hover logic.
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);


    // --- WOW FACTOR: CUSTOM CURSOR (CORRECTED) ---
    const cursor = document.querySelector('.custom-cursor');
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (cursor && isFinePointer) {
        window.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                cursor.style.top = `${e.clientY}px`;
                cursor.style.left = `${e.clientX}px`;
            });
        });

        const interactiveElements = 'a, button, .service-item, .portrait, .map-point-dot, .person-card-revised, .map-point';
        document.querySelectorAll(interactiveElements).forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

    } else if (cursor) {
        cursor.style.display = 'none';
    }


    // --- MOBILE TAP-TO-ACTIVATE FIX ---
    // This new block of code makes the hover-based sections work with a single tap on mobile.
    if (isTouchDevice) {
        // A function to handle the "tap-once-to-activate, tap-again-to-follow-link" logic.
        function makeTappable(selector) {
            const elements = document.querySelectorAll(selector);
            if (!elements.length) return;

            elements.forEach(element => {
                element.addEventListener('click', function(e) {
                    // Check if the element is already active
                    const wasActive = this.classList.contains('is-active');
                    
                    // First, remove 'is-active' from all other elements of the same type
                    elements.forEach(el => el.classList.remove('is-active'));

                    // If it wasn't already active, make it active and prevent the link from being followed
                    if (!wasActive) {
                        this.classList.add('is-active');
                        e.preventDefault(); // This is key: stops the link on the first tap
                    }
                    // If it WAS active, the class is now removed, and the second tap will proceed as a normal link click.
                });
            });

            // Add a listener to the document to close active elements when tapping elsewhere
            document.addEventListener('click', function(e) {
                if (!e.target.closest(selector)) {
                    elements.forEach(el => el.classList.remove('is-active'));
                }
            });
        }

        // Apply the tappable logic to all three problematic sections
        makeTappable('.service-item'); // For "Our Services" on the Home page
        makeTappable('.person-card-revised'); // For "Our People" on the About page
        makeTappable('.map-point'); // For "We Work Around the World" on the About page
    }


    // --- EXISTING FUNCTIONALITY (Leave As Is) ---
    
    // Page Transitions
    const transitionOverlay = document.querySelector('.page-transition');
    if (transitionOverlay) {
        transitionOverlay.style.transform = 'scaleY(0)';
        transitionOverlay.style.transformOrigin = 'top';
    }
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const isLocal = (href.startsWith('/') || href.includes('.html')) && !href.startsWith('#');
        const isNotNewTab = link.getAttribute('target') !== '_blank';
        
        if (isLocal && isNotNewTab) {
            link.addEventListener('click', e => {
                const parentIsTappable = e.target.closest('.service-item, .person-card-revised, .map-point');
                if (isTouchDevice && parentIsTappable && !parentIsTappable.classList.contains('is-active')) {
                    // The makeTappable function already handles preventDefault, so we let it do its job.
                    return;
                }
                
                e.preventDefault();
                if (transitionOverlay) {
                    transitionOverlay.style.transform = 'scaleY(1)';
                    transitionOverlay.style.transformOrigin = 'bottom';
                    setTimeout(() => { window.location = href; }, 800);
                } else {
                    window.location = href;
                }
            });
        }
    });

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.fade-up, .image-reveal-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // Stagger Animations
    document.querySelectorAll('.stagger-container').forEach(container => {
        const children = container.querySelectorAll('.fade-up');
        children.forEach((child, index) => {
            child.style.setProperty('--stagger-index', index);
        });
    });

    // Hero Text Animation
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

    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Responsive Navigation (Hamburger Menu)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navMenu.classList.toggle('nav-active');
        });
    }

});
