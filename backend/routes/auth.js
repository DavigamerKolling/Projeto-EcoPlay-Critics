const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Usuário criado!" });
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (results.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });

      const user = results[0];
      const ok = await bcrypt.compare(password, user.password);

      if (!ok) return res.status(401).json({ error: "Senha inválida" });

      const token = jwt.sign({ id: user.id }, "segredo123", { expiresIn: "2h" });

      res.json({ token });
    }
  );
});

module.exports = router;
