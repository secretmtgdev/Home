ajaxCall('GET', './views/leadership/leadership.txt', parseLeadershipFile);

/**
 * @method ajaxCall
 * @description Makes a simple http request.
 * 
 * @param {String} VERB The http verb.
 * @param {String} path The path to target.
 * @param {function} handler The handler function on response.
 */
function ajaxCall(VERB, path, handler, body) {
    var request = new XMLHttpRequest();
    request.open(VERB, path);
    request.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            handler(this.responseText);
        }
    }
    if(body) request.send(body)
    else request.send();
}

/**
 * @method parseLeadershipFile
 * @description Parses through a local file to construct the responses to the leadership
 * principles.
 * 
 * @param {String} response 
 */
function parseLeadershipFile(response) {
    let lines = response.split('\n');

    // useful in the sense that this will continually remove all elements
    // whenver the frag is placed into the DOM
    let frag = new DocumentFragment();
    let section, target = 0;
    for(let i = 0; i < lines.length; i++) {
        if(lines[i].includes('Leadership Principle')) {
            var newSection = document.createElement('section');
            var header = document.createElement('h3');
            header.innerText = lines[i].split('-')[1].trimLeft();
            newSection.appendChild(header);
            newSection.dataset.id = ++target;
            document.querySelector('article.leadership').appendChild(newSection);
            section = document.querySelector(`section[data-id='${target}']`);
        } else if(lines[i].includes('q:')) {
            var par = document.createElement('p');
            par.innerText = lines[i].split(':')[1].trimLeft();
            section.appendChild(par);
        } else if(lines[i].includes('a:')) {
            constructLeadershipBlock(section, frag, lines[i].split(':')[1].trimLeft());
        }
    }
}

/**
 * @method constructLeadershipBlock
 * @description Constructs an appropriate response to the STAR question at hand
 * 
 * @param {HTMLSectionElement} targetSection
 * @param {DocumentFragment} fragment 
 * @param {String} quote 
 */
function constructLeadershipBlock(target, fragment, quote) {
    var blockQuote = document.createElement('blockquote');
    var p = document.createElement('p');
    p.innerText = quote;
    var footer = document.createElement('footer');
    footer.innerText = '--Michael Wilson';
    blockQuote.appendChild(p);
    blockQuote.appendChild(footer);
    fragment.appendChild(blockQuote);
    target.appendChild(fragment);
}
