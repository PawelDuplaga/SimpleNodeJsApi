import express from "express"
import { SlideDb, SlideResponse } from "types/Slide";

export const getSlides = async (req: express.Request, res: express.Response) => {
    try {
        const slidesDbResponse = require('../db/slides.json');
        
        if (!slidesDbResponse) {
          throw Error("Cant get data from the source")
        }
    
        const slidesDataDb: SlideDb[] = slidesDbResponse;
        const slidesDataResponse: SlideResponse[] = slidesDataDb.map((slide) => ({
            id: slide.id,
            artist: slide.artist,
            title: slide.title,
            album: slide.album,
            image_url: `${req.protocol}://${req.get('host')}/images/${slide.imageName}`,
            audio_url: `${req.protocol}://${req.get('host')}/audio/${slide.audioName}`
        }))

        return res.status(200).json(slidesDataResponse).end();
        
    } catch (error){
        console.error(error);
        return res.sendStatus(400);
    }
}
