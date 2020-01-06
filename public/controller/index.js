import UserControllerModule from './users-controller.js';
let UserControl = new UserControllerModule();

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
} else {
    setup();
}

function setup() {
    // bind the navigation clicks
    let nav = document.querySelector('nav');
    nav.onclick = function(event) {
        if(event.target.tagName !== 'LI') return;
        loadPage(event.target.dataset.file, 
            event.target.dataset.folder);
    }
    loadPage('home', 'home');
    UserControl.login('mwilson164', '12345');
}

function loadPage(filename, foldername) {
    $('main').load(`./views/${foldername}/${filename}.html`);
}