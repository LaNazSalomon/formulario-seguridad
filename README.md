# Formulario de Registro y Login Seguro

Proyecto de **registro y autenticación de usuarios** con validación completa en **frontend y backend**, manejo de **sesiones** y buenas prácticas de seguridad.

---

## Características

- ✅ Validación de datos en frontend y backend
- 🔐 Hashing seguro de contraseñas (bcrypt)
- 🔑 Login con sesiones (`express-session`)
- 🍪 Manejo de cookies con `credentials: 'include'`
- 📝 Registro y autenticación de usuarios
- 🎨 Interfaz simple y responsiva
- 🔒 CORS configurado correctamente
- ✨ Validaciones estrictas por campo

---

## Estructura del Proyecto

formulario-seguridad/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ │ └── auth.controller.ts
│ │ ├── routes/
│ │ │ └── auth.routes.ts
│ │ ├── validators/
│ │ │ ├── register.schema.ts
│ │ │ └── login.schema.ts
│ │ ├── db/
│ │ │ └── pool.js
│ │ ├── utils/
│ │ │ └── hash.js
│ │ └── index.ts
└── frontend/
├── index.html
├── form.html
└── src/
├── js/
│ ├── login.ts
│ └── form.ts
└── style.css


---

## Tecnologías

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Zod (validaciones)
- bcrypt
- express-session

### Frontend
- HTML5
- CSS3
- TypeScript (vanilla)
- Fetch API

---

## Instalación y Ejecución

### Requisitos
- Node.js v18 o superior
- PostgreSQL
- npm

---

### Backend

```bash
cd backend
npm install
npm run dev

Servidor disponible en:

http://localhost:3000

Frontend

cd frontend
npx live-server

Frontend disponible en:

http://localhost:5173

Autenticación y Sesiones

    El login crea una sesión usando express-session

    La sesión se guarda en una cookie

    El frontend debe enviar cookies usando:

fetch(url, {
  credentials: 'include'
})

    Si no se envían las cookies, el backend responderá como no autenticado

API Endpoints
POST /api/register

Registra un nuevo usuario.

Body:

{
  "nombre": "string",
  "apellido": "string",
  "usuario": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "edad": 20,
  "telefono": "1234567890",
  "rol": "user"
}

Respuestas:

    201 Usuario registrado correctamente

    400 Datos inválidos

    409 Usuario o email ya existe

    500 Error interno del servidor

POST /api/login

Inicia sesión y crea la sesión del usuario.

Body:

{
  "email": "correo@email.com",
  "password": "PasswordSeguro123!"
}

Respuesta exitosa:

{
  "message": "Login correcto",
  "user": {
    "id": 1,
    "email": "correo@email.com",
    "rol": "user"
  }
}

Validaciones
Contraseña

    Mínimo 8 caracteres

    Máximo 100 caracteres

    Al menos una mayúscula

    Al menos una minúscula

    Al menos un número

    Al menos un símbolo

Campos

    Nombre / Apellido: solo letras, 2 a 100 caracteres

    Usuario: 4 a 30 caracteres, alfanumérico y _

    Email: formato válido

    Edad: entre 13 y 120 (opcional)

    Teléfono: 10 dígitos numéricos (opcional)

Seguridad

    Contraseñas almacenadas hasheadas

    Validación doble (frontend y backend)

    Manejo de sesiones seguro

    CORS restringido al frontend

    Errores controlados sin exponer información sensible

Notas

    El proyecto no utiliza frameworks frontend

    Está enfocado en demostrar seguridad, validación y autenticación básica
