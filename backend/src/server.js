import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import contactRoutes from './routes/contact.routes.js';
import whatsappRoutes from './routes/whatsapp.routes.js';
import publicRoutes from './routes/public.routes.js';
import adminRoutes from './routes/admin.routes.js';
import storageRoutes from './routes/storage.routes.js';

import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  }),
);

app.use(express.json({ limit: '6mb' }));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'M4 Movers Backend Running 🚀',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'M4 Movers API is running.',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/whatsapp-click', whatsappRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/storage', storageRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
