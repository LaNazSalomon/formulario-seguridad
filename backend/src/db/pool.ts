import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  port: 25432,
  user: 'formuser',
  password: 'password',
  database: 'form8vo',
});
