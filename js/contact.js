/* ============================================================
   CONTACT — contact.js
   Validation du formulaire + feedback utilisateur
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  const required = form.querySelectorAll('[required]');

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    required.forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
      if (field.type === 'email' && field.value && !field.value.includes('@')) {
        field.classList.add('error');
        valid = false;
      }
    });

    if (!valid) {
      form.querySelector('.error')?.focus();
      return;
    }

    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
    .then(() => {
      form.reset();
      if (success) {
        success.removeAttribute('hidden');
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    })
    .catch(() => {
      alert('Une erreur est survenue. Merci de réessayer.');
    });
  });

  required.forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
});