document.addEventListener('DOMContentLoaded', () => {

    // --- WOW FACTOR: CUSTOM CURSOR (CORRECTED) ---
    const cursor = document.querySelector('.custom-cursor');

    // This is the condition that determines if we should run the cursor logic.
    // It checks if the primary input method is a "fine" pointer (like a mouse).
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (cursor && isFinePointer) {
        // This code will now ONLY run on devices with a mouse.
        
        window.addEventListener('mousemove', e => {
            // Use requestAnimationFrame for smoother cursor movement.
            requestAnimationFrame(() => {
                cursor.style.top = `${e.clientY}px`;
                cursor.style.left = `${e.clientX}px`;
            });
        });

        // Add hover effects for interactive elements.
        const interactiveElements = 'a, button, .service-item, .portrait, .map-point-dot, .person-card-revised';
        document.querySelectorAll(interactiveElements).forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

    } else if (cursor) {
        // If it's not a fine pointer (i.e., it's a touch device), hide the cursor element completely.
        cursor.style.display = 'none';
    }


    // --- WOW FACTOR: PAGE TRANSITIONS ---
    const transitionOverlay = document.querySelector('.page-transition');
    if (transitionOverlay) {
        // Set the initial state for the transition-in animation.
        transitionOverlay.style.transform = 'scaleY(0)';
        transitionOverlay.style.transformOrigin = 'top';
    }
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return; // Skip links without an href
        const isLocal = (href.startsWith('/') || href.includes('.html')) && !href.startsWith('#');
        const isNotNewTab = link.getAttribute('target') !== '_blank';
        
        if (isLocal && isNotNewTab) {
            link.addEventListener('click', e => {
                e.preventDefault();
                if (transitionOverlay) {
                    transitionOverlay.style.transform = 'scaleY(1)';
                    transitionOverlay.style.transformOrigin = 'bottom';
                    // Wait for the animation to complete before navigating.
                    setTimeout(() => {
                        window.location = href;
                    }, 800);
                } else {
                    window.location = href;
                }
            });
        }
    });
    

    // --- ADVANCED SCROLL ANIMATIONS ---
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
    
    // Add stagger indexes for staggered animations
    document.querySelectorAll('.stagger-container').forEach(container => {
        const children = container.querySelectorAll('.fade-up');
        children.forEach((child, index) => {
            child.style.setProperty('--stagger-index', index);
        });
    });


    // --- ANIMATED HERO TEXT ---
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
            span.style.animationDelay = `${index * 0.03}s`;
            heroTitle.appendChild(span);
        });
    }


    // --- SCROLLED HEADER EFFECT ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }


    // --- RESPONSIVE NAVIGATION ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navMenu.classList.toggle('nav-active');
        });
    }

});
