import express, {NextFunction, Request, Response } from "express";
import fs from "fs";
import { middlewareMetricsInc } from "./middlewareMetricsInc.js";
import { resetHandler } from "./resetHandler.js";
import { metricsHandler } from "./metricsHandler.js";
import { adminMetricsHandler } from "./adminMetricsHandler.js";
import { adminResetHandler } from "./adminResetHandler.js";

// === middleware must be defined BEFORE app.use ===
export function middlewareLogResponses(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.on("finish", () => {
        const statusCode = res.statusCode;
        const method = req.method;
        const url = req.url;

        if (statusCode !== 200) {
            const log = `[NON-OK] ${method} ${url} - Status: ${statusCode}\n`;
            fs.appendFileSync("server.log", log);
        }
    });

    next();
}

const app = express();
const PORT = 8080;

function handlerReadiness(_req: Request, res: Response) {
    res.set("Content-Type", "text/plain");
    res.send("OK");
}

app.use(middlewareLogResponses);

// --- FILE SERVER ---
app.use("/app", middlewareMetricsInc);        // увеличивает счетчик
app.use("/app", express.static("./src/app")); // отдаёт сайт

// --- ADMIN ---
app.get("/admin/metrics", adminMetricsHandler);
app.post("/admin/reset", adminResetHandler);
app.get("/admin/healthz", handlerReadiness);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});