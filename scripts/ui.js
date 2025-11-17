let alertEl = null;

const createAlert = () => {
  if (alertEl) return alertEl;

  alertEl = document.createElement('div');
  alertEl.id = 'alert';
  alertEl.className = 'alert';
  alertEl.style.display = 'none';

  const form = document.getElementById('signup-form');
  form.parentNode.insertBefore(alertEl, form);

  return alertEl;
};

export const showAlert = (message, type = 'error') => {
  const alert = createAlert();

  alert.textContent = message;
  alert.className = `alert alert--${type}`;
  alert.style.display = 'block';

  if (type === 'success') {
    clearTimeout(alert.hideTimeout);
    alert.hideTimeout = setTimeout(() => {
      hideAlert();
    }, 3000);
  }
};

export const hideAlert = () => {
  if (alertEl) {
    alertEl.style.display = 'none';
  }
};

export const showFieldError = (fieldId, message) => {
  const field = document.getElementById(fieldId);
  const existing = field.parentNode.querySelector('.error');
  if (existing) existing.remove();

  const error = document.createElement('span');
  error.className = 'error';
  error.textContent = message;
  field.parentNode.appendChild(error);
  field.classList.add('input-error');
};

export const clearFieldErrors = () => {
  document.querySelectorAll('.error').forEach((el) => el.remove());
  document
    .querySelectorAll('.input-error')
    .forEach((el) => el.classList.remove('input-error'));
};
