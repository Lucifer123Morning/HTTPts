import express from "express";
import fs from "fs";
import { middlewareMetricsInc } from "./middlewareMetricsInc.js";
import { validateChirpHandler } from "./validateChirpHandler.js";
import { adminMetricsHandler } from "./adminMetricsHandler.js";
import { adminResetHandler } from "./adminResetHandler.js";
import { errorHandler } from "./errorHandler.js";
// === middleware must be defined BEFORE app.use ===
export function middlewareLogResponses(req, res, next) {
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
// --- Express app ---
const app = express();
const PORT = 8080;
// --- Парсер JSON ---
app.use(express.json());
// --- Логирование всех ответов ---
app.use(middlewareLogResponses);
// --- Обработчик готовности ---
function handlerReadiness(_req, res) {
    res.set("Content-Type", "text/plain");
    res.send("OK");
}
// === FILE SERVER ===
app.use("/app", middlewareMetricsInc); // увеличивает счётчик
app.use("/app", express.static("./src/app")); // отдаёт сайт
// === ADMIN ===
app.get("/admin/metrics", adminMetricsHandler);
app.post("/admin/reset", adminResetHandler); // теперь только POST
app.get("/admin/healthz", handlerReadiness);
// === API ===
app.post("/api/validate_chirp", validateChirpHandler);
// --- Middleware для обработки ошибок ---
app.use(errorHandler);
// --- Запуск сервера ---
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
