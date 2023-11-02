import express from 'express';
import slides from './slides';

const router = express.Router();

export default (): express.Router => {
    slides(router);
    return router
}