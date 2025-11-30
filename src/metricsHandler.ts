import { Request, Response } from "express";
import { config } from "./config.js";

export function metricsHandler(req: Request, res: Response) {
    res.type("text/plain");
    res.send(`Hits: ${config.fileserverHits}`);
}
