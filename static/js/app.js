document.querySelectorAll('.btn-primary').forEach(button => {
    const icon = button.querySelector('i');

    if (!icon) return;

    button.addEventListener('mouseenter', () => {
        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-arrow-right');
    });

    button.addEventListener('mouseleave', () => {
        icon.classList.remove('fa-arrow-right');
        icon.classList.add('fa-angle-right');
    });
});


(function () {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('mobileMenu');

    if (toggle && menu && !window.nexoraMobileMenuReady) {
        window.nexoraMobileMenuReady = true;

        function setMenuState(isOpen) {
            menu.classList.toggle('open', isOpen);
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);
        }

        function toggleMenu() {
            setMenuState(!menu.classList.contains('open'));
        }

        toggle.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                setMenuState(false);
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('open')) {
                setMenuState(false);
                toggle.focus();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 900 && menu.classList.contains('open')) {
                setMenuState(false);
            }
        });
    }
})();



const carousel = document.querySelector(
    '.hero-wrapper .stats .stat-carousel'
);

const step = carousel?.querySelector(
    '.hero-wrapper .stats .stat-carousel .step'
);

const statValues = carousel?.querySelectorAll(
    '.hero-wrapper .stats .stat-carousel .stat-value'
);

if (carousel && step && statValues) {

    let currentX = 0;
    let scrollTimeout;
    let isManuallyScrolling = false;


    /* ─────────────────────────────
    STAT HOVER EFFECT
    ───────────────────────────── */

    statValues.forEach(stat => {

        stat.addEventListener('mouseenter', () => {

            statValues.forEach(item => {

                if (item === stat) {
                    item.classList.add('is-active');
                    item.classList.remove('is-dimmed');
                } else {
                    item.classList.add('is-dimmed');
                    item.classList.remove('is-active');
                }

            });

        });

        stat.addEventListener('mouseleave', () => {

            statValues.forEach(item => {
                item.classList.remove('is-active');
                item.classList.remove('is-dimmed');
            });

        });

    });



    /* ─────────────────────────────
    CAROUSEL ENTER
    ───────────────────────────── */

    carousel.addEventListener('mouseenter', () => {

        step.style.animationPlayState = 'paused';

    });


    /* ─────────────────────────────
    CAROUSEL WHEEL / TRACKPAD
    ───────────────────────────── */

    carousel.addEventListener('wheel', (event) => {

        event.preventDefault();

        isManuallyScrolling = true;

        /* Pause automatic movement */
        step.style.animationPlayState = 'paused';


        /* ─────────────────────────
        GET SCROLL DIRECTION
        ───────────────────────── */

        let movement;

        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
            movement = event.deltaX;
        } else {
            movement = event.deltaY;
        }


        /* ─────────────────────────
        MANUAL MOVEMENT
        ───────────────────────── */

        currentX -= movement * 0.8;


        /* ─────────────────────────
        INFINITE LOOP
        ───────────────────────── */

        const halfWidth = step.scrollWidth / 2;

        if (currentX <= -halfWidth) {
            currentX += halfWidth;
        }

        if (currentX >= 0) {
            currentX -= halfWidth;
        }


        /* ─────────────────────────
        APPLY POSITION
        ───────────────────────── */

        step.style.transform =
            `translate3d(${currentX}px, 0, 0)`;


        /* ─────────────────────────
        RESET RESUME TIMER
        ───────────────────────── */

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {

            isManuallyScrolling = false;

            /*
            * Keep the manually selected
            * position while the mouse is
            * still inside the carousel.
            */
            if (carousel.matches(':hover')) {
                return;
            }


            /*
            * Mouse has left and scrolling
            * has stopped → resume animation.
            */

            step.style.transform = '';
            step.style.animationPlayState = 'running';

        }, 500);

    }, {
        passive: false
    });


    /* ─────────────────────────────
    CAROUSEL LEAVE
    ───────────────────────────── */

    carousel.addEventListener('mouseleave', () => {

        clearTimeout(scrollTimeout);

        isManuallyScrolling = false;

        /*
        * Return control to the
        * automatic CSS animation.
        */

        step.style.transform = '';
        step.style.animationPlayState = 'running';

    });

}



// ── FILTER CLICK: show only the selected image ──
(function () {
    const filters = document.querySelectorAll('.problem .prob-cont .filters .option');
    const cards = document.querySelectorAll('.problem .prob-cont .problem-grid .card');

    // Helper: activate a card by its data-target
    function activateCard(targetId) {
        cards.forEach(card => {
            card.classList.remove('active-card');
            if (card.classList.contains(targetId)) {
                card.classList.add('active-card');
            }
        });
    }

    // Set initial active state (first filter is already active)
    const initialActive = document.querySelector('.problem .prob-cont .filters .option.active');
    if (initialActive) {
        const target = initialActive.getAttribute('data-target');
        activateCard(target);
    } else {
        // fallback: first card
        if (cards.length) cards[0].classList.add('active-card');
    }

    // Click handler
    filters.forEach(filter => {
        filter.addEventListener('click', function () {
            // Update active class on filters
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding card
            const target = this.getAttribute('data-target');
            activateCard(target);
        });
    });
})();



