/* validation.js - Form validation library */

let phoneRegex = /^(\(\d{3}\)\s?|\d{3}[-.\s]?)\d{3}[-.\s]?\d{4}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let zipCodeRegex = /^\d{5}(-\d{4})?$/;

const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let form = null;
let successMsg = null;

function initValidation(formId, successId) {
    form = document.getElementById(formId);
    successMsg = document.getElementById(successId);

    if (!form) {
        return;
    }

    let inputs = form.querySelectorAll("input, textarea");

    for (let input of inputs) {
        input.addEventListener("change", inputChanged);
    }

    form.addEventListener("submit", submitForm);
}

function inputChanged(ev) {
    let input = ev.target;
    input.classList.add("was-validated");

    switch (input.id) {
        case "firstName":
            checkRequired("firstName", "First Name is required");
            break;

        case "lastName":
            checkRequired("lastName", "Last Name is required");
            break;

        case "address":
            checkRequired("address", "Address and City is required");
            break;

        case "state":
            if (checkRequired("state", "State is required")) {
                validateState("state", "Not a valid state. Enter a two-letter code, e.g. UT");
            }
            break;

        case "zip":
            if (checkRequired("zip", "Zip Code is required")) {
                checkFormat("zip", "Use a 5-digit or 9-digit zip code", zipCodeRegex);
            }
            break;

        case "phone":
            if (checkRequired("phone", "Phone number is required")) {
                checkFormat("phone", "Use a valid phone number, e.g. 123-456-7890", phoneRegex);
            }
            break;

        case "email":
            if (checkRequired("email", "Email address is required")) {
                checkFormat("email", "Use a valid email address", emailRegex);
            }
            break;
    }

    if (input.name === "discoveryMethod") {
        validateDiscoveryMethod();
    }
}

function submitForm(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    validateForm();

    let inputs = form.querySelectorAll("input, textarea");

    for (let input of inputs) {
        input.classList.add("was-validated");
    }

    if (form.checkValidity()) {
        form.classList.add("hidden");

        if (successMsg) {
            successMsg.classList.remove("hidden");
        }
    }
}

function validateForm() {
    checkRequired("firstName", "First Name is required");
    checkRequired("lastName", "Last Name is required");
    checkRequired("address", "Address and City is required");

    if (checkRequired("state", "State is required")) {
        validateState("state", "Not a valid state. Enter a two-letter code, e.g. UT");
    }

    if (checkRequired("zip", "Zip Code is required")) {
        checkFormat("zip", "Use a 5-digit or 9-digit zip code", zipCodeRegex);
    }

    if (checkRequired("phone", "Phone number is required")) {
        checkFormat("phone", "Use a valid phone number, e.g. 123-456-7890", phoneRegex);
    }

    if (checkRequired("email", "Email address is required")) {
        checkFormat("email", "Use a valid email address", emailRegex);
    }

    validateDiscoveryMethod();
}

function validateState(id, msg) {
    let el = document.getElementById(id);
    let stateValue = el.value.trim().toUpperCase();
    let valid = stateAbbreviations.includes(stateValue);

    setElementValidity(id, valid, msg);
    return valid;
}

function checkFormat(id, msg, regex) {
    let el = document.getElementById(id);
    let valid = regex.test(el.value.trim());

    setElementValidity(id, valid, msg);
    return valid;
}

function checkRequired(id, message) {
    let el = document.getElementById(id);
    let valid = el.value.trim().length > 0;

    setElementValidity(id, valid, message);
    return valid;
}

function validateDiscoveryMethod() {
    let checkboxes = document.querySelectorAll('input[name="discoveryMethod"]');
    let checked = false;

    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            checked = true;
        }
    }

    let firstCheckbox = checkboxes[0];
    let errorDiv = document.getElementById("discovery-error");

    if (firstCheckbox) {
        if (checked) {
            firstCheckbox.setCustomValidity("");

            if (errorDiv) {
                errorDiv.textContent = "";
            }
        } else {
            firstCheckbox.setCustomValidity("You must select at least one discovery method");

            if (errorDiv) {
                errorDiv.textContent = "You must select at least one discovery method";
            }
        }
    }

    for (let checkbox of checkboxes) {
        checkbox.classList.add("was-validated");
    }

    return checked;
}

function setElementValidity(id, valid, message) {
    let el = document.getElementById(id);
    let errorDiv = el.nextElementSibling;

    if (valid) {
        el.setCustomValidity("");

        if (errorDiv && errorDiv.classList.contains("errorMsg")) {
            errorDiv.textContent = "";
        }
    } else {
        el.setCustomValidity(message);

        if (errorDiv && errorDiv.classList.contains("errorMsg")) {
            errorDiv.textContent = message;
        }
    }
}

initValidation("myform", "success-message");