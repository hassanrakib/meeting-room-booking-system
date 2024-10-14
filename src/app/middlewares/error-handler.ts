import { ErrorRequestHandler } from 'express';
import AppError from '../errors/AppError';
import handleValidationError from '../errors/handleValidationError';
import mongoose from 'mongoose';
import { Error11000, ErrorMessage } from '../interface/error';
import handleDuplicateValueError from '../errors/handleDuplicateValueError';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';

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

    // err.code === 11000 makes sure that it is a mongoose duplicate value error
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
        // type assertion to tell typescript compiler that the error also has the keyValue field
        const duplicateError = err as Error11000;
        const simplifiedError = handleDuplicateValueError(duplicateError);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }

    if (err instanceof mongoose.Error.CastError) {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        // recommended
        // stack: config.NODE_ENV === 'development' ? err.stack : null,
        // not recommended
        stack: (err as Error).stack,
    });
};

export default errorHandler;
