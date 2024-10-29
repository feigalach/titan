import express from 'express';
import { connectToDatabase } from './db-connection';
import { orderRoute } from './routes/order.route';
import { userRoute } from './routes/user.route';

const HOST = /* process.env.HOST ||*/ 'http://localhost';
const PORT = /* parseInt(process.env.PORT || '4500')*/ 4500;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/order', orderRoute() );
app.use('/user', userRoute() );

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.listen(PORT, async () => {
  await connectToDatabase();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
