// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('#email');
    const nameInput = document.querySelector('#name');
    const passwordInput = document.querySelector('#password');

    // Validate the form on submit
    form.addEventListener('submit', function (event) {
        let valid = true;

        // Clear previous error messages
        clearErrors();

        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address.');
            valid = false;
        }

        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            valid = false;
        }

        // Validate password (must be at least 6 characters)
        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters long.');
            valid = false;
        }

        // If the form is not valid, prevent submission
        if (!valid) {
            event.preventDefault();
        }
    });

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to show error messages
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        formGroup.appendChild(errorElement);
        input.classList.add('error');
    }

    // Function to clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function (errorMessage) {
            errorMessage.remove();
        });

        const inputs = document.querySelectorAll('.error');
        inputs.forEach(function (input) {
            input.classList.remove('error');
        });
    }
});
