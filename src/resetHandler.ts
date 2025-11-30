import { Request, Response } from "express";
import { config } from "./config.js";

export function resetHandler(req: Request, res: Response) {
    config.fileserverHits = 0;
    res.type("text/plain");
    res.send("OK");
}
