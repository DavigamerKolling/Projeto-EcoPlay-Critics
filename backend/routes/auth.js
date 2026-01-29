const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash],
    (err) => {
      if (err) return res.status(400).json({ error: "Email já cadastrado ou erro no banco." });
      return res.json({ message: "Usuário criado!" });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Erro no servidor." });
    if (results.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });

    const user = results[0];
    const ok = await bcrypt.compare(password, user.password);

    if (!ok) return res.status(401).json({ error: "Senha inválida" });

    const token = jwt.sign({ id: user.id }, "segredo123", { expiresIn: "2h" });
    return res.json({ token });
  });
});

// FORGOT (gera token e só deixa seguir se o email existir)
router.post("/forgot", (req, res) => {
  const { email } = req.body;

  db.query("SELECT id FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro no servidor." });
    if (results.length === 0) return res.status(404).json({ error: "Email não encontrado" });

    const token = crypto.randomBytes(20).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    db.query(
      "UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?",
      [token, expires, email],
      (err2) => {
        if (err2) return res.status(500).json({ error: "Erro ao gerar token." });
        return res.json({ token }); // front redireciona para reset.html?token=...
      }
    );
  });
});

// RESET (troca a senha usando token válido)
router.post("/reset", async (req, res) => {
  const { token, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE reset_token = ? AND reset_expires > NOW()",
    [hash, token],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor." });
      if (result.affectedRows === 0) return res.status(400).json({ error: "Token inválido ou expirado" });

      return res.json({ message: "Senha alterada com sucesso!" });
    }
  );
});

module.exports = router;
