import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../utils/send-response';

export default function notFound(req: Request, res: Response) {
    sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Not Found!',
    });
}
