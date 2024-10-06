export default class AppError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string, stack = '') {
        // calls the super constructor to initialize message property
        super(message);

        // initialize statusCode property of the AppError instance
        this.statusCode = statusCode;

        // if stack is provided
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
