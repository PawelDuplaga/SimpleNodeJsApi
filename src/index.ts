import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';


const app = express();
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'))

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/')
})
