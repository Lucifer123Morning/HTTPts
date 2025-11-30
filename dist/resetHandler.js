import { config } from "./config.js";
export function resetHandler(req, res) {
    config.fileserverHits = 0;
    res.type("text/plain");
    res.send("OK");
}
