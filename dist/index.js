import express from "express";
const app = express();
const PORT = 8080;
function handlerReadiness(_req, res) {
    res.set("Content-Type", "text/plain");
    res.send("OK");
}
app.use("/app", express.static("./src/app"));
app.get("/healthz", handlerReadiness);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
