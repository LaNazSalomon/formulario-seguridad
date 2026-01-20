import { z } from 'zod';

export const registerSchema = z.object({
  nombre: z
    .string()
    .min(2, 'Nombre muy corto')
    .max(100, 'Nombre muy largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Nombre inválido'),

  apellido: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Apellido inválido'),

  usuario: z
    .string()
    .min(4)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, 'Usuario inválido'),

  email: z.string().email('Email inválido'),

  password: z
    .string()
    .min(8, 'Contraseña muy corta')
    .max(100)
    .regex(/[A-Z]/, 'Debe tener una mayúscula')
    .regex(/[a-z]/, 'Debe tener una minúscula')
    .regex(/[0-9]/, 'Debe tener un número')
    .regex(/[^A-Za-z0-9]/, 'Debe tener un símbolo'),

  confirmPassword: z.string(),

edad: z
  .coerce
  .number()
  .int('La edad debe ser un número entero')
  .min(13, 'Edad mínima 13')
  .max(120, 'Edad máxima 120')
  .optional(),


  telefono: z
    .string()
    .regex(/^[0-9]{10}$/, 'Teléfono inválido')
    .optional(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  }
);
