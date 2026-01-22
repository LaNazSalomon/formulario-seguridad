import type { Request, Response } from 'express';
import { pool } from '../db/pool.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { registerSchema } from '../validators/register.schema.js';
import { loginSchema } from '../validators/login.schema.js';

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const {
    nombre,
    apellido,
    usuario,
    email,
    password,
    edad,
    telefono,
    rol,
  } = parsed.data;

  try {
    const passwordHash = await hashPassword(password);

    await pool.query(
      `INSERT INTO users
   (nombre, apellido, usuario, email, password_hash, edad, telefono, rol)
   VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [nombre, apellido, usuario, email, passwordHash, edad, telefono, rol]
    );


    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(409).json({
        message: 'Usuario o email ya existe',
      });
    }

    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }




}



export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { email, password } = parsed.data;

  try {
    const result = await pool.query(
      `SELECT id, email, password_hash, rol
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({
        message: 'Credenciales inválidas',
      });
    }

    const user = result.rows[0];

    const isValid = await comparePassword(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({
        message: 'Credenciales inválidas',
      });
    }

    req.session.user = {
      id: user.id,
      rol: user.rol,
    };

    req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Error guardando sesión',
        });
      }

      return res.status(200).json({
        message: 'Login correcto',
        user: {
          id: user.id,
          email: user.email,
          rol: user.rol,
        },
      });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error interno del servidor',
    });
  }
}

