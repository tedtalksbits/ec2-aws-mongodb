/* eslint-disable no-undef */
const darkModeToggle = document.getElementById('dark-mode-toggle');
const theme = localStorage.getItem('theme');
console.log(theme);

const darkModeStyles = document.createElement('style');
darkModeStyles.innerHTML = `
:root{

    --surface: hsl(240, 5%, 11%);
    --surface-alt: hsl(230, 7%, 18%);
    --surface-alt2: hsl(230, 5%, 25%);
    --surface-transparent-100: hsla(240, 5%, 11%, 0.08);
    --surface-transparent-200: hsla(240, 5%, 11%, 0.16);
    --surface-transparent-300: hsla(240, 5%, 11%, 0.24);
    --surface-transparent-400: hsla(240, 5%, 11%, 0.32);
    --surface-transparent-500: hsla(240, 5%, 11%, 0.4);
    --surface-transparent-600: hsla(240, 5%, 11%, 0.48);
    --surface-transparent-700: hsla(240, 5%, 11%, 0.56);
    --surface-transparent-800: hsla(240, 5%, 11%, 0.64);
    --surface-transparent-900: hsla(240, 5%, 11%, 0.72);
    --txt: hsl(0, 0%, 90%);
    --txt-alt: hsla(0, 0%, 90%, .75);
    --txt-alt2: hsla(0, 0%, 90%, .5);
    --txt-alt3: hsla(0, 0%, 90%, .25);
    --txt-alt4: hsla(0, 0%, 90%, .1);

    --border-color: #373a40;
}
`;
const setDarkTheme = (toggle) => {
    toggle.innerText = '🌞';
    document.head.appendChild(darkModeStyles);
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
};

const setLightTheme = (toggle) => {
    toggle.innerText = '🌙';
    localStorage.setItem('theme', 'light');
    if (document.body.classList.contains('dark')) {
        document.head.removeChild(darkModeStyles);
        document.body.classList.remove('dark');
    }
};

// get users theme preference from local storage

if (theme === 'dark') {
    setDarkTheme(darkModeToggle);
} else {
    setLightTheme(darkModeToggle);
}

darkModeToggle.addEventListener('click', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        setLightTheme(darkModeToggle);
    } else {
        setDarkTheme(darkModeToggle);
    }
});

/*
        ========================================
        SHOW/HIDE PASSWORD
        ========================================
    */

const showPasswords = document.querySelectorAll('[data-toggler=show-password]');
showPasswords.forEach((showPassword) => {
    const passwordId = showPassword.getAttribute('data-target');
    const showIconClass = showPassword.getAttribute('data-show-icon');
    const hideIconClass = showPassword.getAttribute('data-hide-icon');
    const password = document.getElementById(passwordId);
    showPassword.addEventListener('click', () => {
        if (password.type === 'password') {
            password.type = 'text';
            const showIconEl = `<i class="${hideIconClass}"></i>`;
            showPassword.innerHTML = showIconEl;
        } else {
            password.type = 'password';
            const hideIconEl = `<i class="${showIconClass}"></i>`;
            showPassword.innerHTML = hideIconEl;
        }
    });
});
