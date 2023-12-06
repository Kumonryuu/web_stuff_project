"use strict";

// Create a query selector
function $(selector) {
    return document.querySelector(selector);
}

// Create a DOMcontentLoaded event listener for contact-us.html
function contact_script() {
    // Create form validation for the form in contact-us.html
    document.addEventListener("DOMContentLoaded", e => {
        const form = $("#contact-form");
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
}