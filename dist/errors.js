export class BadRequestError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "BadRequestError";
    }
}
export class UnauthorizedError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.name = "UnauthorizedError";
    }
}
export class ForbiddenError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = 403;
        this.name = "ForbiddenError";
    }
}
export class NotFoundError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.name = "NotFoundError";
    }
}
