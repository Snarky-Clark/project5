/* validation.js - Form validation library */

// TODO: Find a suitable phone number regex and place it here
let phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

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

    // Bind the 'change' event to all inputs
    let inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        input.addEventListener("change", inputChanged);
    }

    form.addEventListener("submit", submitForm);
}

function submitForm(ev) {
    // Prevent the browser from naturally submitting the form and refreshing the page
    ev.preventDefault();
    ev.stopPropagation();

    validateForm();

    if (!form.checkValidity()) {
        // TODO: If form is invalid, set 'was-validated' class on ALL inputs to show errors
        form.classList.add("was-validated");

    } else {
        // TODO: Hide the form and show the success message
        form.classList.add("hidden");
        successMsg.classList.remove("hidden");

    }
}

function validateForm() {
    checkRequired("first-name", "First Name is Required");
    checkRequired("last-name", "Last Name is Required");
    checkRequired("address", "Address is Required");
    checkRequired("city", "City is Required");

    if (checkRequired("state", "State is Required")) {
        validateState("state", "Not a valid State, enter two digit code e.g., UT");
    }

    if (checkRequired("email", "Email Address is required")) {
        checkFormat("email", "Email format is bad", emailRegex);
    }
    if (checkRequired("zip", "Zip Code is Required")) {
        checkFormat("zip", "Malformed zip-code, please use 5 or 9 digit format.", zipCodeRegex);
    }
    if (checkRequired("phone", "Phone is required")) {
        checkFormat("phone", "Phone format is bad", phoneRegex);
    }

    checkRequired("newspaper", "You must select at least one referral method!");
}

function validateState(id, msg) {
    let el = document.getElementById(id);
    let valid = false;

    // TODO: Get value from el, convert to upper case, and check if it's in the stateAbbreviations array
    let stateValue = el.value.toUpperCase();
    valid = stateAbbreviations.includes(stateValue);

    setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
    let el = document.getElementById(id);
    let valid = false;

    // TODO: Test the element's value against the provided regex
    valid = regex.test(el.value);

    setElementValidity(id, valid, msg);
    return valid;
}

function checkRequired(id, message) {
    let el = document.getElementById(id);
    let valid = false;
    let type = el.type;

    switch (type) {
        case 'text':
        case 'email':
        case 'password':
            // TODO: Check if input has a 'value', set valid to true if so, false if not
            valid = el.value.length > 0;

            break;

        case 'checkbox':
        case 'radio':
            // TODO: Validate whether any of the checkboxes sharing this element's 'name' are checked.
            // Set 'valid' to true if at least one is checked.
            valid = el.checked;

            break;
    }

    setElementValidity(id, valid, message);
    return valid;
}

function setElementValidity(id, valid, message) {
    let el = document.getElementById(id);
    let errorDiv = el.parentNode.querySelector('.errorMsg');

    if (valid) {
        // Sets to no error message and field is valid
        el.setCustomValidity('');
        // TODO: Clear the text content of the error div
        errorDiv.textContent = '';


    } else {
        // Sets error message and field gets 'invalid' stat
        el.setCustomValidity(message);
        // TODO: Insert the message into the error div
        errorDiv.textContent = message;

    }
}