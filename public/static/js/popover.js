/* eslint-disable no-unused-vars */

function initPopover() {
    const popoverToggles = document.querySelectorAll('[data-toggle="popover"]');

    popoverToggles.forEach((popoverToggle) => {
        popoverToggle.addEventListener('click', (e) => {
            const target = popoverToggle.getAttribute('data-target');
            const popover = document.querySelector(
                `[data-popover="${target}"]`
            );
            const popoverContent = popover.querySelector(
                '[role="popover-content"]'
            );
            // close other popovers thats not the current one

            if (!popoverContent.classList.contains('active')) {
                popoverToggles.forEach((popoverToggle) => {
                    const target = popoverToggle.getAttribute('data-target');
                    const popover = document.querySelector(
                        `[data-popover="${target}"]`
                    );
                    const popoverContent = popover.querySelector(
                        '[role="popover-content"]'
                    );
                    popoverContent.classList.remove('active');
                });
            }

            const top = popoverToggle.offsetHeight + 5;
            const bottom = popoverToggle.offsetHeight + 5;
            // const left =
            //     popoverToggle.offsetWidth + popoverContent.offsetWidth + 5;
            const left = 300;
            const right = popoverToggle.offsetWidth - 5;

            const location = popover.getAttribute('data-target-location');

            switch (location) {
                case 'top':
                    console.log('top');

                    popoverContent.style.bottom = bottom + 'px';
                    break;
                case 'left':
                    console.log('left');
                    popoverContent.style.left = '-' + left + 'px';
                    popoverContent.style.top =
                        '-' + popoverContent.offsetHeight / 2 + 'px';
                    break;
                case 'right':
                    popoverContent.style.right = right + 'px';
                    popoverContent.style.top = '0px';
                    break;

                default:
                    console.log(location);
                    popoverContent.style.top = top + 'px';
                    break;
            }
            // toggle popover
            popoverContent.style.width = '300px';
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
            popoverToggles.forEach((popoverToggle) => {
                const target = popoverToggle.getAttribute('data-target');
                const popover = document.querySelector(
                    `[data-popover="${target}"]`
                );
                const popoverContent = popover.querySelector(
                    '[role="popover-content"]'
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

            popoverToggles.forEach((popoverToggle) => {
                const target = popoverToggle.getAttribute('data-target');
                const popover = document.querySelector(
                    `[data-popover="${target}"]`
                );
                const popoverContent = popover.querySelector(
                    '[role="popover-content"]'
                );
                popoverContent.classList.remove('active');
            });
        });
    });
}
