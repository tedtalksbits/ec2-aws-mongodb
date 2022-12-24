/* eslint-disable no-undef */
const darkModeToggle = document.getElementById('dark-mode-toggle');
const theme = localStorage.getItem('theme');
console.log(theme);

const darkModeStyles = document.createElement('style');
darkModeStyles.innerHTML = `
:root{
    --bg-color: #1a1b1e;
    --surface-900: #1a1b1e;
    --surface-800: #2b2c31;
    --surface-700: #3c3d42;
    --surface-600: #4d4e53;
    --surface-500: #5e5f64;
    --surface-400: #6f7075;
    --surface-300: #808285;
    --surface-200: #919396;
    --surface-100: #d2d2d2;

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
    const password = document.getElementById(passwordId);
    showPassword.addEventListener('click', () => {
        if (password.type === 'password') {
            password.type = 'text';
            showPassword.textContent = 'Hide';
        } else {
            password.type = 'password';
            showPassword.textContent = 'Show';
        }
    });
});
