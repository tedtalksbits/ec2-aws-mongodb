/* eslint-disable no-unused-vars */

function initPopover() {
    const popovers = document.querySelectorAll('[data-toggle="popover"]');

    popovers.forEach((popover) => {
        popover.addEventListener('click', (e) => {
            const target = popover.getAttribute('data-target');
            const popoverContent = document.querySelector(
                `[data-popover="${target}"]`
            );
            // close other popovers
            popovers.forEach((popover) => {
                const target = popover.getAttribute('data-target');
                const popoverContent = document.querySelector(
                    `[data-popover="${target}"]`
                );
                popoverContent.classList.remove('active');
            });

            const top = popover.offsetHeight + 5;
            const bottom = popover.offsetHeight + 5;
            const left = popover.offsetWidth + popoverContent.offsetWidth - 5;
            const right = popover.offsetWidth - 5;

            const location = popover.getAttribute('data-target-location');

            switch (location) {
                case 'top':
                    console.log('top');

                    popoverContent.style.bottom = bottom + 'px';
                    break;
                case 'left':
                    popoverContent.style.left = '-' + left + 'px';
                    popoverContent.style.top = '0px';
                    break;
                case 'right':
                    popoverContent.style.right = right + 'px';
                    popoverContent.style.top = '0px';
                    break;

                default:
                    popoverContent.style.top = top + 'px';
                    break;
            }

            popoverContent.classList.toggle('active');
        });
    });
    // close popover when clicking outside of it
    document.addEventListener('click', (e) => {
        // if the target is not the popover and not the popover trigger

        if (
            !e.target.closest('[data-toggle="popover"]') &&
            !e.target.closest('[data-popover]')
        ) {
            popovers.forEach((popover) => {
                const target = popover.getAttribute('data-target');
                const popoverContent = document.querySelector(
                    `[data-popover="${target}"]`
                );
                popoverContent.classList.remove('active');
            });
        }
    });

    // close popover when any element in .poverover__content[role="popover-content"] is clicked

    const popoverContents = document.querySelectorAll(
        '[role="popover-content"]'
    );

    popoverContents.forEach((popoverContent) => {
        popoverContent.addEventListener('click', (e) => {
            e.stopPropagation();

            console.log('clicked');

            popovers.forEach((popover) => {
                const target = popover.getAttribute('data-target');
                const popoverContent = document.querySelector(
                    `[data-popover="${target}"]`
                );
                popoverContent.classList.remove('active');
            });
        });
    });
}
