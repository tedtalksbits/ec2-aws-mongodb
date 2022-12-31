const sidebar = document.querySelector('.dashboard__sidebar');
const sideBarToggles = document.querySelectorAll('[data-sidebar-toggler]');

sideBarToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
});

// close sidebar when clicking outside of it

if (sidebar) {
    document.addEventListener('click', (e) => {
        // console.log(e.target !== sidebar);
        console.log(!e.target.closest('.dashboard__sidebar'));
        if (
            !e.target.closest('.dashboard__sidebar') &&
            !e.target.closest('[data-sidebar-toggler]')
        ) {
            sidebar.classList.remove('open');
        }
    });
}
