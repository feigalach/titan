import { Request, Response } from 'express';
import { Order, OrderInput } from '../models/order.model';
import { randomUUID } from 'crypto';
import { createOrUpdateUser, getUserByEmail } from './user.controller';
import  { isValidObjectId, ObjectId } from 'mongoose';
import { User } from 'src/models/user.model';

export type Order = {
    email:string, 
    fullName: string, 
    fullAddress:string, 
    imagesURLs: string[], 
    frameColor:string, 
    user: string
  }

const createOrder = async (req: Request, res: Response) => {
  const {user, fullAddress, frameColor, imagesURLs, fullName, email} = req.body as Order;

  // auth for user TODO

  if (!email || !fullAddress) {
    return res.status(422).json({
      message: 'The fields email and fullAddress are required',
    });
  }

  const orderInput: OrderInput = {
   frameColor,
   user: email,
   imagesURLs,
  };

  let userUpdated = null;
  try {
    userUpdated = await createOrUpdateUser({email,fullAddress, fullName});
  } catch (error) {
    return res.status(502).json("Could not create or update user " + error);
  }

  // create oprder for this user
  const orderCreated = await Order.create(orderInput);
  
  return res.status(201).json({ data: orderCreated });
};


const getOrdersForUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    if (!email /* and other validations*/) {
        return res.status(400).json("email is not valid");
    }

   const user = await getUserByEmail(email);
   if (!user) {
    return res.status(404).json("user not found");
   }
    const orders = await Order.find({
       user: user.email
    });
    return res.status(201).json({ data: orders });
}

export { createOrder, getOrdersForUser };