const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.get("/:gameId", (req, res) => {
  const gameId = req.params.gameId;

  db.query(`
    SELECT c.id, c.comment, c.created_at, u.username
    FROM game_comments c
    JOIN users u ON u.id = c.user_id
    WHERE c.game_id = ?
    ORDER BY c.created_at DESC
  `, [gameId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Erro no servidor." });
    res.json(rows);
  });
});

router.post("/:gameId", auth, (req, res) => {
  const gameId = req.params.gameId;
  const { comment } = req.body;

  if (!comment || !comment.trim()) {
    return res.status(400).json({ message: "Comentário vazio." });
  }

  db.query(
    "INSERT INTO game_comments (game_id, user_id, comment) VALUES (?, ?, ?)",
    [gameId, req.userId, comment],
    (err) => {
      if (err) return res.status(500).json({ message: "Erro ao comentar." });
      res.json({ message: "Comentário enviado!" });
    }
  );
});

module.exports = router;
