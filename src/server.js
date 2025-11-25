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

app.use(morgan('tiny'));

const specs = YAML.load('./docs/openapi.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.get('/', (req, res) => {
  res.status(200).json({ message: 'api running' });
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/trip', tripRoutes);
app.use('/destination', destinationRoutes);
app.use('/activity', activityRoutes);
app.use('/accommodation', accommodationRoutes);
app.use('/user', userRoutes);
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
