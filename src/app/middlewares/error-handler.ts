import { ErrorRequestHandler } from 'express';
import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message,
        stack: config.NODE_ENV === 'development' ? err.stack : null,
    });
};

export default errorHandler;
