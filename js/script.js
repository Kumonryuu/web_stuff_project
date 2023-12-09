"use strict";

// Create a query selector
function $(selector) {
    return document.querySelector(selector);
}

// Create a DOMcontentLoaded event listener for contact-us.html
function contact_script() {
    // Create form validation for the form in contact-us.html
    document.addEventListener("DOMContentLoaded", () => {
        const name = $("#name").value;
        const email = $("#email").value;
        const message = $("#message").value;
        const submit = $("#submitBtn");

        let errorMessage = "";

        submit.addEventListener("click", () => {
            if (name.validity.valueMissing) {
                errorMessage += "Name is required.\n";
            }

            if (!email.validity.valid) {
                errorMessage += "Email is required.\n";
            }

            if (message.validity.valueMissing) {
                errorMessage += "Message is required.\n";
            }

            submit.addEventListener("click", ev => {
                if (errorMessage.length > 0) {
                    alert(errorMessage);
                    ev.preventDefault();
                } else {
                    alert("Message sent successfully!");
                }
            });
        });
    });

    // utility functions
    if (!Util) function Util() {
    }


    Util.hasClass = function (el, className) {
        return el.classList.contains(className);
    };

    Util.addClass = function (el, className) {
        var classList = className.split(' ');
        el.classList.add(classList[0]);
        if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
    };

    Util.removeClass = function (el, className) {
        var classList = className.split(' ');
        el.classList.remove(classList[0]);
        if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
    };

    Util.setAttributes = function (el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    };

    Util.moveFocus = function (element) {
        if (!element) element = document.getElementsByTagName('body')[0];
        element.focus();
        if (document.activeElement !== element) {
            element.setAttribute('tabindex', '-1');
            element.focus();
        }
    };

    Util.getIndexInArray = function (array, el) {
        return Array.prototype.indexOf.call(array, el);
    };

    Util.cssSupports = function (property, value) {
        return CSS.supports(property, value);
    };

    Util.extend = function () {
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        var merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    };
}
