"use strict";

function $(selector) {
    return document.querySelector(selector);
}

function contact_script() {
    document.addEventListener("DOMContentLoaded", () => {
        const form = $("#contact-form");
        const name = $("#name");
        const email = $("#email");
        const message = $("#message");
        const back = $("#backBtn");

        // Add input event listeners to the input fields
        name.addEventListener("input", validateName);
        email.addEventListener("input", validateEmail);
        message.addEventListener("input", validateMessage);

        form.addEventListener("submit", (ev) => {
            ev.preventDefault();

            // Reset error messages and classes
            ["name", "email", "message"].forEach(id => {
                $(`#${id}`).classList.remove("error");
                $(`#${id}-error`).textContent = "";
            });

            // Validate the input fields when the form is submitted
            validateName();
            validateEmail();
            validateMessage();

            if (!form.querySelector(".error")) {
                alert("Message sent successfully!");
                form.reset();
            }
        });

        function validateName() {
            if (name.value.trim() === "") {
                name.classList.add("error");
                $("#name-error").textContent = "Name is required.";
            } else {
                name.classList.remove("error");
                $("#name-error").textContent = "";
            }
        }

        function validateEmail() {
            if (email.value.trim() === "") {
                email.classList.add("error");
                $("#email-error").textContent = "Email is required.";
            } else {
                email.classList.remove("error");
                $("#email-error").textContent = "";
            }
        }

        function validateMessage() {
            if (message.value.trim() === "") {
                message.classList.add("error");
                $("#message-error").textContent = "Message is required.";
            } else {
                message.classList.remove("error");
                $("#message-error").textContent = "";
            }
        }

        back.addEventListener("click", () => {
            window.history.back();
        });
    });
}