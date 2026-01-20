import type { Request, Response } from 'express';
import { pool } from '../db/pool.js';
import { hashPassword } from '../utils/hash.js';
import { registerSchema } from '../validators/register.schema.js';

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
  } = parsed.data;

  try {
    const passwordHash = await hashPassword(password);

    await pool.query(
      `INSERT INTO users
       (nombre, apellido, usuario, email, password_hash, edad, telefono)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [nombre, apellido, usuario, email, passwordHash, edad, telefono]
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
