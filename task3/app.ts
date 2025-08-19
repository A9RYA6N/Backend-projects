import express, { Request, Response } from 'express'
import client from './redisClient';

const app = express();

app.use(express.json());

app.post(`/api/weather`, async (req: Request, res: Response) => {
    let { location } = req.body;
    if (!location) {
        res.status(400).json({ success: false, message: "Enter a city name" });
        return;
    }
    try {
        location = location.toLowerCase();
        const cachedResult = await client.get(`${location}`)
        let jsonRes = {}
        if (cachedResult == null) {
            const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${process.env.WEATHER_API_KEY}&contentType=json`)
            jsonRes = await result.json();
            await client.set(`${location}`, JSON.stringify(jsonRes), 'EX', 12 * 60 * 60)
        }
        else {
            jsonRes = JSON.parse(cachedResult);
        }
        res.status(200).json({ success: true, message: location, data: jsonRes });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occured", error })
    }
})

export default app;