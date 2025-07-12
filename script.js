document.addEventListener('DOMContentLoaded', () => {

    // --- WOW FACTOR: CUSTOM CURSOR ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        if ('ontouchstart' in window) { cursor.style.display = 'none'; }
        window.addEventListener('mousemove', e => {
            cursor.style.top = e.clientY + 'px';
            cursor.style.left = e.clientX + 'px';
        });
        document.querySelectorAll('a, button, .service-item, .portrait, .map-point').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
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

    // --- HOME: INTERACTIVE SERVICES (FIXED) ---
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceBackgrounds = document.querySelectorAll('.services-background');
    if(serviceItems.length > 0 && serviceBackgrounds.length > 0) {
        serviceItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                serviceItems.forEach(i => i.classList.remove('is-active'));
                serviceBackgrounds.forEach(bg => bg.classList.remove('is-active'));
                item.classList.add('is-active');
                if(serviceBackgrounds[index]) {
                    serviceBackgrounds[index].classList.add('is-active');
                }
            });
        });
    }

    // --- HOME: TESTIMONIAL SHOWCASE (REDESIGNED) ---
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

    // --- CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const isNameValid = validateField('name', 'name-error', val => val.trim() !== '');
            const isEmailValid = validateField('email', 'email-error', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
            const isSubjectValid = validateField('subject', 'subject-error', val => val.trim() !== '');
            const isMessageValid = validateField('message', 'message-error', val => val.trim().length >= 20);
            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                alert('Thank you for your message! It has been sent.');
                contactForm.submit();
            }
        });
        function validateField(fieldId, errorId, validationFn) {
            const field = document.getElementById(fieldId);
            const error = document.getElementById(errorId);
            if (!field) return false;
            const isValid = validationFn(field.value);
            if (error) { error.style.display = isValid ? 'none' : 'block'; }
            field.style.borderColor = isValid ? 'var(--color-subtle)' : 'var(--color-primary)';
            return isValid;
        }
    }
});
