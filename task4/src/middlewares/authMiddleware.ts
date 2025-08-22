import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User from '../db/userModel';
import '../types/express'

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - no token provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - invalid token" })
        }
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in token", error })
    }
}

export default verifyJWT