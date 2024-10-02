import express from 'express';
import cors from 'cors';

const app = express();

// application level middlewares
// these middlewares will execute for every time the app receives a request
app.use(express.json());
app.use(cors({ origin: ['*'] }));

export default app;
