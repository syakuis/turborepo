import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.get('/', (_req, res) => {
  res.json({
    message: 'Hello, World! - Backend App',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/hello/:name?', (req, res) => {
  const name = (req.params as { name?: string }).name || 'World';
  res.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString()
  });
});

// Start server only when this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Hello, World! - Backend Server running on port ${PORT}`);
  });
}

// Export app for testing
export default app;
