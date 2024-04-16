function showError(elementId, errorMessage) {
    const element = document.getElementById(elementId);
    let errorElement = document.getElementById(elementId + 'Error');

    if (!errorElement) {
        let div = document.createElement('div');
        div.id = elementId + 'Error';
        div.className = 'formSectionError';
        element.parentNode.insertBefore(div, element.nextSibling);
        errorElement = div;
    }

    errorElement.textContent = errorMessage;
    element.setAttribute('aria-invalid', 'true');
}

const clearError = (elementId) => {
    const errorElement = document.getElementById(elementId + 'Error');
    if (errorElement) {
        errorElement.textContent = "";
        const element = document.getElementById(elementId);
        element.setAttribute('aria-invalid', 'false');
    }
}

const validateName = () => {
    const name = document.getElementById('name').value.trim();

    if (name.length < 3) {
        showError('name', 'Name must be at least 3 characters');
        return false;
    } else {
        clearError('name');
        return true;
    }
}

const validateEmail = () => {
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError('email', 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Invalid email format');
        return false;
    } else {
        clearError('email');
        return true;
    }
}

const validatePhone = () =>{
    const phone = document.getElementById("phone").value.trim();
    const phoneRegex = /^(\+44|0)?[1-9]\d{9}$/;

    if (phone !== "" && !phoneRegex.test(phone)) {
        showError('phone', 'Invalid format');
        return false;
    } else {
        clearError('phone');
        return true;
    }
}

// handle the submit event
const handleSubmit = (event) => {
	event.preventDefault();
	let isNameValid = validateName();
	let isEmailValid = validateEmail();
	let isPhoneValid = validatePhone();

	if (isNameValid && isEmailValid && isPhoneValid) {
		let div = document.createElement('div');
		div.textContent = 'Form submitted successfully';
		div.classList.add('formSectionSuccessMsg');
        div.setAttribute('role', 'alert');
        div.setAttribute('aria-live', 'polite');
		const form = document.getElementById('formId');
		form.parentNode.insertBefore(div, form);
		form.reset();
	}
}
// add event listeners
document.getElementById('name').addEventListener("input", validateName);
document.getElementById('email').addEventListener("input", validateEmail);
document.getElementById('phone').addEventListener("input", validatePhone);
document.getElementById('formId').addEventListener('submit', handleSubmit);