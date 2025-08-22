import { Response } from "express";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const generateJWT=async(id: mongoose.Types.ObjectId, res: Response)=>{
    const token=jwt.sign({id}, process.env.JWT_SECRET as string, {
        expiresIn: "7d"
    });
    console.log(token)
    res.cookie("accessToken", token, {
        maxAge: 7*24*60*60*1000, //7 days
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}

export default generateJWT