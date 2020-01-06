import BaseController from './base-controller.js';
const UserControllerModule = (function() {
    const Private = new WeakMap();
    return class UserController extends BaseController {
        constructor() {
            super();

            // This needs to be constructed when we inject the right element
            let register = document.querySelector('#Register');
            if(register) {
                register.addEventListener('click', e => {
                    e.preventDefault();
                    this.register();
               });
            }
            Private.set(this, {
                token: '',
                ajax: function(VERB, path, data) {
                    let xhr = new XMLHttpRequest();
                    xhr.addEventListener('load', res => {
                        // used arrow function for proper context of this
                        if(xhr.status === 200 && xhr.readyState === 4) {
                            let tmp = Private.get(this);
                            tmp.token = JSON.parse(xhr.responseText).token;
                            return true;
                        } else if(xhr.status !== 200 && xhr.readyState === 4) {
                            return false;
                        }
                    })
                    xhr.open(VERB, `${this.base}:${this.port}/users/${path}`);
                    xhr.setRequestHeader('Content-type', 'application/json');
                    if(data) xhr.send(data);
                    else xhr.send();
                }.bind(this)
            });
        }

        /**
         * @method register
         * @description Registers a user, if the user fills out all of the required fields
         */
        async register() {
            let form = document.forms.Register;
            let formData = new FormData(form);
            let data = {
                "name": formData.get('name'),
                "email": formData.get('email'),
                "username": formData.get('username'),
                "password": formData.get('password')
            }
            await Private.get(this).ajax("POST", "register", data);
        }

        /**
         * @method login
         * @description This method will attempt to log a user into the page
         * @param {string} username 
         * @param {string} password 
         */
        async login(username, password) {
            let data = JSON.stringify({username, password});
            await Private.get(this).ajax("POST", "authenticate", data);
        }
        
        /**
         * @method authenticate
         * @description This method is called whenever a user attempts to access a private page
         * @param {string} route The target route
         * @returns True if the user is authenticated, false otherwise
         */
        async authenticate(route) {
            await Private.get(this).ajax("GET", route, null);
        }
    }
})();

export default UserControllerModule;

