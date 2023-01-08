/* eslint-disable no-unused-vars */
class Menu2 {
    constructor({ items, toggler }) {
        this.items = items;
        this.toggler = toggler;
        this.init();
    }

    buildMenu() {
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
    }

    toggle() {
        console.log('toggle');
        if (this.menu.classList.contains('show')) {
            this.menu.classList.remove('show');
            setTimeout(() => {
                this.menu.remove();
            }, 300);
        } else {
            console.log('show');

            // close all menus
            const menus = document.querySelectorAll('[data-component="menu"]');
            if (menus.length > 0) {
                menus.forEach((menu) => {
                    menu.classList.remove('show');
                    setTimeout(() => {
                        menu.remove();
                    }, 300);
                });
            }

            this.buildMenu();
            this.menu.classList.add('show');
            this.render();
        }
    }

    init() {
        this.toggler.addEventListener('click', () => {
            this.toggle();
        });
        this.buildMenu();
    }

    render() {
        this.toggler.parentNode.style.position = 'relative';
        this.toggler.parentNode.appendChild(this.menu);
    }
}
