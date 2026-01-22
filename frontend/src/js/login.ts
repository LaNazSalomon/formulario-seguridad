const form = document.getElementById('loginForm') as HTMLFormElement;
const messageBox = document.getElementById('messageBox') as HTMLDivElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  messageBox.textContent = '';
  messageBox.className = 'message';

  const formData = new FormData(form);

  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      messageBox.textContent = data.message || 'Error al iniciar sesión';
      messageBox.classList.add('error');
      return;
    }

    messageBox.textContent = 'Login exitoso';
    messageBox.classList.add('success');
    setTimeout(() => {
      window.location.href = '/form.html';
    }, 800);


  } catch (error) {
    messageBox.textContent = 'Error de conexión con el servidor';
    messageBox.classList.add('error');
  }
});
