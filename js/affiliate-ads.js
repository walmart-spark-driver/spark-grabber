/**
 * Affiliate Ads — dynamic rotation for the Samsung Galaxy S26 Ultra (device)
 * and car phone mount (gear) Amazon promos on the Bot Grabber home page.
 *
 * Goals:
 *  - Animate/rotate the product imagery + copy so the ads feel alive.
 *  - Keep everything lightweight and non-blocking so it never competes
 *    with the primary Bot Grabber APK download CTA.
 */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ----------------------------------------------------------------
       PRIMARY: Samsung Galaxy S26 Ultra device carousel + headline swap
       ---------------------------------------------------------------- */
    function initDeviceAd() {
        const slides = Array.from(document.querySelectorAll('.aff-device-slide'));
        const swatches = Array.from(document.querySelectorAll('.aff-swatch'));
        const headline = document.querySelector('.aff-device-headline');

        if (slides.length === 0) {
            return;
        }

        const headlines = [
            'The <span class="accent">phone built to win orders.</span>',
            'Galaxy AI + <span class="accent">sub-100ms grabs.</span>',
            'Super Fast Charging 3.0 — <span class="accent">grab all day.</span>',
            'All-day battery. <span class="accent">All-day grabs.</span>'
        ];

        let index = 0;

        function show(next) {
            slides.forEach(s => s.classList.remove('active'));
            swatches.forEach(s => s.classList.remove('active'));

            index = (next + slides.length) % slides.length;

            slides[index].classList.add('active');
            if (swatches[index]) {
                swatches[index].classList.add('active');
            }

            if (headline && headlines.length) {
                const copy = headlines[index % headlines.length];
                headline.classList.add('swap');
                setTimeout(() => {
                    headline.innerHTML = copy;
                    headline.classList.remove('swap');
                }, 320);
            }
        }

        // Manual control via color swatches
        swatches.forEach((swatch, i) => {
            swatch.addEventListener('click', () => {
                show(i);
                restart();
            });
        });

        show(0);

        let timer = null;
        function start() {
            if (prefersReducedMotion || slides.length <= 1) {
                return;
            }
            timer = setInterval(() => show(index + 1), 3500);
        }
        function restart() {
            if (timer) {
                clearInterval(timer);
            }
            start();
        }

        start();
    }

    /* ----------------------------------------------------------------
       SECONDARY: Car phone mount / gear image rotation
       ---------------------------------------------------------------- */
    function initGearAd() {
        const slides = Array.from(document.querySelectorAll('.aff-gear-slide'));

        if (slides.length === 0) {
            return;
        }

        let index = 0;
        slides[0].classList.add('active');

        if (prefersReducedMotion || slides.length <= 1) {
            return;
        }

        setInterval(() => {
            slides[index].classList.remove('active');
            index = (index + 1) % slides.length;
            slides[index].classList.add('active');
        }, 3000);
    }

    /* ----------------------------------------------------------------
       SLIM BANNERS: rotate the small product thumbnails
       ---------------------------------------------------------------- */
    function initBannerThumbs() {
        const thumbs = Array.from(document.querySelectorAll('.aff-banner-thumb'));

        if (thumbs.length === 0 || prefersReducedMotion) {
            return;
        }

        thumbs.forEach((thumb, offset) => {
            const imgs = Array.from(thumb.querySelectorAll('img'));

            if (imgs.length <= 1) {
                return;
            }

            let index = 0;
            // Stagger banners slightly so they don't flip in lockstep
            setTimeout(() => {
                setInterval(() => {
                    imgs[index].classList.remove('active');
                    index = (index + 1) % imgs.length;
                    imgs[index].classList.add('active');
                }, 2600);
            }, offset * 800);
        });
    }

    function init() {
        initDeviceAd();
        initGearAd();
        initBannerThumbs();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
