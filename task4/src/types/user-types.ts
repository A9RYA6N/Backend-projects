import mongoose, { Document } from 'mongoose';

export interface User extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
