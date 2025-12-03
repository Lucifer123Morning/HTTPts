import { Request, Response } from "express";
import { db } from "../index.js";
import { users } from "../db/schema.js";
import { config } from "../config.js";

export async function handlerReset(req: Request, res: Response) {
    try {
        if (config.platform !== "dev") {
            return res.status(403).json({ error: "Forbidden" });
        }

        // Удаляем всех пользователей
        await db.delete(users).execute();

        return res.status(200).json({ message: "All users have been deleted" });
    } catch (err) {
        console.error("Error resetting users:", err);
        return res.status(500).json({ error: "Something went wrong on our end" });
    }
}