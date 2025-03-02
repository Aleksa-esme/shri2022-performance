


let mainDevices = document.querySelector('.main__devices');

mainDevices.addEventListener('click', makeTabs)

function makeTabs(node) {
    let selected = node.querySelector('.section__tab_active').dataset.id;
    const tabs = node.querySelectorAll('.section__tab');
    const list = Array.from(tabs).map(node => node.dataset.id);
    const select = node.querySelector('.section__select');

    function selectTab(newId) {
        const newTab = node.querySelector(`.section__tab[data-id=${newId}]`);
        const newPanel = node.querySelector(`.section__panel[data-id=${newId}]`);
        const oldTab = node.querySelector('.section__tab_active');
        const oldPanel = node.querySelector('.section__panel:not(.section__panel_hidden)');

        selected = newId;

        oldTab.classList.remove('section__tab_active');
        oldTab.setAttribute('aria-selected', 'false');
        oldTab.removeAttribute('tabindex');
        newTab.classList.add('section__tab_active');
        newTab.setAttribute('aria-selected', 'true');
        newTab.setAttribute('tabindex', '0');
        newTab.focus({preventScroll: true});

        oldPanel.classList.add('section__panel_hidden');
        oldPanel.setAttribute('aria-hidden', 'true');
        newPanel.classList.remove('section__panel_hidden');
        newPanel.setAttribute('aria-hidden', 'false');

        select.value = newId;
    }

    select.addEventListener('input', () => {
        selectTab(select.value);
    });

    bind(tabs, 'click', event => {
        const newId = event.target.dataset.id;
        selectTab(newId);
    });

    bind(tabs, 'keydown', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
            return;
        }
        let index = list.indexOf(selected);

        switch (event.keyCode) {
            case 37:
                --index;
                break;
            case 39:
                ++index;
                break;
            case 36:
                index = 0;
                break;
            case 35:
                index = list.length - 1;
                break;
            default:
                return;
        }

        if (index >= list.length) {
            index = 0;
        } else if (index < 0) {
            index = list.length - 1;
        }

        selectTab(list[index]);
        event.preventDefault();
    });
}

function bind(nodes, event, handler) {
    Array.from(nodes).forEach(node => {
        node.addEventListener(event, handler);
    });
}
