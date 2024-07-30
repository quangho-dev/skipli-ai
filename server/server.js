import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'


import config from './config.js';

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes)

app.listen(config.port, () =>
  console.log(`Server is live at ${config.hostUrl}`),
);