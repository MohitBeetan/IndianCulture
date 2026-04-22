const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./lib/db");
const State = require("./models/State");
dotenv.config();

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

app.get("/state/:statename", (req, res) => {
    const statename = req.params.statename;
    console.log(`State Page: ${statename}`);
    res.sendFile(path.join(PUBLIC_DIR, "state.html"));
});

app.get("/api/state/:statename", async (req, res) => {
    try {
        await connectDB();

        const { statename } = req.params;
        const state = await State.findOne({
            $or: [
                { slug: statename.toLowerCase() },
                { name: new RegExp(`^${statename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
            ],
        }).lean();

        if (!state) {
            return res.status(404).json({ error: "State not found" });
        }

        return res.json(state);
    } catch (err) {
        console.error("State fetch error:", err);
        return res.status(500).json({ error: "Failed to fetch state details" });
    }
});

app.use((req, res) => {
    res.status(404).send("Page not found");
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});