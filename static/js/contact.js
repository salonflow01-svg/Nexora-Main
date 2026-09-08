(function () {
    'use strict';

    /* ============================================================
       NEXORA PROJECT ENQUIRY
       ============================================================ */

    const WHATSAPP_NUMBER = '254713324672';


    /* ============================================================
       DOM ELEMENTS
       ============================================================ */

    const section03 =
        document.querySelector('.project-type-section');

    const section04 =
        document.getElementById('projectDetailsSection');

    const cards =
        document.querySelectorAll('.project-card');

    const continueBtn =
        document.getElementById('continueBtn');

    const continueStatus =
        document.getElementById('continueStatus');

    const backBtn =
        document.getElementById('backBtn');

    const branchContent =
        document.getElementById('branchContent');


    /* ============================================================
       STATE
       ============================================================ */

    const state = {

        selectedType: null,

        timeline: null, // 'as_soon_as_possible', 'within_1_month', '1_3_months', 'just_exploring'

        budget: null, // number in KSH

        formData: {

            website: {
                purpose: '',
                for: '',
                goals: ''
            },

            experience: {
                type: [],
                do: [],
                problem: ''
            },

            business: {
                area: [],
                process: '',
                success: ''
            }

        }

    };


    /* ============================================================
       LABELS
       ============================================================ */

    const labels = {

        website: 'Business Website',

        experience: 'Booking & Client Experience',

        business: 'Digital Presence Refresh'

    };


    /* ============================================================
       BRANCH TITLES
       ============================================================ */

    const branchTitles = {

        website:
            "Let's shape your website.",

        experience:
            "Let's improve your client journey.",

        business:
            "Let's improve what you already have."

    };


    /* ============================================================
       BRANCH DESCRIPTIONS
       ============================================================ */

    const branchDescriptions = {

        website:
            'Tell us what you want your new website to do for your business.',

        experience:
            'Tell us how clients currently discover your business, explore your services and get in touch or book.',

        business:
            "Tell us what's not working with your current online presence and what you'd like to change."

    };


    /* ============================================================
       ESCAPE HTML
       ============================================================ */

    function escapeHTML(value) {

        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

    }


    /* ============================================================
       SELECT CARD
       ============================================================ */

    function selectCard(card) {

        const type = card.dataset.type;

        if (!labels[type]) {
            return;
        }


        cards.forEach(item => {

            item.classList.remove('active');

            item.setAttribute(
                'aria-checked',
                'false'
            );

        });


        card.classList.add('active');

        card.setAttribute(
            'aria-checked',
            'true'
        );


        state.selectedType = type;


        continueBtn.disabled = false;

        continueBtn.classList.add('active');


        continueStatus.textContent =
            `${labels[type]} selected`;

    }


    /* ============================================================
       CARD EVENTS
       ============================================================ */

    cards.forEach(card => {

        card.addEventListener(
            'click',
            function () {

                selectCard(this);

            }
        );


        card.addEventListener(
            'keydown',
            function (event) {

                if (
                    event.key === 'Enter' ||
                    event.key === ' '
                ) {

                    event.preventDefault();

                    selectCard(this);

                }

            }
        );

    });


    /* ============================================================
       RENDER PROJECT DETAILS (Section 03 - personalized form)
       ============================================================ */

    function renderBranch(type) {

        if (!type || !state.formData[type]) {
            return;
        }


        let html = `

            <p class="eyebrow">
                ${escapeHTML(
            type === 'website'
                ? 'BUSINESS WEBSITE'
                : type === 'experience'
                    ? 'BOOKING & CLIENT EXPERIENCE'
                    : 'DIGITAL PRESENCE REFRESH'
        )}
            </p>

            <h2 class="heading">
                ${escapeHTML(branchTitles[type])}
            </h2>

            <p class="descr">
                ${escapeHTML(branchDescriptions[type])}
            </p>

        `;


        /* ========================================================
           WEBSITE (radio – single select)
           ======================================================== */

        if (type === 'website') {

            const data =
                state.formData.website;


            html += `

                <div class="form-group">

                    <label>
                        What are you looking for?
                    </label>

                    <div
                        class="radio-group"
                        data-branch="website"
                        data-group="purpose">

                        <label class="radio-option ${data.purpose === 'A new website'
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="radio"
                                name="website_purpose"
                                value="A new website"
                                ${data.purpose === 'A new website'
                    ? 'checked'
                    : ''
                }>

                            A new website

                        </label>


                        <label class="radio-option ${data.purpose === 'A professional online presence'
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="radio"
                                name="website_purpose"
                                value="A professional online presence"
                                ${data.purpose === 'A professional online presence'
                    ? 'checked'
                    : ''
                }>

                            A professional online presence

                        </label>

                    </div>

                </div>


                <div class="form-group">

                    <label for="website_for">
                        Business / Brand Name
                    </label>

                    <input
                        type="text"
                        id="website_for"
                        value="${escapeHTML(data.for)}"
                        placeholder="e.g. Aura Wellness Spa">

                </div>


                <div class="form-group">

                    <label for="website_goals">
                        What should the website help you achieve?
                    </label>

                    <textarea
                        id="website_goals"
                        placeholder="Tell us what you want your website to help your business accomplish...">${escapeHTML(data.goals)}</textarea>

                </div>

            `;

        }


        /* ========================================================
           BOOKING & CLIENT EXPERIENCE (checkboxes)
           ======================================================== */

        else if (type === 'experience') {

            const data =
                state.formData.experience;


            html += `

                <div class="form-group">

                    <label>
                        What would you like to improve?
                    </label>

                    <div
                        class="checkbox-group"
                        data-branch="experience"
                        data-group="type">

                        <label class="checkbox-option ${data.type && data.type.includes('Make it easier to book')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="experience_type"
                                value="Make it easier to book"
                                ${data.type && data.type.includes('Make it easier to book')
                    ? 'checked'
                    : ''
                }>

                            Make it easier to book

                        </label>


                        <label class="checkbox-option ${data.type && data.type.includes('Make services easier to explore')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="experience_type"
                                value="Make services easier to explore"
                                ${data.type && data.type.includes('Make services easier to explore')
                    ? 'checked'
                    : ''
                }>

                            Make services easier to explore

                        </label>


                        <label class="checkbox-option ${data.type && data.type.includes('Make it easier to contact us')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="experience_type"
                                value="Make it easier to contact us"
                                ${data.type && data.type.includes('Make it easier to contact us')
                    ? 'checked'
                    : ''
                }>

                            Make it easier to contact us

                        </label>


                        <label class="checkbox-option ${data.type && data.type.includes('Improve the overall client experience')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="experience_type"
                                value="Improve the overall client experience"
                                ${data.type && data.type.includes('Improve the overall client experience')
                    ? 'checked'
                    : ''
                }>

                            Improve the overall client experience

                        </label>

                    </div>

                </div>


                <div class="form-group">

                    <label>
                        How do clients currently book or contact you?
                    </label>

                    <div
                        class="checkbox-group"
                        data-branch="experience"
                        data-group="do">

                        <label class="checkbox-option ${data.do && data.do.includes('WhatsApp')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="experience_do"
                                value="WhatsApp"
                                ${data.do && data.do.includes('WhatsApp')
                    ? 'checked'
                    : ''
                }>

                            WhatsApp

                        </label>


                        <label class="checkbox-option ${data.do && data.do.includes('Phone')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="experience_do"
                                value="Phone"
                                ${data.do && data.do.includes('Phone')
                    ? 'checked'
                    : ''
                }>

                            Phone

                        </label>


                        <label class="checkbox-option ${data.do && data.do.includes('Social Media')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="experience_do"
                                value="Social Media"
                                ${data.do && data.do.includes('Social Media')
                    ? 'checked'
                    : ''
                }>

                            Social Media

                        </label>


                        <label class="checkbox-option ${data.do && data.do.includes('Website')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="experience_do"
                                value="Website"
                                ${data.do && data.do.includes('Website')
                    ? 'checked'
                    : ''
                }>

                            Website

                        </label>


                        <label class="checkbox-option ${data.do && data.do.includes('Walk-ins')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="experience_do"
                                value="Walk-ins"
                                ${data.do && data.do.includes('Walk-ins')
                    ? 'checked'
                    : ''}>

                            Walk-ins

                        </label>


                        <label class="checkbox-option ${data.do && data.do.includes('Other')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="experience_do"
                                value="Other"
                                ${data.do && data.do.includes('Other')
                    ? 'checked'
                    : ''
                }>

                            Other

                        </label>

                    </div>

                </div>


                <div class="form-group">

                    <label for="experience_problem">
                        What would you like the new experience to improve?
                    </label>

                    <textarea
                        id="experience_problem"
                        placeholder="Tell us what currently feels difficult, confusing or inconvenient for your clients...">${escapeHTML(data.problem)}</textarea>

                </div>

            `;

        }


        /* ========================================================
           DIGITAL PRESENCE REFRESH (checkboxes)
           ======================================================== */

        else if (type === 'business') {

            const data =
                state.formData.business;


            html += `

                <div class="form-group">

                    <label>
                        What would you like to improve?
                    </label>

                    <div
                        class="checkbox-group"
                        data-branch="business"
                        data-group="area">

                        <label class="checkbox-option ${data.area && data.area.includes('Website Design')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="business_area"
                                value="Website Design"
                                ${data.area && data.area.includes('Website Design')
                    ? 'checked'
                    : ''
                }>

                            Website Design

                        </label>


                        <label class="checkbox-option ${data.area && data.area.includes('Website Structure')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="business_area"
                                value="Website Structure"
                                ${data.area && data.area.includes('Website Structure')
                    ? 'checked'
                    : ''
                }>

                            Website Structure

                        </label>


                        <label class="checkbox-option ${data.area && data.area.includes('Mobile Experience')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="business_area"
                                value="Mobile Experience"
                                ${data.area && data.area.includes('Mobile Experience')
                    ? 'checked'
                    : ''
                }>

                            Mobile Experience

                        </label>


                        <label class="checkbox-option ${data.area && data.area.includes('Services & Pricing Presentation')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="business_area"
                                value="Services & Pricing Presentation"
                                ${data.area && data.area.includes('Services & Pricing Presentation')
                    ? 'checked'
                    : ''
                }>

                            Services & Pricing Presentation

                        </label>


                        <label class="checkbox-option ${data.area && data.area.includes('Booking / Contact Journey')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="business_area"
                                value="Booking / Contact Journey"
                                ${data.area && data.area.includes('Booking / Contact Journey')
                    ? 'checked'
                    : ''
                }>

                            Booking / Contact Journey

                        </label>


                        <label class="checkbox-option ${data.area && data.area.includes('Overall Online Presence')
                    ? 'selected'
                    : ''
                }">

                            <input
                                type="checkbox"
                                name="business_area"
                                value="Overall Online Presence"
                                ${data.area && data.area.includes('Overall Online Presence')
                    ? 'checked'
                    : ''
                }>

                            Overall Online Presence

                        </label>

                    </div>

                </div>


                <div class="form-group">

                    <label for="business_process">
                        Current Website
                    </label>

                    <input
                        type="url"
                        id="business_process"
                        value="${escapeHTML(data.process)}"
                        placeholder="https://www.example.com">

                </div>


                <div class="form-group">

                    <label for="business_success">
                        What isn't working well right now?
                    </label>

                    <textarea
                        id="business_success"
                        placeholder="Tell us what feels outdated, unclear, difficult to use or no longer represents your business...">${escapeHTML(data.success)}</textarea>

                </div>

            `;

        }


        /* ========================================================
           CONTINUE BUTTON (instead of Send Enquiry)
           ======================================================== */

        html += `

            <div class="submit-row">

                <button
                    class="submit-btn"
                    id="continueFromDetailsBtn"
                    type="button">

                    Continue

                    <i class="fas fa-angle-right"></i>

                </button>

            </div>

        `;


        branchContent.innerHTML = html;


        attachFormEvents();

        // Attach continue button for this step
        const continueFromDetailsBtn =
            document.getElementById('continueFromDetailsBtn');

        if (continueFromDetailsBtn) {

            continueFromDetailsBtn.addEventListener(
                'click',
                function () {

                    // Validate project details
                    const validation = validateProjectForm();

                    if (!validation.valid) {

                        showValidationError(validation);
                        return;

                    }

                    // Proceed to timeline
                    showTimelineSection();

                }
            );

        }

    }


    /* ============================================================
       RENDER TIMELINE (Section 04) — radio-based cards
       ============================================================ */

    function renderTimeline() {

        const timelineOptions = [
            {
                value: 'as_soon_as_possible',
                title: 'AS SOON AS POSSIBLE',
                desc: "I'm ready to get started soon."
            },
            {
                value: 'within_1_month',
                title: 'WITHIN 1 MONTH',
                desc: "I'd like the project underway within the next month."
            },
            {
                value: '1_3_months',
                title: '1–3 MONTHS',
                desc: "I'm planning ahead and expect to start within the next few months."
            },
            {
                value: 'just_exploring',
                title: 'JUST EXPLORING',
                desc: "I'm still considering my options and don't have a specific timeline yet."
            }
        ];

        let html = `
            <p class="eyebrow">YOUR TIMELINE</p>
            <h2 class="heading">When would you like to get started?</h2>
            <p class="descr">Let us know when you’d ideally like to begin. Your timeline helps us understand your priorities and plan the project appropriately.</p>

            <div class="timeline-grid" role="radiogroup" aria-label="Timeline options">
        `;

        timelineOptions.forEach(option => {

            const checked = state.timeline === option.value ? 'checked' : '';

            html += `
                <label class="timeline-card" data-timeline="${option.value}">
                    <input type="radio" name="timeline" value="${option.value}" ${checked}>
                    <div class="timeline-card-content">
                        <div class="timeline-card-title">${option.title}</div>
                        <div class="timeline-card-desc">${option.desc}</div>
                        <div class="timeline-check"><i class="fas fa-check-circle"></i></div>
                    </div>
                </label>
            `;

        });

        html += `
            </div>

            <div class="project-supporting-note">
                Your timeline isn't a commitment. It simply helps us understand when you'd ideally like to move forward.
            </div>

            <div class="submit-row">
                <button class="submit-btn" id="continueFromTimelineBtn" type="button" ${!state.timeline ? 'disabled' : ''}>
                    Continue
                    <i class="fas fa-angle-right"></i>
                </button>
            </div>
        `;

        branchContent.innerHTML = html;

        // Attach change events to radio inputs
        const radioInputs = document.querySelectorAll('input[name="timeline"]');

        radioInputs.forEach(radio => {

            radio.addEventListener('change', function () {

                if (this.checked) {
                    state.timeline = this.value;
                }

                // Enable continue button
                const continueBtn = document.getElementById('continueFromTimelineBtn');
                if (continueBtn) {
                    continueBtn.disabled = false;
                }

                // Update card styling via class
                const allLabels = document.querySelectorAll('.timeline-card');
                allLabels.forEach(label => {
                    const input = label.querySelector('input[type="radio"]');
                    if (input && input.checked) {
                        label.classList.add('active');
                    } else {
                        label.classList.remove('active');
                    }
                });

            });

        });

        // Initial state: set active class on already selected card
        const selectedRadio = document.querySelector('input[name="timeline"]:checked');
        if (selectedRadio) {
            const parentLabel = selectedRadio.closest('.timeline-card');
            if (parentLabel) {
                parentLabel.classList.add('active');
            }
        }

        // Attach continue button
        const continueFromTimelineBtn = document.getElementById('continueFromTimelineBtn');

        if (continueFromTimelineBtn) {

            continueFromTimelineBtn.addEventListener(
                'click',
                function () {

                    if (!state.timeline) {
                        return;
                    }

                    // Proceed to budget
                    showBudgetSection();

                }
            );

        }

    }


    /* ============================================================
       RENDER BUDGET (Section 05)
       ============================================================ */

    function renderBudget() {

        const minBudget = 5000;
        const maxBudget = 150000;
        const step = 5000;

        // Ensure state.budget is within range
        if (!state.budget || state.budget < minBudget) {
            state.budget = minBudget;
        }
        if (state.budget > maxBudget) {
            state.budget = maxBudget;
        }

        const percent = ((state.budget - minBudget) / (maxBudget - minBudget)) * 100;

        let html = `
            <p class="eyebrow">YOUR INVESTMENT</p>
            <h2 class="heading">What budget range are you considering?</h2>
            <p class="descr">This helps us recommend the right approach for your project. You can adjust the slider to match your estimated investment.</p>

            <div class="budget-container">
                <div class="budget-slider-wrapper">
                    <input type="range" id="budgetSlider" min="${minBudget}" max="${maxBudget}" step="${step}" value="${state.budget}">
                    <div class="budget-track">
                        <div class="budget-fill" style="width: ${percent}%;"></div>
                    </div>
                </div>
                <div class="budget-value">
                    KSH <span id="budgetDisplay">${state.budget.toLocaleString()}</span>
                </div>
                <div class="budget-labels">
                    <span>KSH ${minBudget.toLocaleString()}</span>
                    <span>KSH ${maxBudget.toLocaleString()}+</span>
                </div>
            </div>

            <div class="submit-row">
                <button class="submit-btn" id="sendEnquiryBtn" type="button">
                    Send Enquiry
                    <i class="fas fa-angle-right"></i>
                </button>
            </div>
        `;

        branchContent.innerHTML = html;

        // Attach slider events
        const slider = document.getElementById('budgetSlider');
        const display = document.getElementById('budgetDisplay');

        if (slider && display) {

            slider.addEventListener('input', function () {

                const value = parseInt(this.value, 10);
                state.budget = value;
                display.textContent = value.toLocaleString();

                // Update fill
                const fill = document.querySelector('.budget-fill');
                if (fill) {
                    const percent = ((value - minBudget) / (maxBudget - minBudget)) * 100;
                    fill.style.width = percent + '%';
                }

            });

        }

        // Attach send enquiry button
        const sendBtn = document.getElementById('sendEnquiryBtn');

        if (sendBtn) {

            sendBtn.addEventListener(
                'click',
                function () {

                    // Final validation: ensure budget is set (it should be)
                    if (!state.budget) {
                        window.alert('Please select a budget range.');
                        return;
                    }

                    sendToWhatsApp();

                }
            );

        }

    }


    /* ============================================================
       SECTION NAVIGATION FUNCTIONS
       ============================================================ */

    function showDetails() {

        if (!state.selectedType) {
            return;
        }

        section03.style.display = 'none';
        section04.style.display = 'block';

        renderBranch(state.selectedType);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                section04.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

    }


    function showTimelineSection() {

        // Render timeline inside the same container
        renderTimeline();

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                section04.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

    }


    function showBudgetSection() {

        renderBudget();

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                section04.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

    }


    function showProjectTypes() {

        section04.style.display = 'none';
        section03.style.display = 'block';

        // Reset any ongoing flow
        state.timeline = null;
        state.budget = null;

        // Clear branch content
        branchContent.innerHTML = '';

        // Reset continue button state
        continueBtn.disabled = true;
        continueBtn.classList.remove('active');
        continueStatus.textContent = 'Select a project type to continue';

        requestAnimationFrame(() => {
            section03.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

    }


    /* ============================================================
       FORM EVENTS (for the project details form)
       ============================================================ */

    function attachFormEvents() {

        /* ========================================================
           RADIO OPTIONS (single select)
           ======================================================== */

        const radioOptions =
            branchContent.querySelectorAll(
                '.radio-option'
            );


        radioOptions.forEach(option => {

            const radio =
                option.querySelector('input');


            if (!radio) {
                return;
            }


            radio.addEventListener(
                'change',
                function () {

                    const group =
                        this.closest('.radio-group');


                    if (!group) {
                        return;
                    }


                    const branch =
                        group.dataset.branch;

                    const field =
                        group.dataset.group;


                    group
                        .querySelectorAll('.radio-option')
                        .forEach(item => {

                            const input =
                                item.querySelector('input');


                            if (input) {

                                item.classList.toggle(
                                    'selected',
                                    input.checked
                                );

                            }

                        });


                    if (
                        state.formData[branch] &&
                        field
                    ) {

                        state.formData[branch][field] =
                            this.value;

                    }

                }
            );

        });


        /* ========================================================
           CHECKBOX OPTIONS (multi-select)
           ======================================================== */

        const checkboxGroups =
            branchContent.querySelectorAll(
                '.checkbox-group'
            );


        checkboxGroups.forEach(group => {

            const branch =
                group.dataset.branch;

            const field =
                group.dataset.group;


            const checkboxes =
                group.querySelectorAll('input[type="checkbox"]');


            checkboxes.forEach(checkbox => {

                checkbox.addEventListener(
                    'change',
                    function () {

                        // Update selected class on label
                        const label =
                            this.closest('.checkbox-option');

                        if (label) {
                            label.classList.toggle(
                                'selected',
                                this.checked
                            );
                        }


                        // Update state array
                        if (
                            state.formData[branch] &&
                            field
                        ) {

                            const current =
                                state.formData[branch][field] || [];

                            if (this.checked) {
                                if (!current.includes(this.value)) {
                                    current.push(this.value);
                                }
                            } else {
                                const index =
                                    current.indexOf(this.value);

                                if (index !== -1) {
                                    current.splice(index, 1);
                                }
                            }

                            // Ensure it's an array
                            state.formData[branch][field] = current;

                        }

                    }
                );

            });

        });


        /* ========================================================
           TEXT INPUTS / TEXTAREAS
           ======================================================== */

        const inputs =
            branchContent.querySelectorAll(
                'input[type="text"], input[type="url"], textarea'
            );


        inputs.forEach(input => {

            input.addEventListener(
                'input',
                function () {

                    const id =
                        this.id;

                    const value =
                        this.value;


                    if (id === 'website_for') {

                        state.formData.website.for =
                            value;

                    }


                    else if (id === 'website_goals') {

                        state.formData.website.goals =
                            value;

                    }


                    else if (id === 'experience_problem') {

                        state.formData.experience.problem =
                            value;

                    }


                    else if (id === 'business_process') {

                        state.formData.business.process =
                            value;

                    }


                    else if (id === 'business_success') {

                        state.formData.business.success =
                            value;

                    }

                }
            );

        });

    }


    /* ============================================================
       CLEAN VALUE
       ============================================================ */

    function cleanValue(value) {

        const cleaned =
            String(value || '')
                .trim()
                .replace(/\r\n/g, '\n')
                .replace(/\r/g, '\n')
                .replace(/[ \t]+/g, ' ')
                .replace(/\n{3,}/g, '\n\n');

        return cleaned || '';

    }


    /* ============================================================
       FORMAT MULTI-LINE VALUE
       ============================================================ */

    function formatValue(value) {

        return cleanValue(value)
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean)
            .join('\n');

    }


    /* ============================================================
       VALIDATE PROJECT FORM (Section 03)
       ============================================================ */

    function validateProjectForm() {

        const type =
            state.selectedType;


        if (!type) {

            return {
                valid: false,
                field: null,
                message: 'Please select a project type first.'
            };

        }


        const data =
            state.formData[type];


        /* ========================================================
           WEBSITE VALIDATION
           ======================================================== */

        if (type === 'website') {

            if (!cleanValue(data.purpose)) {

                return {
                    valid: false,
                    field: 'website_purpose',
                    message: 'Please select whether you need a new website or a professional online presence.'
                };

            }


            if (!cleanValue(data.for)) {

                return {
                    valid: false,
                    field: 'website_for',
                    message: 'Please enter your business or brand name.'
                };

            }


            if (!cleanValue(data.goals)) {

                return {
                    valid: false,
                    field: 'website_goals',
                    message: 'Please tell us what you want the website to achieve.'
                };

            }

        }


        /* ========================================================
           BOOKING & CLIENT EXPERIENCE VALIDATION
           ======================================================== */

        else if (type === 'experience') {

            if (
                !data.type ||
                data.type.length === 0
            ) {

                return {
                    valid: false,
                    field: 'experience_type',
                    message: 'Please select at least one area you would like to improve.'
                };

            }


            if (
                !data.do ||
                data.do.length === 0
            ) {

                return {
                    valid: false,
                    field: 'experience_do',
                    message: 'Please select at least one current booking or contact method.'
                };

            }


            if (!cleanValue(data.problem)) {

                return {
                    valid: false,
                    field: 'experience_problem',
                    message: 'Please tell us what you would like the new experience to improve.'
                };

            }

        }


        /* ========================================================
           DIGITAL PRESENCE REFRESH VALIDATION
           ======================================================== */

        else if (type === 'business') {

            if (
                !data.area ||
                data.area.length === 0
            ) {

                return {
                    valid: false,
                    field: 'business_area',
                    message: 'Please select at least one area you would like to improve.'
                };

            }


            if (!cleanValue(data.process)) {

                return {
                    valid: false,
                    field: 'business_process',
                    message: 'Please enter your current website URL (include http:// or https://).'
                };

            }

            // Validate URL format
            const url = data.process.trim();
            if (!url.match(/^https?:\/\/.+/i)) {

                return {
                    valid: false,
                    field: 'business_process',
                    message: 'Please enter a complete website URL starting with http:// or https://'
                };

            }


            if (!cleanValue(data.success)) {

                return {
                    valid: false,
                    field: 'business_success',
                    message: 'Please tell us what is not working well with your current online presence.'
                };

            }

        }


        return {
            valid: true,
            field: null,
            message: ''
        };

    }


    /* ============================================================
       SHOW VALIDATION ERROR
       ============================================================ */

    function showValidationError(validation) {

        if (!validation || validation.valid) {
            return;
        }


        /*
         * Keep the form intact.
         * Nothing is reset when validation fails.
         */

        if (validation.field) {

            const field =
                document.getElementById(
                    validation.field
                );


            if (field) {

                const radio =
                    field.querySelector
                        ? field.querySelector('input')
                        : null;


                const target =
                    radio || field;


                if (
                    target &&
                    typeof target.focus === 'function'
                ) {

                    target.focus();

                }

            }

        }


        /*
         * Use the browser's native alert so the user
         * immediately knows exactly what is missing.
         */

        window.alert(
            validation.message
        );

    }


    /* ============================================================
       WHATSAPP MESSAGE (includes all data)
       ============================================================ */

    function buildWhatsAppMessage() {

        const type =
            state.selectedType;


        if (!type) {
            return '';
        }


        const data =
            state.formData[type];

        const timelineMap = {
            'as_soon_as_possible': 'As soon as possible',
            'within_1_month': 'Within 1 month',
            '1_3_months': '1–3 months',
            'just_exploring': 'Just exploring'
        };

        const timelineLabel = timelineMap[state.timeline] || 'Not specified';

        const budgetLabel = state.budget ? `KSH ${state.budget.toLocaleString()}` : 'Not specified';


        /* ========================================================
           MESSAGE HEADER
           ======================================================== */

        let message = `Hello Nexora Studio 👋

I'd like to discuss a new project with your team.

━━━━━━━━━━━━━━━━━━━━
PROJECT ENQUIRY
━━━━━━━━━━━━━━━━━━━━

PROJECT TYPE
${labels[type]}

TIMELINE
${timelineLabel}

BUDGET RANGE
${budgetLabel}

`;


        /* ========================================================
           WEBSITE PROJECT
           ======================================================== */

        if (type === 'website') {

            message += `PROJECT DETAILS
────────────────────

What I'm looking for
${cleanValue(data.purpose)}

Business / Brand
${cleanValue(data.for)}

Project Goals
${formatValue(data.goals)}

`;

        }


        /* ========================================================
           BOOKING & CLIENT EXPERIENCE
           ======================================================== */

        else if (type === 'experience') {

            const improveList =
                (data.type || [])
                    .map(item => `• ${item}`)
                    .join('\n');

            const methodsList =
                (data.do || [])
                    .map(item => `• ${item}`)
                    .join('\n');

            message += `PROJECT DETAILS
────────────────────

Improve:
${improveList || 'None selected'}

Current Booking Methods:
${methodsList || 'None selected'}

Desired Improvement:
${formatValue(data.problem)}

`;

        }


        /* ========================================================
           DIGITAL PRESENCE REFRESH
           ======================================================== */

        else if (type === 'business') {

            const improveList =
                (data.area || [])
                    .map(item => `• ${item}`)
                    .join('\n');

            message += `PROJECT DETAILS
────────────────────

Improve:
${improveList || 'None selected'}

Current Website:
${cleanValue(data.process)}

Current Issues:
${formatValue(data.success)}

`;

        }


        /* ========================================================
           CLOSING
           ======================================================== */

        message += `━━━━━━━━━━━━━━━━━━━━
NEXT STEP
━━━━━━━━━━━━━━━━━━━━

I'd be happy to discuss the project, answer any questions and explore the next steps with Nexora Studio.

Thank you.
`;


        return message;

    }


    /* ============================================================
       RESET ENQUIRY
       ============================================================ */

    function resetEnquiry() {

        /* ========================================================
           RESET STATE
           ======================================================== */

        state.selectedType = null;
        state.timeline = null;
        state.budget = null;


        state.formData.website = {
            purpose: '',
            for: '',
            goals: ''
        };


        state.formData.experience = {
            type: [],
            do: [],
            problem: ''
        };


        state.formData.business = {
            area: [],
            process: '',
            success: ''
        };


        /* ========================================================
           RESET CARDS
           ======================================================== */

        cards.forEach(card => {

            card.classList.remove('active');

            card.setAttribute(
                'aria-checked',
                'false'
            );

        });


        /* ========================================================
           RESET CONTINUE BUTTON
           ======================================================== */

        continueBtn.disabled = true;

        continueBtn.classList.remove('active');


        continueStatus.textContent =
            'Select a project type to continue';


        /* ========================================================
           CLEAR GENERATED FORM
           ======================================================== */

        branchContent.innerHTML = '';


        /* ========================================================
           RETURN TO STARTING SECTION
           ======================================================== */

        section04.style.display = 'none';

        section03.style.display = 'block';

    }


    /* ============================================================
       SEND TO WHATSAPP (final submission)
       ============================================================ */

    function sendToWhatsApp() {

        /* ========================================================
           VALIDATE EVERYTHING FIRST
           ======================================================== */

        // Validate project details again (should already be valid)
        const validation =
            validateProjectForm();


        if (!validation.valid) {

            showValidationError(
                validation
            );

            return;

        }

        // Check timeline
        if (!state.timeline) {

            window.alert('Please select a timeline.');
            return;

        }

        // Check budget
        if (!state.budget) {

            window.alert('Please select a budget range.');
            return;

        }


        /* ========================================================
           BUILD MESSAGE
           ======================================================== */

        const message =
            buildWhatsAppMessage();


        if (!message) {
            return;
        }


        /* ========================================================
           CREATE WHATSAPP URL
           ======================================================== */

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


        /* ========================================================
           OPEN WHATSAPP
           ======================================================== */

        window.open(
            whatsappURL,
            '_blank',
            'noopener,noreferrer'
        );


        /* ========================================================
           RESET AFTER SUCCESSFUL SEND
           ======================================================== */

        resetEnquiry();


        /* ========================================================
           RETURN TO STARTING POINT
           ======================================================== */

        requestAnimationFrame(() => {

            section03.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        });

    }


    /* ============================================================
       BACK BUTTON (from any sub-section)
       ============================================================ */

    backBtn.addEventListener(
        'click',
        function () {

            // If we are in timeline or budget, go back to project details
            // If we are in project details, go back to project types

            // We can detect by checking what's rendered in branchContent
            const hasTimeline = document.querySelector('.timeline-grid');
            const hasBudget = document.querySelector('.budget-container');

            if (hasBudget) {
                // Go back to timeline
                showTimelineSection();
            } else if (hasTimeline) {
                // Go back to project details
                showDetails();
            } else {
                // Go back to project types
                showProjectTypes();
            }

        }
    );


    /* ============================================================
       ESCAPE KEY (reset to project types)
       ============================================================ */

    document.addEventListener(
        'keydown',
        function (event) {

            if (
                event.key === 'Escape' &&
                section04.style.display !== 'none'
            ) {

                showProjectTypes();

            }

        }
    );


    /* ============================================================
       CONTINUE BUTTON (from project type selection)
       ============================================================ */

    continueBtn.addEventListener(
        'click',
        function () {

            if (
                this.disabled ||
                !state.selectedType
            ) {

                return;

            }


            showDetails();

        }
    );


    /* ============================================================
       INITIAL STATE
       ============================================================ */

    section03.style.display = 'block';

    section04.style.display = 'none';


    cards.forEach(card => {

        card.classList.remove('active');

        card.setAttribute(
            'aria-checked',
            'false'
        );

    });


    continueBtn.disabled = true;

    continueBtn.classList.remove('active');


    continueStatus.textContent =
        'Select a project type to continue';


    /* ============================================================
       OPTIONAL GLOBAL ACCESS
       ============================================================ */

    window.__nexoraProject = {

        state,

        showDetails,

        showProjectTypes,

        buildWhatsAppMessage,

        validateProjectForm,

        resetEnquiry

    };

})();




/* ============================================================
   NEXORA WHATSAPP ENQUIRY
============================================================ */

const WHATSAPP_NUMBER = "254713324672";

const form = document.getElementById("projectEnquiryForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

function showError(input, message) {
    const error = input.parentElement.querySelector(".error-message");
    input.classList.add("input-error");
    if (error) {
        error.textContent = message;
        error.classList.add("show");
    }
}

function clearError(input) {
    const error = input.parentElement.querySelector(".error-message");
    input.classList.remove("input-error");
    if (error) {
        error.textContent = "";
        error.classList.remove("show");
    }
}

function validateForm() {
    let valid = true;

    clearError(fullName);
    clearError(email);

    if (!fullName.value.trim()) {
        showError(fullName, "Please enter your full name.");
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, "Please enter your email address.");
        valid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, "Please enter a valid email address.");
        valid = false;
    }

    return valid;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // --------------------------------------------------
    // Build a clean, professional message with only form data
    // --------------------------------------------------
    const name = fullName.value.trim();
    const emailAddress = email.value.trim();
    const phoneNumber = phone.value.trim() || "Not provided";

    const message =
        `📋 New Enquiry from Nexora

Name: ${name}
Email: ${emailAddress}
Phone/WhatsApp: ${phoneNumber}`;

    const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    // Optional: reload the page after a short delay (keeps the form fresh)
    setTimeout(() => {
        location.reload();
    }, 500);
});
