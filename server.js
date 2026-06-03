const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const db = new sqlite3.Database("events.db");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Create Events Table
db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    date TEXT,
    time TEXT,
    endTime TEXT,
    description TEXT
)`);

// Add Event (POST)
app.post("/events", (req, res) => {
    const { name, date, time, endTime, description } = req.body;
    db.run(
        "INSERT INTO events (name, date, time, endTime, description) VALUES (?, ?, ?, ?, ?)",
        [name, date, time, endTime, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, message: "Event added successfully" });
        }
    );
});

// Get All Events (GET)
app.get("/events", (req, res) => {
    db.all("SELECT * FROM events", [], (err, events) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(events);
    });
});

// Update Event (PUT)
app.put("/events/:id", (req, res) => {
    const { name, date, time, endTime, description } = req.body;
    const eventId = req.params.id;
    db.run(
        `UPDATE events SET 
            name = ?, 
            date = ?, 
            time = ?, 
            endTime = ?, 
            description = ? 
        WHERE id = ?`,
        [name, date, time, endTime, description, eventId],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Event updated successfully" });
        }
    );
});

// Delete Event (DELETE)
app.delete("/events/:id", (req, res) => {
    const eventId = req.params.id;
    db.run("DELETE FROM events WHERE id = ?", [eventId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Event deleted successfully" });
    });
});

// Start Server
app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));