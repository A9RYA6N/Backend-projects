// src/types/express.d.ts
import { Document, Types } from 'mongoose';

// Define your User interface
export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

// Extend Express Request interface
declare module "express-serve-static-core" {
    interface Request {
        user?: IUser; //This will tell ts to use this when req.user is called
    }
}
export { }