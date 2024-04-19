// create a class for the form validation
class FormValidation {
	constructor(formId) {
		this.form = document.getElementById(formId);
		this.form.addEventListener('submit', this.handleSubmit);

		document.getElementById('name').addEventListener('input', this.validateName);
		document.getElementById('email').addEventListener('input', this.validateEmail);
		document.getElementById('phone').addEventListener('input', this.validatePhone);
	}

	// show error message
	showError = (elementId, errorMessage) => {
		const element = document.getElementById(elementId);
		let errorElement = document.getElementById(elementId + 'Error');

		if (!errorElement) {
			let div = document.createElement('div');
			div.id = `${elementId}Error`;
			div.className = 'formSectionError';
			element.parentNode.insertBefore(div, element.nextSibling);
			errorElement = div;
		}

		errorElement.textContent = errorMessage;
		element.setAttribute('aria-invalid', 'true');
	};
	
	// clear form 
	clearError = (elementId) => {
		let errorElement = this.form.querySelector(`#${elementId}Error`);
		if (errorElement) {
			errorElement.textContent = '';
			const element = document.getElementById(elementId);
            element.setAttribute('aria-invalid', 'false');
		}
	};

	// Validate the name
	validateName = () => {
		let name = document.getElementById('name').value.trim();
		if (name.length < 3) {
			this.showError('name', 'Name must be at least 3 characters');
			return false;
		} else {
			this.clearError('name');
			return true;
		}
	};

	// validate the email
	validateEmail = () => {
		let email = document.getElementById('email').value.trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (email === "") {
			this.showError("email", "Email is required");
			return false;
		} else if (!emailRegex.test(email)){
			this.showError("email", "Invalid email format");
			return false;
		} else {
			this.clearError("email");
			return true;
		}
	};

	// validate the phone
	validatePhone = () => {
		let phone = this.form.querySelector("#phone").value.trim();
        let phoneRegex = /^(\+44|0)?[1-9]\d{9}$/;
		 
		if (phone !== "" && !phoneRegex.test(phone)){
			this.showError("phone", "Invalid format");
			return false;
		} else {
			this.clearError("phone");
			return true;
		}
	};

	// handle the submit event
	handleSubmit = (event) => {
		event.preventDefault();
		console.log('form submitted');
		let isNameValid = this.validateName();
		let isEmailValid = this.validateEmail();
		let isPhoneValid = this.validatePhone();
		if (isNameValid && isEmailValid && isPhoneValid) {
			let div = document.createElement('div');
			div.textContent = 'Form submitted successfully. Thank you!';
			div.classList.add('formSectionSuccessMsg');
			div.setAttribute('role', 'alert');
			this.form.parentNode.insertBefore(div, this.form);
			this.form.reset();

			this.form.querySelector('.formSectionButton').setAttribute('disabled', 'true');
			this.form.querySelector('.formSectionButton').classList.add('formSectionButtonDisabled');
		}
	}
}

new FormValidation('formId');