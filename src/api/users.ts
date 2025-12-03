import { Request, Response } from "express";
import { db } from "../index.js"; // импортируем Drizzle instance
import { users } from "../db/schema.js";
import { v4 as uuidv4 } from "uuid";

export async function handlerCreateUser(req: Request, res: Response) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const newUser = {
            id: uuidv4(),
            email,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Создаём пользователя в БД
        await db.insert(users).values(newUser);

        // Возвращаем ответ
        return res.status(201).json(newUser);
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ error: "Something went wrong on our end" });
    }
}