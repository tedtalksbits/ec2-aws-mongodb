/* eslint-disable no-undef */
const darkModeToggle = document.getElementById('dark-mode-toggle');
const theme = localStorage.getItem('theme');
console.log(theme);

const darkModeStyles = document.createElement('style');
darkModeStyles.innerHTML = `
:root{

    --surface: #1a1b1e;
    --surface-alt: #2b2c31;
    --surface-alt2: #3c3d42;
    --txt: hsl(0, 0%, 90%);
    --txt-alt: hsl(208, 7%, 80%);
    --txt-alt2: hsl(210, 11%, 71%);

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
