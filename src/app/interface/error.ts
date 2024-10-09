export interface ErrorMessage {
    path: string | number;
    message: string;
}

export interface GenericErrorResponse {
    statusCode: number;
    message: string;
    errorMessages: ErrorMessage[];
}
