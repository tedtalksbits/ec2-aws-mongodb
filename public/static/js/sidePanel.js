/* eslint-disable no-undef */
const sidebar = document.querySelector('.dashboard__sidebar');
const sideBarToggles = document.querySelectorAll('[data-sidebar-toggler]');

sideBarToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
});
