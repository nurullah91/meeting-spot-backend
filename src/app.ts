import express, { Application } from 'express';
import cors from 'cors';
import router from './app/route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application route
app.use('/api/', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
