/* eslint-disable no-unused-vars */
function initSnackbar() {
    console.log('initSnackbar');
    const snackbarToggles = document.querySelectorAll(
        '[data-toggle="snackbar"]'
    );
    snackbarToggles.forEach((snackbarToggle) => {
        console.log('snackbarToggle', snackbarToggle);
        snackbarToggle.addEventListener('click', (e) => {
            const target = snackbarToggle.getAttribute('data-target');
            const snackbar = document.querySelector(
                `[data-snackbar="${target}"]`
            );
            closeSnackbar(snackbar);
        });
    });

    function closeSnackbar(snackbar) {
        snackbar.classList.remove('active');
    }
}
