import { ErrorRequestHandler } from 'express';
import AppError from '../errors/AppError';
import handleValidationError from '../errors/handleValidationError';
import mongoose from 'mongoose';
import { ErrorMessage } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err: unknown, req, res, next) => {
    // set default values
    let statusCode = 500;

    let message = 'Something went wrong!';

    let errorMessages: ErrorMessage[] = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ];

    // shape different types of errors in a common error type

    if (err instanceof Error) {
        message = err.message;
    }

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    if (err instanceof mongoose.Error.ValidationError) {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }

    res.status(500).json({
        // success: false,
        // message,
        // errorMessages,
        // recommended
        // stack: config.NODE_ENV === 'development' ? err.stack : null,
        // not recommended
        // stack: err.stack,
        // remove after
        error: err,
    });
};

export default errorHandler;
