import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (routeHandler: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(routeHandler(req, res, next)).catch((err: unknown) => {
            next(err);
        });
    };
};

export default catchAsync;
