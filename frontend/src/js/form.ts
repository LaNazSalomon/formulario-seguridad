import { registerUser } from '../api/api';

const form = document.getElementById('registerForm') as HTMLFormElement;
const messageBox = document.getElementById('messageBox') as HTMLDivElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  messageBox.innerHTML = '';
  messageBox.className = 'message';

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  

  try {
    await registerUser(data);

    messageBox.textContent = 'Usuario registrado correctamente';
    messageBox.classList.add('success');
    form.reset();
  } catch (err: any) {
    messageBox.classList.add('error');

    if (err.errors) {
      const errors = Object.values(err.errors).flat();
      messageBox.innerHTML = errors.map(e => `• ${e}`).join('<br>');
    } else {
      messageBox.textContent = err.message || 'Error desconocido';
    }
  }
});
