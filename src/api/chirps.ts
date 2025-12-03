import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../index.js"; // Drizzle instance
import { chirps, users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export async function handlerCreateChirp(req: Request, res: Response) {
    try {
        const { body, userId } = req.body;

        // Валидация
        if (!body || typeof body !== "string" || !body.trim()) {
            return res.status(400).json({ error: "Chirp body cannot be empty" });
        }
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Проверка существования пользователя
        const user = await db.select().from(users).where(eq(users.id, userId));
        if (user.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const newChirp = {
            id: uuidv4(),
            body,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.insert(chirps).values(newChirp);

        res.status(201).json(newChirp);
    } catch (err) {
        console.error("Error creating chirp:", err);
        res.status(500).json({ error: "Something went wrong on our end" });
    }
}
