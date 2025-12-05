import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'
import morgan from 'morgan';
import tripRoutes from './routes/tripRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// URL normalization middleware to handle double slashes (e.g., //auth/login -> /auth/login)
app.use((req, res, next) => {
  req.url = req.url.replace(/\/+/g, '/');
  next();
});

app.use(morgan('tiny'));

// JSON parsing middleware - must come before Swagger UI
app.use(express.json());

const specs = YAML.load('./public/bundled.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.get('/', (req, res) => {
  res.status(200).json({ message: 'api running' });
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.use('/auth', authRoutes);
app.use('/trips', tripRoutes);
app.use('/destinations', destinationRoutes);
app.use('/activities', activityRoutes);
app.use('/accommodations', accommodationRoutes);
app.use('/users', userRoutes);
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    console.log(err.stack);
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
