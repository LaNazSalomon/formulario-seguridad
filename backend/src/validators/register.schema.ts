import { z } from 'zod';
import { Roles } from '../enums/roles.enum.js';

export const registerSchema = z.object({
  nombre: z
    .string('El nombre tiene que ser texto')
    .min(2, 'Nombre muy corto')
    .max(100, 'Nombre muy largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Nombre inválido'),

  rol: z.enum(Roles, 'Solo user o aDMIN').default(Roles.USER),


  apellido: z
    .string('El apellido tiene que ser texto')
    .min(2, 'minimo debe contener dos letras el apellido')
    .max(100, 'El maximo de caracteres permitidos para el apellido es cien')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Apellido inválido'),

  usuario: z
    .string('El usuario tiene que ser una cadena de texto')
    .min(4, 'Nombre de usuario por lo menos debe tener 4 caracteres')
    .max(30, 'El maximo de caracteres es de 30 en el nombre de usuario')
    .regex(/^[a-zA-Z0-9_]+$/, 'Usuario inválido'),

  email: z.string().email('Email inválido'),

  password: z
    .string('La contrasena no puede estar vacia')
    .min(8, 'Contraseña muy corta')
    .max(100)
    .regex(/[A-Z]/, 'Debe tener una mayúscula')
    .regex(/[a-z]/, 'Debe tener una minúscula')
    .regex(/[0-9]/, 'Debe tener un número')
    .regex(/[^A-Za-z0-9]/, 'Debe tener un símbolo'),

  confirmPassword: z.string(),

  edad: z
    .coerce
    .number('La edad debe ser un numero')
    .int('La edad debe ser un número entero')
    .min(13, 'Edad mínima 13')
    .max(120, 'Edad máxima 120')
    .optional(),


  telefono: z
    .string('El telefono no puede estar vacio')
    .regex(/^[0-9]{10}$/, 'Teléfono inválido')
    .optional(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  }
);
