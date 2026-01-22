import { z } from 'zod';

export const loginSchema = z.object({
    
    email: z.string().email('Email inválido'),

    password: z
        .string('La contrasena no puede estar vacia')
        .min(8, 'Contraseña muy corta')
        .max(100)
        .regex(/[A-Z]/, 'Debe tener una mayúscula')
        .regex(/[a-z]/, 'Debe tener una minúscula')
        .regex(/[0-9]/, 'Debe tener un número')
        .regex(/[^A-Za-z0-9]/, 'Debe tener un símbolo'),
});
