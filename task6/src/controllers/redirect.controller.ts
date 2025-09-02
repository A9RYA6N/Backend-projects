import { Request, Response } from "express"
import Url from "../db/urlModel"
import {v4} from 'uuid'

const redirectUrl = async (req: Request, res: Response) => {
    const id=req.params.id;
    try {
        if(!id)
        {
            return res.status(400).json({success:false, message:"Incorrect url"})
        }
        const url=await Url.findOne({shortCode:id});
        if(!url)
        {
            res.status(400).json({success:false, message:"Url path not found"})
        }
        res.redirect(301, url?.longUrl as string);
    } catch (error) {
        res.status(500).json({success:false, message:"Error getting url"})
    }
}  

export {redirectUrl}