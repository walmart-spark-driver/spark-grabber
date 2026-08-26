/**
 * Gear Modal — intercepts the Gear nav link (data-gear-modal) and shows a
 * custom modal with car phone mount + delivery bag product options.
 * Standalone — no Bootstrap JS dependency.
 */
(function () {
    'use strict';

    /* ------------------------------------------------------------------
       Modal HTML
    ------------------------------------------------------------------ */
    var MODAL_HTML = [
        '<div id="gearModal" role="dialog" aria-modal="true" aria-labelledby="gearModalLabel" style="display:none">',
        '  <div class="gear-backdrop"></div>',
        '  <div class="gear-dialog">',
        '    <div class="gear-modal-content">',

        '      <div class="gear-modal-header">',
        '        <h2 class="gear-modal-title" id="gearModalLabel"><i class="bi bi-bag-check-fill" style="margin-right:0.5rem;"></i>Driver Gear</h2>',
        '        <button type="button" class="gear-close-btn" id="gearModalClose" aria-label="Close">&times;</button>',
        '      </div>',

        '      <div class="gear-modal-body">',
        '        <div class="gear-row">',

        '          <!-- Car Mount -->',
        '          <div class="gear-card">',
        '            <a href="https://amzn.to/3QKlmF2" class="gear-imgs" id="gearMountImgs" target="_blank" rel="nofollow sponsored noopener">',
        '              <img src="https://m.media-amazon.com/images/I/81woLlSmlHL._AC_SL1500_.jpg" alt="Car phone mount" class="active" loading="lazy">',
        '              <img src="https://m.media-amazon.com/images/I/81p1uVT98KL._AC_SL1500_.jpg" alt="Dashboard phone holder" loading="lazy">',
        '              <img src="https://m.media-amazon.com/images/I/71mwcqBjdeL._AC_SL1500_.jpg" alt="Vent phone mount" loading="lazy">',
        '            </a>',
        '            <div class="gear-dots" id="gearMountDots">',
        '              <button class="gear-dot active" aria-label="Image 1"></button>',
        '              <button class="gear-dot" aria-label="Image 2"></button>',
        '              <button class="gear-dot" aria-label="Image 3"></button>',
        '            </div>',
        '            <div class="gear-info">',
        '              <div class="gear-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>',
        '              <div class="gear-name">Car Mounts</div>',
        '              <div class="gear-sub">Hands-free. Grab-ready.</div>',
        '              <a href="https://amzn.to/3QKlmF2" class="gear-btn gear-btn--yellow" target="_blank" rel="nofollow sponsored noopener">',
        '                <i class="bi bi-eye-fill"></i> View',
        '              </a>',
        '            </div>',
        '          </div>',

        '          <!-- Delivery Bags -->',
        '          <div class="gear-card">',
        '            <a href="https://amzn.to/4uKOeL9" class="gear-imgs" id="gearBagImgs" target="_blank" rel="nofollow sponsored noopener">',
        '              <img src="https://m.media-amazon.com/images/I/71rS3R6numL._AC_UY436_QL65_.jpg" alt="Insulated delivery bag" class="active" loading="lazy">',
        '              <img src="https://m.media-amazon.com/images/I/71CVJq05n1L._AC_SX416_CB1169409_QL70_.jpg" alt="Delivery bag" loading="lazy">',
        '              <img src="https://m.media-amazon.com/images/I/71V9vbJ1vpL._AC_SX416_CB1169409_QL70_.jpg" alt="Delivery bag" loading="lazy">',
        '              <img src="https://m.media-amazon.com/images/I/61K2xSQeNUL._AC_SX416_CB1169409_QL70_.jpg" alt="Delivery bag set" loading="lazy">',
        '            </a>',
        '            <div class="gear-dots" id="gearBagDots">',
        '              <button class="gear-dot active" aria-label="Image 1"></button>',
        '              <button class="gear-dot" aria-label="Image 2"></button>',
        '              <button class="gear-dot" aria-label="Image 3"></button>',
        '              <button class="gear-dot" aria-label="Image 4"></button>',
        '            </div>',
        '            <div class="gear-info">',
        '              <div class="gear-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>',
        '              <div class="gear-name">Delivery Bags</div>',
        '              <div class="gear-sub">Keep orders hot.</div>',
        '              <a href="https://amzn.to/4uKOeL9" class="gear-btn gear-btn--teal" target="_blank" rel="nofollow sponsored noopener">',
        '                <i class="bi bi-eye-fill"></i> View',
        '              </a>',
        '            </div>',
        '          </div>',

        '        </div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>'
    ].join('\n');

    /* ------------------------------------------------------------------
       Styles
    ------------------------------------------------------------------ */
    var MODAL_STYLES = '<style id="gear-modal-styles">' +
        '#gearModal { position: fixed; inset: 0; z-index: 9999; display: flex !important; align-items: center; justify-content: center; }' +
        '#gearModal.gear-hidden { display: none !important; }' +
        '#gearModal .gear-backdrop {' +
        '  position: absolute; inset: 0;' +
        '  background: rgba(0,0,0,0.65);' +
        '  backdrop-filter: blur(2px);' +
        '}' +
        '#gearModal .gear-dialog {' +
        '  position: relative; z-index: 1;' +
        '  width: 100%; max-width: 320px;' +
        '  margin: 0.75rem;' +
        '  animation: gearFadeIn 0.2s ease;' +
        '}' +
        '@keyframes gearFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }' +
        '#gearModal .gear-modal-content {' +
        '  background: #111827;' +
        '  border: 1px solid rgba(255,255,255,0.1);' +
        '  border-radius: 16px;' +
        '  overflow: hidden;' +
        '  color: #fff;' +
        '}' +
        '#gearModal .gear-modal-header {' +
        '  display: flex;' +
        '  align-items: center;' +
        '  justify-content: space-between;' +
        '  padding: 0.9rem 1rem;' +
        '  background: rgba(0,0,0,0.3);' +
        '  border-bottom: 1px solid rgba(255,255,255,0.08);' +
        '}' +
        '#gearModal .gear-modal-title {' +
        '  font-size: 1rem;' +
        '  font-weight: 700;' +
        '  margin: 0;' +
        '}' +
        '#gearModal .gear-close-btn {' +
        '  background: transparent; border: none; color: #fff;' +
        '  font-size: 1.4rem; line-height: 1; cursor: pointer; padding: 0 0.2rem;' +
        '  opacity: 0.7;' +
        '}' +
        '#gearModal .gear-close-btn:hover { opacity: 1; }' +
        '#gearModal .gear-modal-body { padding: 0.875rem; }' +
        '#gearModal .gear-row {' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  gap: 0.75rem;' +
        '}' +
        '#gearModal .gear-card {' +
        '  width: 100%;' +
        '  background: rgba(255,255,255,0.05);' +
        '  border: 1px solid rgba(255,255,255,0.09);' +
        '  border-radius: 12px;' +
        '  overflow: hidden;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '}' +
        '#gearModal .gear-imgs {' +
        '  position: relative;' +
        '  height: 220px;' +
        '  background: rgba(255,255,255,0.04);' +
        '  flex-shrink: 0;' +
        '  display: block;' +
        '  cursor: pointer;' +
        '}' +
        '#gearModal .gear-imgs img {' +
        '  position: absolute;' +
        '  inset: 0;' +
        '  width: 100%; height: 100%;' +
        '  object-fit: contain;' +
        '  padding: 8px;' +
        '  opacity: 0;' +
        '  transition: opacity 0.4s ease;' +
        '}' +
        '#gearModal .gear-imgs img.active { opacity: 1; }' +
        '#gearModal .gear-dots {' +
        '  display: flex;' +
        '  justify-content: center;' +
        '  gap: 5px;' +
        '  padding: 5px 0;' +
        '  background: rgba(0,0,0,0.2);' +
        '  flex-shrink: 0;' +
        '}' +
        '#gearModal .gear-dot {' +
        '  width: 7px; height: 7px;' +
        '  border-radius: 50%;' +
        '  background: rgba(255,255,255,0.25);' +
        '  border: none; padding: 0; cursor: pointer;' +
        '  transition: background 0.2s, transform 0.2s;' +
        '}' +
        '#gearModal .gear-dot.active { background: #ffc107; transform: scale(1.4); }' +
        '#gearModal .gear-info {' +
        '  padding: 0.7rem 0.75rem 0.75rem;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  flex: 1;' +
        '  text-align: center;' +
        '  align-items: center;' +
        '}' +
        '#gearModal .gear-stars { color: #ffc107; font-size: 0.75rem; margin-bottom: 3px; }' +
        '#gearModal .gear-name { font-weight: 700; font-size: 0.9rem; margin-bottom: 2px; }' +
        '#gearModal .gear-sub { font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-bottom: 0.6rem; }' +
        '#gearModal .gear-btn {' +
        '  display: flex; align-items: center; justify-content: center; gap: 5px;' +
        '  width: 100%;' +
        '  font-weight: 700; font-size: 0.82rem;' +
        '  padding: 0.45rem 0.6rem;' +
        '  border-radius: 50px;' +
        '  text-decoration: none !important;' +
        '  transition: opacity 0.15s;' +
        '  margin-top: auto;' +
        '}' +
        '#gearModal .gear-btn:hover { opacity: 0.88; }' +
        '#gearModal .gear-btn--yellow { background: #ffc107; color: #111 !important; }' +
        '#gearModal .gear-btn--teal { background: #20c997; color: #fff !important; }' +
        '</style>';

    /* ------------------------------------------------------------------
       Image gallery
    ------------------------------------------------------------------ */
    function initGallery(imgContainerId, dotContainerId) {
        var imgContainer = document.getElementById(imgContainerId);
        var dotContainer = document.getElementById(dotContainerId);
        if (!imgContainer || !dotContainer) return null;

        var imgEls = Array.prototype.slice.call(imgContainer.querySelectorAll('img'));
        var dotEls = Array.prototype.slice.call(dotContainer.querySelectorAll('.gear-dot'));
        var index = 0;
        var timer = null;

        function show(next) {
            imgEls[index].classList.remove('active');
            if (dotEls[index]) dotEls[index].classList.remove('active');
            index = ((next % imgEls.length) + imgEls.length) % imgEls.length;
            imgEls[index].classList.add('active');
            if (dotEls[index]) dotEls[index].classList.add('active');
        }

        dotEls.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                clearInterval(timer);
                show(i);
                startTimer();
            });
        });

        function startTimer() {
            timer = setInterval(function () { show(index + 1); }, 3200);
        }

        function stopTimer() {
            clearInterval(timer);
            timer = null;
        }

        return { startTimer: startTimer, stopTimer: stopTimer };
    }

    /* ------------------------------------------------------------------
       Show / hide
    ------------------------------------------------------------------ */
    var galleries = [];

    function showModal() {
        var el = document.getElementById('gearModal');
        if (!el) return;
        el.classList.remove('gear-hidden');
        el.style.display = '';
        document.body.style.overflow = 'hidden';
        galleries.forEach(function (g) { if (g) g.startTimer(); });
        document.getElementById('gearModalClose').focus();
    }

    function hideModal() {
        var el = document.getElementById('gearModal');
        if (!el) return;
        el.classList.add('gear-hidden');
        document.body.style.overflow = '';
        galleries.forEach(function (g) { if (g) g.stopTimer(); });
    }

    /* ------------------------------------------------------------------
       Intercept Gear nav link
    ------------------------------------------------------------------ */
    function wireGearNavLink() {
        document.addEventListener('click', function (e) {
            var el = e.target;
            while (el && el.tagName !== 'A') el = el.parentNode;
            if (!el) return;
            if (el.hasAttribute('data-gear-modal')) {
                e.preventDefault();
                showModal();
            }
        });

        // Close on backdrop click
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('gear-backdrop')) hideModal();
        });

        // Close button
        document.addEventListener('click', function (e) {
            if (e.target.id === 'gearModalClose') hideModal();
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if ((e.key === 'Escape' || e.keyCode === 27) && document.getElementById('gearModal') && !document.getElementById('gearModal').classList.contains('gear-hidden')) {
                hideModal();
            }
        });
    }

    /* ------------------------------------------------------------------
       Init
    ------------------------------------------------------------------ */
    function init() {
        if (document.getElementById('gearModal')) return;

        if (!document.getElementById('gear-modal-styles')) {
            document.head.insertAdjacentHTML('beforeend', MODAL_STYLES);
        }

        document.body.insertAdjacentHTML('beforeend', MODAL_HTML);

        // Modal starts hidden
        document.getElementById('gearModal').classList.add('gear-hidden');

        galleries = [
            initGallery('gearMountImgs', 'gearMountDots'),
            initGallery('gearBagImgs', 'gearBagDots')
        ];

        wireGearNavLink();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
