import 'express-session';
import type { Roles } from '../enums/roles.enum.ts';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      rol: Roles;
    };
  }
}
