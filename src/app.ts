import express from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import errorHandler from './app/middlewares/error-handler';
import notFound from './app/middlewares/not-found';
import { router } from './app/routes';

const app = express();

// application level middlewares
// these middlewares will execute for every time the app receives a request
app.use(express.json());
app.use(cors({ origin: ['*'] }));

app.get('/', (req, res) => {
    res.json({ status: httpStatus[200], message: 'Server is running!' });
});


// routes
app.use('/api', router);

// application level not found routes handling middleware
app.use(notFound);

// application level custom error handling middleware
app.use(errorHandler);

export default app;
