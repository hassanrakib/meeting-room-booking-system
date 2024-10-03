import { Request, Response } from 'express';
import httpStatus from 'http-status';

export default function notFound(req: Request, res: Response) {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: httpStatus[404],
        error: '',
    });
}
