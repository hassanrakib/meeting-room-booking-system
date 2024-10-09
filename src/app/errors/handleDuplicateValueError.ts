import httpStatus from 'http-status';
import {
    Error11000,
    ErrorMessage,
    GenericErrorResponse,
} from '../interface/error';

export default function handleDuplicateValueError(
    error: Error11000
): GenericErrorResponse {
    const errorMessages: ErrorMessage[] = [
        {
            path: Object.keys(error.keyValue)[0],
            message: error.message,
        },
    ];

    return {
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Duplicate Value!',
        errorMessages,
    };
}
