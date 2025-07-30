import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ServerlessHttp from 'serverless-http';
import bodyParser from 'body-parser';
import xhub from 'express-x-hub';

dotenv.config();

const api = express();
const token = process.env.TOKEN || 'token';
const received_updates: Request[] = [];

api.use(cors());
api.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }))
api.use(bodyParser.json());

api.get('/api', (req, res) => {
    console.log(req);
    res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
});

const instagram = express.Router();
instagram.get('/', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === token) {
        res.send(req.query['hub.challenge']);
    } else {
        res.json({ status: 400 }).status(400);
    }
})
instagram.post('/instagram', function(req, res) {
    console.log('Instagram request body:');
    console.log(req.body);
    received_updates.unshift(req.body);
    res.json({ status: 200 }).status(200);
});
api.use('/api/instagram', instagram);

export const handler = ServerlessHttp(api);
