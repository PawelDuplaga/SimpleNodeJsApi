import express from 'express';
import { getSlides } from '../controllers/slide-controller';

export default (router: express.Router) => {
    router.get('/slides', getSlides);
}