import { Request, Response } from 'express';
import { User, UserDocument, UserInput } from '../models/user.model';



const createOrUpdateUser = async (user: UserInput) => {
    const { fullAddress, email, fullName } = user;
  
    if (!email || !fullName) {
        throw new Error('The fields fullName and email are required');
    }
  
    const userInput: UserInput = {
        email,
        fullAddress,
        fullName
    };
    let userUpdated = null;
    const userExist = await getUserByEmail(email);

        userUpdated = !userExist ? 
        await User.create(userInput) :
       await User.updateOne({
            _id : userExist._id
        }, {email: userInput.email, fullAddress:  userInput.fullAddress, fullName:  userInput.fullName});

    
    return userUpdated;
  };

const getUserByEmail = async (email:string) => {
    const user = await User.findOne({email});   
    return user;
  };

const getAllUsers= async (req: Request, res: Response) => {
    const users = await User.find();   
    return res.json(users)
  };
  
  export { createOrUpdateUser, User, getAllUsers, getUserByEmail };