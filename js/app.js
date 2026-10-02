/* ==========================================================================
   Product View Menu — product gallery + quick-view lightbox
   Vanilla JS, no dependencies. Keyboard accessible.
   ========================================================================== */

(function () {
    'use strict';

    var IMAGES = [
        'img/b47a402ed5a05189400e2d650ebefa4979a3417d_1634456870.jpg',
        'img/987bbf684de2df847c8fa1dcb9570fbf580f79dc_1611468226.jpg',
        'img/9f5d8f6583a7289a096a9180ac88708856f4bd8f_1607433653.jpg',
        'img/9db64cde85334e3bf4a6571547d339c57867f11f_1634390548.jpg'
    ];

    var mainImage = document.getElementById('main-image');
    var lightbox = document.querySelector('.lightbox');
    var lightboxImage = document.getElementById('lightbox-image');
    var overlay = document.querySelector('.overlay');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var thumbRow = document.querySelector('.thumb-row');
    var thumbCol = lightbox.querySelector('.thumb-col');
    var lastFocused = null;

    /* --- selection -------------------------------------------------- */

    function setActive(list, index) {
        var items = list.querySelectorAll('.thumb');
        items.forEach(function (t, i) {
            var on = i === index;
            t.classList.toggle('is-active', on);
            t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
    }

    function showImage(index) {
        mainImage.src = IMAGES[index];
        mainImage.setAttribute('data-index', String(index));
        setActive(thumbRow, index);
        setActive(thumbCol, index);
    }

    function showLightboxImage(index) {
        lightboxImage.src = IMAGES[index];
        setActive(thumbCol, index);
        setActive(thumbRow, index);
    }

    /* --- thumbnails --------------------------------------------------- */

    function wireThumbs(list, handler) {
        list.addEventListener('click', function (e) {
            var thumb = e.target.closest('.thumb');
            if (!thumb) return;
            handler(Number(thumb.getAttribute('data-index')));
        });

        list.addEventListener('keydown', function (e) {
            var thumbs = Array.prototype.slice.call(list.querySelectorAll('.thumb'));
            var i = thumbs.indexOf(document.activeElement);
            if (i === -1) return;

            var handled = true;
            var horizontal = list.getAttribute('aria-orientation') !== 'vertical';
            var nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';
            var prevKey = horizontal ? 'ArrowLeft' : 'ArrowUp';

            if (e.key === nextKey) i = (i + 1) % thumbs.length;
            else if (e.key === prevKey) i = (i - 1 + thumbs.length) % thumbs.length;
            else if (e.key === 'Home') i = 0;
            else if (e.key === 'End') i = thumbs.length - 1;
            else handled = false;

            if (!handled) return;
            e.preventDefault();
            thumbs[i].focus();
            handler(Number(thumbs[i].getAttribute('data-index')));
        });
    }

    wireThumbs(thumbRow, showImage);

    /* clicking the main image opens the lightbox at the current view */
    mainImage.addEventListener('click', function () {
        openLightbox(Number(mainImage.getAttribute('data-index')) || 0);
    });
    mainImage.setAttribute('tabindex', '0');
    mainImage.setAttribute('role', 'button');
    mainImage.setAttribute('aria-label', 'Open photo viewer');
    mainImage.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(Number(mainImage.getAttribute('data-index')) || 0);
        }
    });

    /* --- lightbox ------------------------------------------------------ */

    function openLightbox(index) {
        lastFocused = document.activeElement;
        lightboxImage.src = IMAGES[index];
        setActive(thumbCol, index);
        overlay.hidden = false;
        lightbox.hidden = false;
        requestAnimationFrame(function () {
            overlay.classList.add('is-visible');
            lightbox.classList.add('is-visible');
        });
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeLightbox() {
        overlay.classList.remove('is-visible');
        lightbox.classList.remove('is-visible');
        /* wait for fade-out before hiding */
        setTimeout(function () {
            overlay.hidden = true;
            lightbox.hidden = true;
        }, 220);
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
    }

    wireThumbs(thumbCol, showLightboxImage);
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function (e) {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            closeLightbox();
        }
        /* keep focus trapped inside the dialog */
        if (e.key === 'Tab') {
            var focusables = lightbox.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
            if (!focusables.length) return;
            var first = focusables[0];
            var last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
})();
