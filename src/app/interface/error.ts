import mongoose from 'mongoose';

export interface ErrorMessage {
    path: string | number;
    message: string;
}

export interface GenericErrorResponse {
    statusCode: number;
    message: string;
    errorMessages: ErrorMessage[];
}

export interface Error11000 extends mongoose.mongo.MongoServerError {
    keyValue: Record<string, string>;
}
