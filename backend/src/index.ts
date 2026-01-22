import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import session from 'express-session';

const app = express();
app.use(express.json());

app.use(
  session({
    name: 'formulario-session',
    secret: 'clave-super-secreta',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  })
);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}))

app.use('/api', authRoutes);

app.listen(3000, () => {
  console.log('API corriendo en http://localhost:3000');
});
