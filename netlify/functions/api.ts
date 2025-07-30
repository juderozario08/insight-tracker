import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ServerlessHttp from 'serverless-http';
import bodyParser from 'body-parser';
import xhub from 'express-x-hub';
import instagram from './routes/instagram';

dotenv.config();

const api = express();
api.use(cors());
api.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }))
api.use(bodyParser.json());

api.use('/.netlify/functions/api/', instagram);
export const handler = ServerlessHttp(api);
