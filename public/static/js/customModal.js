/* eslint-disable no-unused-vars */
class Modal {
    constructor({
        buttons,
        message,
        title,
        toggler,
        closeOnClickOutside,
    } = {}) {
        this.buttons = buttons;
        this.message = message;
        this.title = title;
        this.toggler = toggler;
        this.closeOnClickOutside = closeOnClickOutside;

        // this.render();
    }

    render() {
        // create styles for the modal
        this.addModalStyles();
        // Create the modal
        this.modalBoxBackdrop = document.createElement('div');
        this.modalBoxBackdrop.classList.add('modal-backdrop');
        this.modalBoxBackdrop.classList.add('hidden');
        this.modal = document.createElement('div');
        this.modal.classList.add('modal');
        this.modal.classList.add('hidden');

        // Create the modal title
        this.modalTitle = document.createElement('h2');
        this.modalTitle.classList.add('modal-title');
        this.modalTitle.innerHTML = this.title;
        this.modal.appendChild(this.modalTitle);

        // Create the modal message
        this.modalMessage = document.createElement('div');
        this.modalMessage.classList.add('modal-message');
        this.modalMessage.innerHTML = this.message;
        this.modal.appendChild(this.modalMessage);

        // Create the modal buttons
        this.modalButtons = document.createElement('div');
        this.modalButtons.classList.add('modal-buttons');

        if (!this.buttons) {
            // Create the default buttons
            this.buttons = [
                {
                    text: 'OK',
                    callback: () => {
                        this.hide();
                    },
                },
            ];
            console.log('No buttons provided, using default buttons');
        }
        this.buttons.forEach((button) => {
            let modalButton = document.createElement('button');

            if (button.type === 'link') {
                modalButton = document.createElement('a');
                modalButton.href = button.href;
                modalButton.target = '_blank';
            }

            if (button.type === 'button') {
                modalButton = document.createElement('button');
            }
            if (button.class) {
                button.class.split(' ').forEach((className) => {
                    modalButton.classList.add(className);
                });
            }

            if (button.id) {
                modalButton.id = button.id;
            }

            if (button.style) {
                modalButton.style = button.style;
            }

            if (button.disabled) {
                modalButton.disabled = button.disabled;
            }

            modalButton.classList.add('modal-button');

            modalButton.innerHTML = button.text;
            modalButton.addEventListener('click', button.callback);
            this.modalButtons.appendChild(modalButton);
        });
        this.modal.appendChild(this.modalButtons);
        this.modalBoxBackdrop.appendChild(this.modal);

        // Add the modal to the page
        document.body.appendChild(this.modalBoxBackdrop);

        // Add the modal to the global scope
        window.modal = this;

        // close the modal when the user clicks outside of it

        if (this.closeOnClickOutside) {
            this.modalBoxBackdrop.addEventListener('click', (event) => {
                if (event.target === this.modalBoxBackdrop) {
                    this.hide();
                }
            });
        }
    }

    show() {
        // Show the modal
        this.modalBoxBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        // Hide the modal
        this.modalBoxBackdrop.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    toggle() {
        // Toggle the modal
        this.modalBoxBackdrop.classList.toggle('hidden');
        document.body.style.overflow = 'auto';
    }

    createCustomModal() {
        this.addModalStyles();

        const modals = document.querySelectorAll('[data-modal]');

        modals.forEach((customModal) => {
            customModal.style.display = 'none';
            this.modalBoxBackdrop = document.createElement('div');
            this.modalBoxBackdrop.classList.add('modal-backdrop');
            this.modalBoxBackdrop.classList.add('hidden');
            this.modal = document.createElement('div');
            this.modal.classList.add('modal');
            this.modal.classList.add('hidden');
            this.modal.innerHTML = customModal.innerHTML;
            this.modalBoxBackdrop.appendChild(this.modal);

            // create the close button
            this.closeButton = document.createElement('button');
            this.closeButton.classList.add('close-button');
            this.closeButton.innerHTML = 'X';
            this.closeButton.addEventListener('click', () => {
                this.hide();
            });
            this.modal.appendChild(this.closeButton);

            // Add the modal to the page
            document.body.appendChild(this.modalBoxBackdrop);
        });
    }

    addModalStyles() {
        const style = document.createElement('style');

        style.innerHTML = `
            .modal-backdrop {
                background-color: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                height: 100%;
                left: 0;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 99;
                display: flex;
                justify-content: center;
                align-items: center;
                
                
            }
            .modal {
                background-color: #fff;
                border: 1px solid #000;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
                min-height: 200px;
                justify-content: space-between;
                // left: 50%;
                // margin-left: -150px;
                // margin-top: -100px;
                padding: 20px;
                position: fixed;
                //top: 50%;
                min-width: 300px;
                max-width: 120ch;
                z-index: 100;
            
            }
            .modal-backdrop.hidden {
                display: none;
            }
            .modal-title {
                font-size: 1.5em;
                font-weight: bold;
                margin: 0;
            }
            .modal-message {
                font-size: 1.2em;
                margin: 0;
            }
            .modal-buttons {
                display: flex;
                justify-content: flex-end;
            }
            
        `;

        document.head.appendChild(style);
    }
}
