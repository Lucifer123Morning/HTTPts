import { config } from "./config.js";
export function metricsHandler(req, res) {
    res.type("text/plain");
    res.send(`Hits: ${config.fileserverHits}`);
}
