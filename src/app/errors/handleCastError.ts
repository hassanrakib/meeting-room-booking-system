import mongoose from 'mongoose';
import { GenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

export default function handleCastError(
    error: mongoose.Error.CastError
): GenericErrorResponse {
    const errorMessages = [
        {
            path: error.path,
            message: error.message,
        },
    ];

    return {
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Cast Error!',
        errorMessages,
    };
}
