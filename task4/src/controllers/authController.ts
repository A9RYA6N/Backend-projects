import { Request, Response } from "express";
import User from "../db/userModel";
import bcrypt from 'bcryptjs'
import generateJWT from "../utils/jwtUtil";
import '../types/express'

const getUser = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ success: true, message: "Got user", data: req.user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal servorr error", error })
    }
}

const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ success: false, message: "Please fill every field" })
        return;
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        if (newUser) {
            generateJWT(newUser._id, res);
            await newUser.save();
            res.status(201).json({success: true, message: "User made"})
        }
        else {
            res.status(400).json({ success: false, message: "Invalid user data" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Error signing up", error })
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter every field" });
        }
        const user = await User.findOne({ email });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(password, user.password)
            if (isPasswordMatching) {
                generateJWT(user._id, res);
                res.status(200).json({success: true, message: "User got"})
            }
            else {
                res.status(400).json({ success: false, message: "Incorrect password" });
            }
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging in", error })
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("accessToken");
        return res.status(200).json({ success: true, message: "User logged out" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging out", error })
    }
}

export { getUser, signup, login, logout }