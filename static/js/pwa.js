(function () {
    "use strict";

    /* ============================================================
       ELEMENTS
    ============================================================ */

    const installButton = document.getElementById(
        "installAppBtnFloating"
    );

    let deferredInstallPrompt = null;


    /* ============================================================
       DETECT INSTALLED APP
    ============================================================ */

    function isAppInstalled() {
        return (
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true
        );
    }


    /* ============================================================
       SHOW INSTALL BUTTON
       ONLY CALLED WHEN NATIVE PROMPT EXISTS
    ============================================================ */

    function showInstallButton() {
        if (!installButton || isAppInstalled()) {
            return;
        }

        installButton.hidden = false;
        installButton.classList.add("is-visible");
    }


    /* ============================================================
       HIDE INSTALL BUTTON
    ============================================================ */

    function hideInstallButton() {
        if (!installButton) {
            return;
        }

        installButton.classList.remove("is-visible");
        installButton.hidden = true;
    }


    /* ============================================================
       INITIAL STATE
    ============================================================ */

    hideInstallButton();


    /* ============================================================
       SERVICE WORKER
    ============================================================ */

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register("/sw.js", {
                    scope: "/"
                })
                .then(function (registration) {
                    console.log(
                        "[PWA] Service Worker registered:",
                        registration
                    );
                })
                .catch(function (error) {
                    console.error(
                        "[PWA] Service Worker registration failed:",
                        error
                    );
                });
        });
    }


    /* ============================================================
       NATIVE PWA INSTALL PROMPT

       Chrome fires this ONLY when the browser considers
       the website eligible for the native installation flow.
    ============================================================ */

    window.addEventListener(
        "beforeinstallprompt",
        function (event) {
            console.log(
                "[PWA] beforeinstallprompt fired."
            );

            /*
             * Stop Chrome from showing its automatic
             * installation UI.
             */
            event.preventDefault();

            /*
             * Save the native installation event.
             */
            deferredInstallPrompt = event;

            /*
             * Now — and ONLY now — show our
             * custom install button.
             */
            showInstallButton();
        }
    );


    /* ============================================================
       INSTALL BUTTON
    ============================================================ */

    if (installButton) {
        installButton.addEventListener(
            "click",
            async function () {

                /*
                 * Never attempt to create a fake installation
                 * or redirect the user to "Add to Home Screen".
                 */
                if (!deferredInstallPrompt) {
                    console.log(
                        "[PWA] Native install prompt is not available."
                    );

                    hideInstallButton();
                    return;
                }


                /*
                 * Store the current installation event.
                 */
                const installPrompt = deferredInstallPrompt;

                /*
                 * Prevent this same event from being
                 * accidentally reused.
                 */
                deferredInstallPrompt = null;


                /*
                 * Show the REAL Chrome installation dialog.
                 */
                try {
                    await installPrompt.prompt();

                    const result =
                        await installPrompt.userChoice;

                    console.log(
                        "[PWA] User choice:",
                        result.outcome
                    );

                } catch (error) {
                    console.error(
                        "[PWA] Installation prompt failed:",
                        error
                    );

                } finally {
                    /*
                     * The install prompt event is single-use.
                     */
                    hideInstallButton();
                }
            }
        );
    }


    /* ============================================================
       APP INSTALLED
    ============================================================ */

    window.addEventListener(
        "appinstalled",
        function () {
            console.log(
                "[PWA] Nexora successfully installed."
            );

            deferredInstallPrompt = null;

            hideInstallButton();
        }
    );


    /* ============================================================
       DISPLAY MODE
    ============================================================ */

    window.addEventListener(
        "pageshow",
        function () {
            if (isAppInstalled()) {
                deferredInstallPrompt = null;

                hideInstallButton();
            }
        }
    );


    /* ============================================================
       DISPLAY MODE CHANGE

       Useful when the page transitions into standalone mode.
    ============================================================ */

    const standaloneMediaQuery = window.matchMedia(
        "(display-mode: standalone)"
    );

    function handleDisplayModeChange() {
        if (standaloneMediaQuery.matches) {
            deferredInstallPrompt = null;

            hideInstallButton();
        }
    }

    if (standaloneMediaQuery.addEventListener) {
        standaloneMediaQuery.addEventListener(
            "change",
            handleDisplayModeChange
        );
    } else if (standaloneMediaQuery.addListener) {
        standaloneMediaQuery.addListener(
            handleDisplayModeChange
        );
    }

})();