// ============================================
// CLIENT STORIES — continuous color morph + crossfade
// The frame's color is INTERPOLATED from scroll position,
// so it melts from one card color into the next — never snaps.
// ============================================

(() => {
    const frame = document.getElementById("storiesFrame");
    const track = document.getElementById("storiesTrack");

    if (!frame || !track) return;

    const images = frame.querySelectorAll(".frame-image");
    const dashes = document.querySelectorAll("#storiesDashes .dash");
    const navItems = document.querySelectorAll(".stories-nav-item");
    const cards = track.querySelectorAll(".story-card");

    // One color per card, in order
    const COLORS = [
        [24, 86, 125],    // card 1 — More Visibility
        [91, 73, 126],    // card 2 — More Trust
        [133, 55, 62],    // card 3 — More Control
        [18, 105, 105],   // card 4 — More Momentum
    ];

    let activeIndex = 0;
    let ticking = false;

    /* ---------- Per-frame update (scroll-driven) ---------- */
    function update() {
        ticking = false;

        const cardWidth = cards[0].offsetWidth;
        if (!cardWidth) return;

        // Floating position: 0.0 → 3.0 across the whole strip
        const raw = track.scrollLeft / cardWidth;
        const pos = Math.min(
            COLORS.length - 1,
            Math.max(0, raw)
        );

        const i = Math.floor(pos);
        const t = pos - i;
        const next = Math.min(i + 1, COLORS.length - 1);

        // --- 1. Interpolated background color ---
        const r = Math.round(
            COLORS[i][0] +
            (COLORS[next][0] - COLORS[i][0]) * t
        );

        const g = Math.round(
            COLORS[i][1] +
            (COLORS[next][1] - COLORS[i][1]) * t
        );

        const b = Math.round(
            COLORS[i][2] +
            (COLORS[next][2] - COLORS[i][2]) * t
        );

        const storyColor = `rgb(${r}, ${g}, ${b})`;

        // Apply color to the stories frame
        frame.style.backgroundColor = storyColor;

        // Apply the SAME color to the active SVG
        const index = Math.round(pos);

        navItems.forEach((item, k) => {
            item.classList.toggle("is-active", k === index);

            const svg = item.querySelector(".nav-dot svg");

            if (k === index) {
                item.style.setProperty("--story-color", storyColor);
            } else {
                item.style.removeProperty("--story-color");
            }

            if (svg) {
                svg.style.color = k === index
                    ? storyColor
                    : "";
            }
        });

        // --- 2. Photo crossfade, same math ---
        images.forEach((img, k) => {
            const opacity = Math.max(
                0,
                1 - Math.abs(pos - k)
            );

            img.style.opacity = opacity.toFixed(3);
        });

        // --- 3. Indicators (nearest card) ---
        if (index !== activeIndex) {
            activeIndex = index;

            dashes.forEach((dash, k) =>
                dash.classList.toggle(
                    "is-active",
                    k === index
                )
            );
        }
    }

    track.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        },
        { passive: true }
    );

    /* ---------- Click a name → smooth-scroll to its panel ---------- */
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const index = Number(item.dataset.index);

            track.scrollTo({
                left: cards[index].offsetWidth * index,
                behavior: "smooth",
            });
        });
    });

    /* ---------- Keep everything aligned on resize ---------- */
    window.addEventListener(
        "resize",
        () => {
            track.scrollTo({
                left: cards[activeIndex].offsetWidth * activeIndex,
                behavior: "instant",
            });

            update();
        },
        { passive: true }
    );

    update();
})();



