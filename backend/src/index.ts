import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors'; 

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))

app.use('/api', authRoutes);

app.listen(3000, () => {
  console.log('API corriendo en http://localhost:3000');
});
