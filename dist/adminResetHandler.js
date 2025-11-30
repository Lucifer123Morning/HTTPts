import { config } from "./config.js";
export function adminResetHandler(_req, res) {
    config.fileserverHits = 0;
    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(`
    <html>
      <body>
        <p>Counter has been reset!</p>
      </body>
    </html>
  `);
}
