document.addEventListener("DOMContentLoaded", () => {


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

        toggle.addEventListener('click', () => {
            setMenuState(!menu.classList.contains('open'));
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setMenuState(false);
            });
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && menu.classList.contains('open')) {
                setMenuState(false);
                toggle.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900 && menu.classList.contains('open')) {
                setMenuState(false);
            }
        });
    }


    /* ========================================
        ELEMENTS
    ======================================== */

    const carousel = document.querySelector(
        ".featured-work .featured-work-cont .featured-work-grid"
    );

    const leftArrow = document.querySelector(
        ".featured-work .featured-work-cont .arrows button:first-child"
    );

    const rightArrow = document.querySelector(
        ".featured-work .featured-work-cont .arrows button:last-child"
    );

    if (!carousel || !leftArrow || !rightArrow) return;


    const cards = carousel.querySelectorAll(
        ".cont .card"
    );

    if (!cards.length) return;


    /* ========================================
        STATE
    ======================================== */

    let currentIndex = 0;

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;


    /* ========================================
        UPDATE ARROW STATES
    ======================================== */

    function updateArrows() {

        const isFirst = currentIndex <= 0;
        const isLast = currentIndex >= cards.length - 1;

        leftArrow.classList.toggle("inactive", isFirst);
        rightArrow.classList.toggle("inactive", isLast);

    }


    /* ========================================
        GET CARD POSITION
    ======================================== */

    function getCardPosition(index) {

        const card = cards[index];

        if (!card) return 0;

        return card.offsetLeft;

    }


    /* ========================================
        FIND CLOSEST CARD
    ======================================== */

    function getClosestCard() {

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {

            const distance = Math.abs(
                card.offsetLeft - carousel.scrollLeft
            );

            if (distance < closestDistance) {

                closestDistance = distance;
                closestIndex = index;

            }

        });

        return closestIndex;

    }


    /* ========================================
        MOVE TO CARD
    ======================================== */

    function moveToCard(index) {

        index = Math.max(
            0,
            Math.min(index, cards.length - 1)
        );

        currentIndex = index;

        /* Update arrows IMMEDIATELY */
        updateArrows();

        carousel.scrollTo({
            left: getCardPosition(index),
            behavior: "smooth"
        });

    }


    /* ========================================
        LEFT ARROW
    ======================================== */

    leftArrow.addEventListener("click", () => {

        if (currentIndex <= 0) return;

        moveToCard(currentIndex - 1);

    });


    /* ========================================
        RIGHT ARROW
    ======================================== */

    rightArrow.addEventListener("click", () => {

        if (currentIndex >= cards.length - 1) return;

        moveToCard(currentIndex + 1);

    });


    /* ========================================
        HORIZONTAL SCROLL
        UPDATE CARD INDEX IMMEDIATELY
    ======================================== */

    carousel.addEventListener("scroll", () => {

        const newIndex = getClosestCard();

        if (newIndex !== currentIndex) {

            currentIndex = newIndex;

            /* No timeout — update immediately */
            updateArrows();

        }

    });


    /* ========================================
        MOUSE DRAG START
    ======================================== */

    carousel.addEventListener("mousedown", (e) => {

        if (e.target.closest(".arrows")) return;

        isDragging = true;

        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;

        carousel.style.cursor = "grabbing";
        carousel.style.scrollBehavior = "auto";

    });


    /* ========================================
        MOUSE DRAG MOVE
    ======================================== */

    window.addEventListener("mousemove", (e) => {

        if (!isDragging) return;

        const distance = e.pageX - startX;

        carousel.scrollLeft =
            startScrollLeft - distance;

    });


    /* ========================================
        MOUSE DRAG RELEASE
    ======================================== */

    window.addEventListener("mouseup", () => {

        if (!isDragging) return;

        isDragging = false;

        carousel.style.cursor = "grab";
        carousel.style.scrollBehavior = "smooth";

        const closestIndex = getClosestCard();

        currentIndex = closestIndex;

        updateArrows();

        moveToCard(closestIndex);

    });


    /* ========================================
        CURSOR
    ======================================== */

    carousel.addEventListener("mouseleave", () => {

        if (!isDragging) {
            carousel.style.cursor = "grab";
        }

    });

    carousel.style.cursor = "grab";


    /* ========================================
        KEYBOARD ACCESSIBILITY
    ======================================== */

    leftArrow.addEventListener("keydown", (e) => {

        if (e.key === "Enter" || e.key === " ") {

            e.preventDefault();

            if (currentIndex > 0) {
                moveToCard(currentIndex - 1);
            }

        }

    });


    rightArrow.addEventListener("keydown", (e) => {

        if (e.key === "Enter" || e.key === " ") {

            e.preventDefault();

            if (currentIndex < cards.length - 1) {
                moveToCard(currentIndex + 1);
            }

        }

    });


    /* ========================================
        INITIAL STATE
    ======================================== */

    currentIndex = getClosestCard();

    updateArrows();

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
