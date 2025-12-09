import 'dotenv/config';
import express from 'express';
import bookRouter from './routes/bookRoutes.js';

const app = express();
app.use(express.json());

app.use('/books', bookRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
