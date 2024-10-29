import { Router } from 'express';
import { createOrder, getOrdersForUser, Order } from '../controllers/order.controller';
const orderRoute = () => {
  const router = Router();
  
  router.post('/', async (req, res) => {
    const {email,frameColor,fullAddress,fullName,imagesURLs,user} = req.body as Order;
     // some validations
     // TODO
   
    await createOrder(req, res); 
  });

  router.get('/orders/:email', getOrdersForUser );
  
  return router;
};


export { orderRoute };