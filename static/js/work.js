
document.addEventListener('mouseover', (e) => {
    const button = e.target.closest('.btn-primary');

    if (!button) return;

    const icon = button.querySelector('i');

    if (!icon) return;

    icon.classList.remove('fa-angle-right');
    icon.classList.add('fa-arrow-right');
});

document.addEventListener('mouseout', (e) => {
    const button = e.target.closest('.btn-primary');

    if (!button) return;

    /*
        Make sure we're actually leaving the button,
        not just moving between elements inside it.
    */
    if (button.contains(e.relatedTarget)) return;

    const icon = button.querySelector('i');

    if (!icon) return;

    icon.classList.remove('fa-arrow-right');
    icon.classList.add('fa-angle-right');
});





/* =====================================================
   CASE STUDIES FILTER
===================================================== */

const filterButtons = document.querySelectorAll(
    ".project-filter .filter-btn"
);

const caseStudiesGrid = document.querySelector(
    ".case-studies-grid"
);


/* =====================================================
   PROJECT DATA
===================================================== */

const projects = [

    /* =================================================
       DIGITAL EXPERIENCES
    ================================================= */

    {
        category: "Digital Experiences",

        project: "stripe",

        image:
            "https://i.pinimg.com/736x/66/9d/72/669d7204a7b59963fced0e66d35d137e.jpg",

        overlay: "green",

        description:
            "Kickstarter extends its global reach and continues to enhance the crowdfunding experience with Stripe"
    },

    {
        category: "Digital Experiences",

        project: "stripe",

        image:
            "https://i.pinimg.com/1200x/01/19/5b/01195bc84d8bc12254be4696aa1f8a5a.jpg",

        overlay: "orange",

        description:
            "Building a faster and more intuitive digital experience for modern businesses"
    },

    {
        category: "Digital Experiences",

        project: "stripe",

        image:
            "https://i.pinimg.com/1200x/71/31/53/713153d977227fd286a7c7a93303bd6d.jpg",

        overlay: "green",

        description:
            "Creating a scalable product experience designed around clarity and conversion"
    },


    /* =================================================
       BUSINESS SYSTEMS
    ================================================= */

    {
        category: "Business Systems",

        project: "stripe",

        image:
            "https://i.pinimg.com/1200x/71/31/53/713153d977227fd286a7c7a93303bd6d.jpg",

        overlay: "green",

        description:
            "A connected business system that helps teams operate more efficiently"
    },

    {
        category: "Business Systems",

        project: "stripe",

        image:
            "https://i.pinimg.com/1200x/01/19/5b/01195bc84d8bc12254be4696aa1f8a5a.jpg",

        overlay: "red",

        description:
            "Streamlining complex workflows into a simpler and more scalable system"
    },


    /* =================================================
       DIGITAL CONNECTIONS
    ================================================= */

    {
        category: "Digital Connections",

        project: "stripe",

        image:
            "https://i.pinimg.com/736x/66/9d/72/669d7204a7b59963fced0e66d35d137e.jpg",

        overlay: "purple",

        description:
            "Connecting customers, products and digital touchpoints into one experience"
    },


    /* =================================================
       INTELLIGENCE & OPTIMISATION
    ================================================= */

    {
        category: "Intelligence & Optimisation",

        project: "stripe",

        image:
            "https://i.pinimg.com/1200x/01/19/5b/01195bc84d8bc12254be4696aa1f8a5a.jpg",

        overlay: "red",

        description:
            "Using data and optimisation to improve digital performance and decision making"
    },

    {
        category: "Intelligence & Optimisation",

        project: "stripe",

        image:
            "https://i.pinimg.com/1200x/71/31/53/713153d977227fd286a7c7a93303bd6d.jpg",

        overlay: "green",

        description:
            "Turning complex information into clearer, more actionable digital experiences"
    }

];


/* =====================================================
   CREATE CARD
===================================================== */

function createCard(project) {

    return `
        <div class="card-img">

            <img
                src="${project.image}"
                alt="${project.project}"
                loading="lazy"
            >

            <div class="overlay ${project.overlay}"></div>

            <div class="cont">

                <div class="cont-title">

                    <p class="category">
                        ${project.category}
                    </p>

                    <p class="project">
                        ${project.project}
                    </p>

                </div>


                <div class="cont-descr">

                    <p class="descr">
                        ${project.description}
                    </p>

                    <a
                        href="#view-more"
                        class="btn-primary view"
                    >
                        View More
                        <i class="fas fa-angle-right"></i>
                    </a>

                </div>

            </div>

        </div>
    `;
}


/* =====================================================
   SHUFFLE ONLY FOR "ALL"
===================================================== */

function shuffleProjects(array) {

    /*
       Make a copy so the original project order
       is NEVER changed.

       This is important because category filters
       must retain their original order.
    */

    const shuffled = [...array];


    /*
       Fisher-Yates shuffle
    */

    for (let i = shuffled.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [
            shuffled[i],
            shuffled[randomIndex]
        ] = [
                shuffled[randomIndex],
                shuffled[i]
            ];
    }


    return shuffled;
}


