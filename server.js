const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

app.disable("x-powered-by");

app.use(express.json({ limit: "20kb" }));

// Blood Saathi ke website pages
app.get("/", (req, res) => {
    res.sendFile(path.join(ROOT, "index.html"));
});

const pages = [
    "donor-register.html",
    "blood-request.html",
    "blood-banks.html",
    "patient-help.html"
];

for (const page of pages) {
    app.get("/" + page, (req, res) => {
        res.sendFile(path.join(ROOT, page));
    });
}

// Server test karne ke liye
app.get("/api/health", (req, res) => {
    res.json({
        app: "Blood Saathi API",
        status: "running",
        databaseConnected: false,
        message: "Backend is running. Database connection is not enabled yet."
    });
});

// Anjaan API route ke liye
app.use("/api", (req, res) => {
    res.status(404).json({
        error: "API route not found"
    });
});

// Anjaan page ke liye
app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.listen(PORT, () => {
    console.log("Blood Saathi server started on port " + PORT);
});
