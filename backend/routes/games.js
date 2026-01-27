const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/", auth, (req, res) => {
  const { title, platform, waste_type, description } = req.body;

  db.query(
    "INSERT INTO games (title, platform, waste_type, description, created_by) VALUES (?, ?, ?, ?, ?)",
    [title, platform, waste_type, description, req.userId],
    () => res.json({ message: "Jogo cadastrado!" })
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM games", (err, results) => {
    res.json(results);
  });
});

module.exports = router;
