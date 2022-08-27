let headerMenu = document.querySelector('.header__menu');
let expanded = headerMenu.getAttribute('aria-expanded');

headerMenu.addEventListener('click', () => {
    makeMenu(expanded);
    headerMenu.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    headerMenu.querySelector('.header__menu-text').textContent = expanded ? 'Закрыть меню' : 'Открыть меню';
    expanded = !expanded;
})

function makeMenu(expanded) {
    const links = document.querySelector('.header__links');
    links.classList.toggle('header__links_opened', expanded);
    links.classList.add('header__links-toggled');
}
