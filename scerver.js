const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

app.get("/", (req, res) => {
    console.log("Home Page");
    res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.use(express.static(PUBLIC_DIR));

app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});