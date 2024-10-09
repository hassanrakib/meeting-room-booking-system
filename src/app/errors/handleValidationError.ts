import mongoose from 'mongoose';
import { GenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

export default function handleValidationError(
    error: mongoose.Error.ValidationError
): GenericErrorResponse {
    const errorMessages = Object.values(error.errors).map((error) => ({
        path: error.path,
        message: error.message,
    }));

    return {
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Mongoose validation error!',
        errorMessages,
    };
}
