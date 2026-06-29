(function () {
    'use strict';

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const header = $('#siteHeader');
    const hamburger = $('#hamburger');
    const mobileMenu = $('#mobileMenu');
    const cursorGlow = $('#cursorGlow');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ===== Cursor Glow ===== */
    if (cursorGlow && !prefersReducedMotion) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }, { passive: true });
    }

    /* ===== Mobile Menu ===== */
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    /* ===== Smooth Scroll ===== */
    $$('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* ===== Header Scroll ===== */
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ===== Scroll Reveal ===== */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    // Observe all elements that should reveal
    $$('.reveal, .features__header, .gallery__header, .gallery__item, .arsenal__left, .arsenal__right, .download__content').forEach((el) => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
        revealObserver.observe(el);
    });

    // Stagger gallery items
    $$('.gallery__item').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.1}s`;
    });

    // Stagger feature cards with offset for the large card
    $$('.feature-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.06}s`;
    });

    /* ===== Gallery keyboard accessibility ===== */
    $$('.gallery__item').forEach((item) => {
        item.setAttribute('tabindex', '0');
    });

})();
