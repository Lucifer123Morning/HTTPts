import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Нужно, чтобы корректно работать с путями в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// Раздаём статические файлы из папки "assets"
// URL будет /assets/logo.png
app.use("/assets", express.static(path.join(__dirname, "../assets")));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
