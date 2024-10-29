import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserDocument, UserInput } from './user.model';

type OrderDocument = Document & {
  frameColor: string,
  imagesURLs: string[],
  user: Schema.Types.ObjectId

};

type OrderInput = {
    frameColor: OrderDocument['frameColor'];
    imagesURLs: OrderDocument['imagesURLs'];
    user: UserDocument['email']
};

const orderSchema = new Schema(
  {
    frameColor: {
        type: Schema.Types.String,
        default: null,
    },
    imagesURLs: {
        type: Schema.Types.Array
    },
    user: {
       type: Schema.Types.String,
        required: true,
        index: true,
      }
  },
  {
    collection: 'orders',
    timestamps: true,
  },
);

const Order: Model<OrderDocument> = mongoose.model<OrderDocument>('Order', orderSchema);
  
export { Order, OrderInput, OrderDocument };