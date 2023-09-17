import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/')
})

const MONGO_PASSWORD = "pablo1337"
const MONGO_URL = "mongodb+srv://pablo1337:pablo1337@nodejstest.zfatoyj.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('error', (error: Error) => {
    console.log('Mongoose connection error:', error);
  });
  
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB successfully!');
});