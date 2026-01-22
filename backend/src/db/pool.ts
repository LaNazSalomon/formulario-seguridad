import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  port: 25432,
  user: 'app_user',
  password: '123',
  database: 'form8vo',
});
