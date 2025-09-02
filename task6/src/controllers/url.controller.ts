import { Request, Response } from "express"
import Url from "../db/urlModel"
import {v4} from 'uuid'

const shortenUrl = async (req: Request, res: Response) => {
    const { longUrl } = req.body;
    try {
        if(!longUrl)
        {
            return res.status(400).json({success:false, message:"URL not provided"})
        }
        const code=v4().substring(0,8)
        console.log(code);
        const newUrl=new Url({
            shortCode:code,
            longUrl
        });
        if(newUrl)
        {
            await newUrl.save();
            res.status(200).json({success:true, message:"Url shortened", data:`http://localhost:8001/${code}`})
        }
    } catch (error) {
        res.status(500).json({success:false, message:"An error occured while shortening url"})
    }
}

export { shortenUrl }