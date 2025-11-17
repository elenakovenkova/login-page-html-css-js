import {
  showAlert,
  hideAlert,
  showFieldError,
  clearFieldErrors,
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert();
    clearFieldErrors();

    if (validateForm()) {
      const formData = new FormData(form);
      console.log('Submitted:', Object.fromEntries(formData));
      showAlert('Account created successfully!', 'success');
      form.reset();
    }
  });
});

function validateForm() {
  const validations = [
    validateName('firstName', 'First name'),
    validateName('lastName', 'Last name'),
    validateEmailOrPhone(),
    validateDateOfBirth(),
    validatePassword(),
    validateConfirmPassword(),
    validateCheckbox(),
  ];

  return validations.every(Boolean);
}

function validateName(id, label) {
  const value = document.getElementById(id).value.trim();
  if (!value) {
    showFieldError(id, `${label} is required`);
    return false;
  }
  if (value.length < 2) {
    showFieldError(id, `${label} must be at least 2 characters`);
    return false;
  }
  return true;
}

function validateEmailOrPhone() {
  const value = document.getElementById('emailOrPhone').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  if (!value) {
    showFieldError('emailOrPhone', 'Email or phone is required');
    return false;
  }
  if (!emailRegex.test(value) && !phoneRegex.test(value)) {
    showFieldError('emailOrPhone', 'Enter valid email or phone (+1234567890)');
    return false;
  }
  return true;
}

function validateDateOfBirth() {
  const dob = document.getElementById('dateOfBirth').value;
  if (!dob) {
    showFieldError('dateOfBirth', 'Date of birth is required');
    return false;
  }
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  if (age < 18) {
    showFieldError('dateOfBirth', 'You must be 18 or older');
    return false;
  }
  return true;
}

function validatePassword() {
  const password = document.getElementById('password').value;
  if (!password) {
    showFieldError('password', 'Password is required');
    return false;
  }
  if (password.length < 8) {
    showFieldError('password', 'Password must be 8+ characters');
    return false;
  }
  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
    showFieldError('password', 'Password must contain letters and numbers');
    return false;
  }
  return true;
}

function validateConfirmPassword() {
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;
  if (confirm !== password) {
    showFieldError('confirmPassword', 'Passwords do not match');
    return false;
  }
  return true;
}

function validateCheckbox() {
  const checkbox = document.getElementById('agreeTerms');
  if (!checkbox.checked) {
    showAlert('You must agree to the Terms and Privacy Policy', 'error');
    return false;
  }
  return true;
}
