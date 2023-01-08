/* eslint-disable no-unused-vars */
class Menu {
    constructor({ items, toggler, width = '500px' } = {}) {
        this.items = items;
        this.toggler = toggler;
        this.width = width;
        this.init();
    }
    render() {
        console.log('render');
        this.menu = document.createElement('div');
        this.menu.classList.add('menu');
        this.menu.dataset.component = 'menu';
        this.menu.setAttribute('aria-labelledby', this.toggler.dataset.menu);
        this.menuItems = document.createElement('ul');
        this.menuItems.classList.add('menu-items');
        this.items.forEach((item) => {
            let menuItem = document.createElement('li');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = item.text;
            menuItem.addEventListener('click', async () => {
                await item.callback();
                this.toggle();
            });
            this.menuItems.appendChild(menuItem);
        });
        this.menu.appendChild(this.menuItems);

        // remove menus when clicking outside of them

        document.addEventListener('click', (e) => {
            e.stopPropagation();

            if (
                !e.target.closest('[data-component="menu"]') &&
                !e.target.closest('[data-menu]')
            ) {
                const menus = document.querySelectorAll(
                    '[data-component="menu"]'
                );
                if (menus.length > 0) {
                    menus.forEach((menu) => {
                        menu.classList.add('hidden');
                        setTimeout(() => {
                            menu.remove();
                        }, 300);
                    });
                }
            }
        });
    }
    addMenuStyles() {
        const style = document.createElement('style');
        style.dataset.for = 'menu';
        style.innerHTML = `
            .menu {
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 5px;
                position: absolute;
                z-index: 100;
                min-width: ${this.width}px;
                opacity: 1;
                animation: animateIn 0.25s ease 0s;

            }
            .menu.hidden {
                opacity: 0;
                transition: opacity 0.25s;
            }
            .menu-items {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .menu-item {
                cursor: pointer;
                padding: 5px;
            }
            .menu-item:hover {
                background-color: #eee;
            }

            // .menu::before {
            //     content: '';
            //     position: absolute;
            //     width: 0;
            //     height: 0;
            //     border-style: solid;
            //     border-width: 0 5px 5px 5px;
            //     border-color: transparent transparent #fff transparent;
            //     top: -5px;
            //     left: 1rem;
            //     transform: translateX(-50%);
            // }

            @keyframes animateIn {
                0% {
                    opacity: 0;
                    -webkit-transform: scale3d(.3,.3,.3);
                    transform: scale3d(.3,.3,.3);
                }
                60% {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    toggle() {
        console.log('toggle');
        if (this.menu.classList.contains('show')) {
            this.menu.classList.remove('show');
            this.menu.classList.add('hidden');
            setTimeout(() => {
                this.menu.remove();
            }, 50);
        } else {
            console.log('show');

            // close all menus
            const menus = document.querySelectorAll('[data-component="menu"]');
            if (menus.length > 0) {
                menus.forEach((menu) => {
                    menu.classList.remove('show');
                    menu.classList.add('hidden');
                    setTimeout(() => {
                        menu.remove();
                    }, 50);
                });
            }

            this.render();
            this.positionMenu();
            this.menu.classList.add('show');
            this.addToDOM();
        }
    }

    init() {
        // create styles for the menu
        // check if the styles already exist
        if (!document.querySelector('[data-for="menu"]')) {
            this.addMenuStyles();
        }
        this.toggler.addEventListener('click', (e) => {
            this.toggle();
        });

        this.render();
    }

    positionMenu() {
        this.menu.style.top = `${
            this.toggler.offsetTop + this.toggler.offsetHeight
        }px`;
        // console.log(this.toggler.getBoundingClientRect());
        this.menu.style.right = '1rem';
    }

    removeMenuStyles() {
        const style = document.querySelector('[data-for="menu"]');
        console.log('removing style tag');
        setTimeout(() => {
            style.remove();
        }, 150);

        console.log('removed style tag');
    }

    addToDOM() {
        this.toggler.parentNode.style.position = 'relative';
        this.toggler.parentNode.appendChild(this.menu);
    }
}
