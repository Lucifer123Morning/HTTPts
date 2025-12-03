import { Request, Response } from "express";

export function handlerReadiness(req: Request, res: Response) {
    res.status(200).send("OK");
}