(function () {
    'use strict';

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const header = $('#siteHeader');
    const hamburger = $('#hamburger');
    const mobileMenu = $('#mobileMenu');

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
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    $$('.reveal').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.08}s`;
        revealObserver.observe(el);
    });

    // Also reveal section headers
    $$('.section-header, .gallery__item, .download__content').forEach((el) => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    /* ===== Platform Button Demo ===== */
    $$('.platform-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.dataset.platform;
            const name = btn.querySelector('.platform-btn__name').textContent;

            // Brief flash effect
            btn.style.borderColor = 'var(--coral)';
            btn.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.3)';
            setTimeout(() => {
                btn.style.borderColor = '';
                btn.style.boxShadow = '';
            }, 600);
        });
    });

})();
