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

    // Validation basique
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
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Simuler l'envoi (à connecter à un backend/Netlify Forms/Formspree)
    const btn = form.querySelector('.contact-submit');
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = 'Envoyer le message →';
      btn.disabled = false;
      if (success) {
        success.removeAttribute('hidden');
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 1200);
  });

  // Retirer la classe error au typing
  required.forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
});
