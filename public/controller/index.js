(function() {
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
    }

    function loadPage(filename, foldername) {
        $('main').load(`./views/${foldername}/${filename}.html`);
    }
})();