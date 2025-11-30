import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    if (err.statusCode && err.message) {
        // Пользовательская ошибка
        res.status(err.statusCode).json({ error: err.message });
    } else {
        // Любая другая ошибка — 500
        console.log("Internal Server Error:", err);
        res.status(500).json({ error: "Something went wrong on our end" });
    }
}
