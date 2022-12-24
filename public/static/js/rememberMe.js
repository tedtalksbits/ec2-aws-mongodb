/* eslint-disable no-undef */
const rememberMe = document.getElementById('remember');
const rememberMePreference = localStorage.getItem('rememberMe');
const username = document.getElementById('username');
const usernameRemebered = localStorage.getItem('username') || '';

if (rememberMePreference === 'true') {
    rememberMe.checked = true;
    username.value = usernameRemebered;
} else {
    rememberMe.checked = false;
    username.value = '';
}
rememberMe.addEventListener('change', () => {
    if (rememberMe.checked) {
        rememberMe.value = 'true';
        localStorage.setItem('rememberMe', 'true');
    } else {
        rememberMe.value = 'false';
        localStorage.setItem('rememberMe', 'false');
    }
});

username.addEventListener('input', () => {
    localStorage.setItem('username', username.value);
});
