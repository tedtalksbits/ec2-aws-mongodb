// eslint-disable-next-line no-undef
const togglers = document.querySelectorAll('[data-toggler="true"]');
// eslint-disable-next-line no-undef
const modals = document.querySelectorAll('[data-component="modal"]');

// set aria-hidden to true when user click outside of modal__content

modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });
});

togglers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const target = trigger.getAttribute('data-toggler-for');
        // eslint-disable-next-line no-undef
        const modal = document.querySelector(
            `[data-toggle-target="${target}"]`
        );
        modal.classList.toggle('active');

        // // set aria-hidden to false

        const ariaHidden = modal.getAttribute('aria-hidden');
        if (ariaHidden === 'true') {
            modal.setAttribute('aria-hidden', 'false');
        } else {
            modal.setAttribute('aria-hidden', 'true');
        }

        console.log('clicked');
    });
});
