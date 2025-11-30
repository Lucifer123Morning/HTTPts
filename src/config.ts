import express, {NextFunction, Request, Response } from "express";


export type APIConfig = {
    fileserverHits: number;
};

export const config: APIConfig = {
    fileserverHits: 0,
};
function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {

}