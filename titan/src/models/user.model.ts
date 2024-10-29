import mongoose, { Schema, Model, Document } from 'mongoose';

type UserDocument = Document & {
  fullName: string;
  email: string;
  fullAddress: string;
};

type UserInput = {
  fullName: UserDocument['fullName'];
  email: UserDocument['email'];
  fullAddress: UserDocument['fullAddress'];
};

const usersSchema = new Schema(
  {
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
      },
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    fullAddress: {
        type: Schema.Types.String,
        default: null
    }
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);
  
export { User, UserInput, UserDocument };