/* =====================================================
   RENDER PROJECTS
===================================================== */

function renderProjects(projectList) {

    /*
       Clear current content.
    */

    caseStudiesGrid.innerHTML = "";


    /*
       Create rows in groups of 3.

       The order supplied to this function is
       preserved exactly.
    */

    for (let i = 0; i < projectList.length; i += 3) {

        const group = projectList.slice(i, i + 3);


        /* ---------------------------------------------
           CREATE ROW
        --------------------------------------------- */

        const row = document.createElement("div");

        row.className = "top";


        /*
           Alternate the layout.

           Row 1:
           LARGE | SMALL
                  | SMALL

           Row 2:
           SMALL | LARGE
           SMALL | LARGE
        */

        if ((i / 3) % 2 === 1) {

            row.style.flexDirection = "row-reverse";

        }


        /* ---------------------------------------------
           LARGE CARD
        --------------------------------------------- */

        const largeCard = document.createElement("div");

        largeCard.className = "card-img";


        largeCard.innerHTML =
            createCard(group[0])
                .replace(
                    '<div class="card-img">',
                    ""
                )
                .replace(
                    "</div>\n\n        ",
                    ""
                );


        largeCard.addEventListener(
            "click",
            function () {

                window.location.href =
                    "#view-more";

            }
        );


        row.appendChild(largeCard);


        /* ---------------------------------------------
           SMALL CARD COLUMN
        --------------------------------------------- */

        const cardGrid = document.createElement("div");

        cardGrid.className = "card-grid";


        /*
           Add remaining cards.

           If only one project exists,
           the card-grid still exists so the
           large card never becomes full width.
        */

        for (
            let j = 1;
            j < group.length;
            j++
        ) {

            const smallCard =
                document.createElement("div");

            smallCard.className =
                "card-img";


            smallCard.innerHTML =
                createCard(group[j])
                    .replace(
                        '<div class="card-img">',
                        ""
                    )
                    .replace(
                        "</div>\n\n        ",
                        ""
                    );


            smallCard.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "#view-more";

                }
            );


            cardGrid.appendChild(
                smallCard
            );

        }


        row.appendChild(cardGrid);


        /*
           Add completed row.
        */

        caseStudiesGrid.appendChild(row);

    }

}


/* =====================================================
   FILTER PROJECTS
===================================================== */

function filterProjects(filter) {

    /*
       ---------------------------------------------
       ALL
       ---------------------------------------------

       ONLY "ALL" gets shuffled.

       This means Digital Experiences,
       Business Systems, Digital Connections
       and Intelligence & Optimisation will
       be mixed together.
    */

    if (filter === "all") {

        return shuffleProjects(projects);

    }


    /*
       ---------------------------------------------
       CATEGORY FILTERS
       ---------------------------------------------

       These retain the original project order.
    */

    return projects.filter(
        function (project) {

            const category =
                project.category
                    .toLowerCase()
                    .replace(/&/g, "")
                    .replace(/\s+/g, "-");


            return category === filter;

        }
    );

}


/* =====================================================
   CHANGE CATEGORY
===================================================== */

function changeCategory(filter) {

    /*
       Start the small outgoing animation.
    */

    caseStudiesGrid.classList.remove(
        "is-entering"
    );

    caseStudiesGrid.classList.add(
        "is-changing"
    );


    /*
       Short delay.

       The old content shrinks slightly,
       disappears, then the new content
       immediately starts expanding.
    */

    setTimeout(
        function () {

            /*
               Get filtered content.

               "all" automatically receives
               a shuffled list.
            */

            const filteredProjects =
                filterProjects(filter);


            /*
               Render new content.
            */

            renderProjects(
                filteredProjects
            );


            /*
               Remove outgoing state.
            */

            caseStudiesGrid.classList.remove(
                "is-changing"
            );


            /*
               Start incoming animation.
            */

            caseStudiesGrid.classList.add(
                "is-entering"
            );


            /*
               Clean animation class.
            */

            setTimeout(
                function () {

                    caseStudiesGrid.classList.remove(
                        "is-entering"
                    );

                },
                320
            );

        },
        180
    );

}


/* =====================================================
   FILTER BUTTON EVENTS
===================================================== */

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                /*
                   Remove active state
                   from every button.
                */

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                /*
                   Activate clicked button.
                */

                button.classList.add(
                    "active"
                );


                /*
                   Get filter value.
                */

                const filter =
                    button.dataset.filter;


                /*
                   Change displayed projects.
                */

                changeCategory(
                    filter
                );

            }
        );

    }
);


/* =====================================================
   INITIAL LOAD
===================================================== */

/*
   Start on ALL.

   Because ALL is being rendered through
   filterProjects("all"), the initial projects
   are also mixed.
*/

renderProjects(
    filterProjects("all")
);
