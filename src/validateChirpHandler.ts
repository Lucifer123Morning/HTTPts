import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "./errors.js";

const bannedWords = ["kerfuffle", "sharbert", "Fornax"];

export async function validateChirpHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { body } = req.body;

        if (typeof body !== "string") {
            throw new BadRequestError("Invalid request body");
        }

        // Проверка длины
        if (body.length > 140) {
            throw new BadRequestError("Chirp is too long. Max length is 140");
        }

        // Замена запрещённых слов
        let cleanedBody = body;
        for (const word of bannedWords) {
            const regex = new RegExp(`\\b${word}\\b`, "g");
            cleanedBody = cleanedBody.replace(regex, "****");
        }

        res.status(200).json({ cleanedBody });

    } catch (err) {
        next(err); // передаем ошибку в middleware
    }
}