import { ErrorRequestHandler } from 'express';
import config from '../config';

const errorHandler: ErrorRequestHandler = (err: Error, req, res) => {
    res.status(500).json({
        success: false,
        message: err.message,
        stack: config.NODE_ENV === 'development' ? err.stack : null,
    });
};

export default errorHandler;
