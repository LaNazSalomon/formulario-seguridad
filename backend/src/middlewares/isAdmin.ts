import type { Request, Response, NextFunction } from 'express';
import { Roles } from '../enums/roles.enum.js';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
        return res.status(401).json({
            message: 'No autenticado',
        });
    }

    if (req.session.user.rol !== Roles.ADMIN) {
        return res.status(403).json({
            message: 'Acceso denegado: solo administradores',
        });
    }

    next();
}
