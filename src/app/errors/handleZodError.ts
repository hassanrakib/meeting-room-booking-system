import { ZodError } from 'zod';
import { GenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

export default function handleZodError(error: ZodError): GenericErrorResponse {
    const errorMessages = Object.values(error.issues).map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));

    return {
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Zod Error!',
        errorMessages,
    };
}
