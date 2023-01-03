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

function showSnackbar({ message, type = 'success', duration = 3000 }) {
    // create snackbar

    // generate unique id
    const id = Math.random().toString(36).slice(2, 9);

    // set snackbar icon class
    let iconClass = 'nc nc-alert-square';
    if (type === 'success') {
        iconClass = 'nc nc-check';
    }
    if (type === 'error') {
        iconClass = 'nc nc-alert-square';
    }
    if (type === 'warning') {
        iconClass = 'nc nc-info-circle';
    }

    const snackbar = document.createElement('div');
    snackbar.classList.add('snackbar');
    snackbar.classList.add(`bg-${type}`);
    // snackbar.classList.add('active');
    snackbar.setAttribute('data-snackbar', id);
    snackbar.innerHTML = `
        <div class="snackbar__content">
            <div class="snackbar__content__icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="snackbar__content__text">
                <h4 class="font-s">
                    ${message}
                </h4>
            </div>
            <div
                class="snackbar__content__action"
                data-toggle="snackbar"
                role="snackbar-toggle"
                data-target="${id}"
            >
                <i class="nc nc-close"></i>
            </div>
        </div>
    `;
    document.body.appendChild(snackbar);
    setTimeout(() => {
        snackbar.classList.add('active');
    }, 100);
    setTimeout(() => {
        snackbar.classList.remove('active');
        setTimeout(() => {
            snackbar.remove();
        }, 300);
    }, duration);

    // add event listener to close button
    const snackbarClose = snackbar.querySelector('[data-toggle="snackbar"]');
    snackbarClose.addEventListener('click', (e) => {
        snackbar.classList.remove('active');
        setTimeout(() => {
            snackbar.remove();
        }, 300);
    });
}