document.addEventListener("DOMContentLoaded", () => {

    const eyebrow = document.querySelector(
        ".hero-wrapper .hero-cont .eyebrow"
    );

    if (!eyebrow) return;

    /*
     * =======================================================
     * SAVE ORIGINAL TEXT
     * =======================================================
     */

    const text = eyebrow.textContent.trim();

    /*
     * =======================================================
     * SPLIT TEXT INTO INDIVIDUAL CHARACTERS
     * =======================================================
     */

    eyebrow.innerHTML = "";

    [...text].forEach((character) => {

        const span = document.createElement("span");

        span.classList.add("char");

        /*
         * Preserve spaces without allowing HTML
         * whitespace collapsing to destroy the spacing.
         */
        if (character === " ") {

            span.classList.add("space");
            span.innerHTML = "&nbsp;";

        } else {

            span.textContent = character;

        }

        eyebrow.appendChild(span);

    });

    const chars = [
        ...eyebrow.querySelectorAll(".char:not(.space)")
    ];

    /*
     * =======================================================
     * ANIMATION SETTINGS
     * =======================================================
     *
     * duration = how long each letter moves
     *
     * stagger = how quickly the wave travels
     * from one letter to the next
     *
     * Smaller stagger = tighter / faster wave
     * Larger stagger = wider / slower wave
     */

    const duration = 900;
    const stagger = 26;

    /*
     * =======================================================
     * SMOOTH WAVE
     * =======================================================
     */

    chars.forEach((char, index) => {

        char.animate(

            [
                /*
                 * ------------------------------------------------
                 * START
                 * ------------------------------------------------
                 *
                 * Letter begins below the visible position.
                 */
                {
                    transform: "translate3d(0, 115%, 0)",
                    opacity: 0
                },

                /*
                 * ------------------------------------------------
                 * WAVE RISING
                 * ------------------------------------------------
                 *
                 * Letter has entered and is moving upward.
                 */
                {
                    transform: "translate3d(0, 42%, 0)",
                    opacity: 1,
                    offset: 0.35
                },

                /*
                 * ------------------------------------------------
                 * WAVE CREST
                 * ------------------------------------------------
                 *
                 * Slightly passes the baseline.
                 * This creates the natural wave motion.
                 */
                {
                    transform: "translate3d(0, -7%, 0)",
                    opacity: 1,
                    offset: 0.68
                },

                /*
                 * ------------------------------------------------
                 * FINAL POSITION
                 * ------------------------------------------------
                 *
                 * Letter settles perfectly into its original
                 * baseline.
                 */
                {
                    transform: "translate3d(0, 0, 0)",
                    opacity: 1,
                    offset: 1
                }

            ],

            {
                duration: duration,

                /*
                 * This is what makes the wave travel smoothly
                 * from left → right.
                 */
                delay: index * stagger,

                /*
                 * Premium smooth easing.
                 *
                 * No bounce.
                 * No elastic movement.
                 * No harsh stop.
                 */
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",

                fill: "forwards"
            }

        );

    });

});




document.addEventListener('DOMContentLoaded', function () {

    const container = document.querySelector('.work .work-cont .work-grid-container');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');

    if (!container || !leftArrow || !rightArrow) return;

    const cards = container.querySelectorAll('.card');

    if (!cards.length) return;

    let activeIndex = 0;

    // Update arrow states
    function updateArrows() {

        // First card
        if (activeIndex === 0) {
            leftArrow.classList.add('inactive');
            leftArrow.disabled = true;
        } else {
            leftArrow.classList.remove('inactive');
            leftArrow.disabled = false;
        }

        // Last card
        if (activeIndex === cards.length - 1) {
            rightArrow.classList.add('inactive');
            rightArrow.disabled = true;
        } else {
            rightArrow.classList.remove('inactive');
            rightArrow.disabled = false;
        }
    }

    // Set active card
    function setActive(index) {

        activeIndex = Math.max(
            0,
            Math.min(index, cards.length - 1)
        );

        cards.forEach((card, index) => {
            card.classList.toggle(
                'active',
                index === activeIndex
            );
        });

        updateArrows();
    }

    // Find the card closest to the current scroll position
    function updateActiveFromScroll() {

        let closestIndex = 0;
        let smallestDistance = Infinity;

        cards.forEach((card, index) => {

            const distance = Math.abs(
                card.offsetLeft - container.scrollLeft
            );

            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestIndex = index;
            }

        });

        if (closestIndex !== activeIndex) {
            setActive(closestIndex);
        }
    }

    // Move to a specific card
    function goToCard(index) {

        if (index < 0 || index >= cards.length) return;

        setActive(index);

        container.scrollTo({
            left: cards[index].offsetLeft,
            behavior: 'smooth'
        });
    }

    // Left arrow
    leftArrow.addEventListener('click', function () {

        if (activeIndex > 0) {
            goToCard(activeIndex - 1);
        }

    });

    // Right arrow
    rightArrow.addEventListener('click', function () {

        if (activeIndex < cards.length - 1) {
            goToCard(activeIndex + 1);
        }

    });

    // Update active card immediately while scrolling
    container.addEventListener('scroll', function () {
        requestAnimationFrame(updateActiveFromScroll);
    });

    // Initialize
    setActive(0);

});




document.addEventListener('DOMContentLoaded', function () {

    const languages = document.querySelectorAll(
        '.work .work-cont .work-grid-container .card .text-cont .group .grid .language'
    );

    languages.forEach(language => {

        let water = null;
        let removeTimer = null;

        language.addEventListener('mouseenter', function () {

            clearTimeout(removeTimer);

            /*
             * Create the water only when the user
             * actually enters the technology pill.
             */
            water = document.createElement('span');
            water.className = 'water';

            const surface = document.createElement('span');
            surface.className = 'water-surface';

            water.appendChild(surface);
            language.appendChild(water);

            /*
             * Force the browser to render the
             * initial 0% state before starting
             * the filling animation.
             */
            water.offsetHeight;

            requestAnimationFrame(() => {
                water.classList.add('active');
            });

            language.style.color = '#ffffff';

        });

        language.addEventListener('mouseleave', function () {

            if (!water) return;

            /*
             * Reverse the fill so the water
             * drains instead of disappearing.
             */
            water.classList.remove('active');

            language.style.color = '#000000';

            const currentWater = water;

            removeTimer = setTimeout(() => {

                if (currentWater.parentNode === language) {
                    currentWater.remove();
                }

                if (water === currentWater) {
                    water = null;
                }

            }, 1300);

        });

    });

});


document.addEventListener("DOMContentLoaded", function () {

    const testimonial = document.querySelector(".testimonial");

    if (!testimonial) return;


    /*
    ============================================================
    ELEMENTS
    ============================================================
    */

    const grid = testimonial.querySelector(".testimonial-grid");
    const carousel = grid?.querySelector(".carousel");
    const cards = carousel?.querySelectorAll(".card");


    /*
    ============================================================
    REQUIRE EXACTLY 4 CARDS
    ============================================================
    */

    if (
        !grid ||
        !carousel ||
        !cards ||
        cards.length !== 4
    ) {
        return;
    }


    /*
    ============================================================
    GET MAXIMUM PHYSICAL SCROLL
    ============================================================
    */

    function getMaxScroll() {

        return Math.max(
            0,
            grid.scrollWidth - grid.clientWidth
        );

    }


    /*
    ============================================================
    GET POSITION FOR CARDS 1–3 ONLY
    ============================================================
    */

    function getNormalCardPosition(index) {

        if (index === 0) {
            return 0;
        }


        const styles =
            getComputedStyle(carousel);

        const leftPadding =
            parseFloat(styles.paddingLeft) || 0;


        return Math.max(
            0,
            Math.min(
                cards[index].offsetLeft - leftPadding,
                getMaxScroll()
            )
        );

    }


    /*
    ============================================================
    MANUAL SCROLL
    ============================================================
    */

    grid.addEventListener(
        "scroll",
        function () {

            /*
            Physical start.
            */

            if (grid.scrollLeft <= 1) {
                return;
            }


            /*
            Physical end.

            The carousel is considered finished
            ONLY when it reaches the real maximum
            scroll position.
            */

            if (
                grid.scrollLeft >=
                getMaxScroll() - 1
            ) {
                return;
            }

        },
        {
            passive: true
        }
    );


    /*
    ============================================================
    RESIZE
    ============================================================
    */

    window.addEventListener(
        "resize",
        function () {

            /*
            Keep the current physical scroll position.
            */

            const maxScroll =
                getMaxScroll();

            if (
                grid.scrollLeft >
                maxScroll
            ) {

                grid.scrollTo({
                    left: maxScroll,
                    behavior: "auto"
                });

            }

        }
    );


    /*
    ============================================================
    INITIAL POSITION
    ============================================================
    */

    grid.scrollTo({
        left: 0,
        behavior: "auto"
    });

});






const faqItems = document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");


    question.addEventListener("click", () => {

        /*
        ========================================
        SAVE EXACT QUESTION POSITION
        ========================================
        */

        const originalTop = question.getBoundingClientRect().top;


        /*
        ========================================
        TOGGLE FAQ
        ========================================
        */

        item.classList.toggle("active");


        /*
        ========================================
        KEEP QUESTION IN EXACT SAME POSITION
        ========================================
        */

        const keepPosition = () => {

            const currentTop = question.getBoundingClientRect().top;

            const difference = currentTop - originalTop;


            if (difference !== 0) {

                window.scrollTo({
                    top: window.scrollY + difference,
                    left: 0,
                    behavior: "instant"
                });

            }

        };


        /*
        ========================================
        RESTORE IMMEDIATELY
        ========================================
        */

        requestAnimationFrame(keepPosition);


        /*
        ========================================
        KEEP POSITION DURING ANIMATION
        ========================================
        */

        const duration = 300;

        const startTime = performance.now();


        const maintainPosition = (currentTime) => {

            keepPosition();


            if (currentTime - startTime < duration) {

                requestAnimationFrame(maintainPosition);

            }

        };


        requestAnimationFrame(maintainPosition);

    });

});






