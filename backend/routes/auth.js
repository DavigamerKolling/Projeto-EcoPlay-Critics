const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const cleanName = String(name || "").trim();
  const cleanEmail = String(email || "").trim().toLowerCase();

  const isOnlyNumbers = /^\d+$/.test(cleanName.replace(/\s+/g, ""));
  const hasAnyLetter = /[A-Za-zÀ-ÿ]/.test(cleanName);

  const emailBasicOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
  const allowedDomains = new Set(["gmail.com", "hotmail.com", "outlook.com", "live.com"]);
  const emailDomain = cleanEmail.includes("@") ? cleanEmail.split("@").pop() : "";
  const emailDomainOk = allowedDomains.has(emailDomain);

  if (!cleanName || isOnlyNumbers || !hasAnyLetter) {
    return res.status(400).json({ error: "Nome inválido. Use um nome com letras (não apenas números)." });
  }

  if (!cleanEmail || !emailBasicOk || !emailDomainOk) {
    return res.status(400).json({ error: "Email inválido. Use um email válido (gmail, hotmail, outlook ou live)." });
  }

  if (!String(password || "")) {
    return res.status(400).json({ error: "Senha inválida." });
  }

  db.query("SELECT id FROM users WHERE email = ?", [cleanEmail], async (err, results) => {
    if (err) return res.status(500).json({ error: "Erro no servidor." });

    if (results.length > 0) {
      return res.status(409).json({ error: "Esse email já está cadastrado." });
    }

    db.query("SELECT password FROM users", async (errPwd, rowsPwd) => {
      if (errPwd) return res.status(500).json({ error: "Erro no servidor." });

      for (const r of rowsPwd) {
        const hash = r.password;
        if (!hash) continue;

        const same = await bcrypt.compare(password, hash);
        if (same) {
          return res.status(409).json({ error: "Senha já está em uso por outro usuário. Escolha outra." });
        }
      }

      const hash = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [cleanName, cleanEmail, hash],
        (err2) => {
          if (err2) return res.status(500).json({ error: "Erro ao cadastrar usuário." });
          return res.json({ message: "Usuário criado!" });
        }
      );
    });
  });
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Erro no servidor." });
    if (results.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });

    const user = results[0];
    const ok = await bcrypt.compare(password, user.password);

    if (!ok) return res.status(401).json({ error: "Senha inválida" });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.name,
        name: user.name
      },
      "segredo123",
      { expiresIn: "2h" }
    );

    return res.json({
      token,
      username: user.name
    });
  });
});

router.post("/forgot", (req, res) => {
  const { email } = req.body;

  db.query("SELECT id FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro no servidor." });
    if (results.length === 0) return res.status(404).json({ error: "Email não encontrado" });

    const token = crypto.randomBytes(20).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    db.query(
      "UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?",
      [token, expires, email],
      (err2) => {
        if (err2) return res.status(500).json({ error: "Erro ao gerar token." });

const resetLink = `${process.env.APP_URL}/reset.html?token=${token}`;

transporter.sendMail(
  {
    from: process.env.MAIL_USER,
    to: email,
    subject: "EcoPlay Critics - Recuperação de senha",
    html: `
      <p>Você pediu para redefinir sua senha.</p>
      <p>Clique no link abaixo para criar uma nova senha:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>Este link expira em 1 hora.</p>
    `
  },
  (mailErr) => {
    if (mailErr) {
      console.error(mailErr);
      return res.status(500).json({ error: "Erro ao enviar email." });
    }

    return res.json({ message: "Email de recuperação enviado!" });
  }
);
      }
    );
  });
});

router.post("/reset", async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Informe token e password." });
  }

  db.query(
    "SELECT id, password FROM users WHERE reset_token = ? AND reset_expires > NOW()",
    [token],
    async (err, rows) => {
      if (err) return res.status(500).json({ error: "Erro no servidor." });
      if (rows.length === 0) return res.status(400).json({ error: "Token inválido ou expirado" });

      const user = rows[0];

      const sameAsCurrent = await bcrypt.compare(password, user.password);
      if (sameAsCurrent) {
        return res.status(400).json({ error: "Você não pode usar a mesma senha atual." });
      }

      db.query(
        "SELECT password FROM users WHERE id <> ?",
        [user.id],
        async (err2, others) => {
          if (err2) return res.status(500).json({ error: "Erro no servidor." });

          for (const row of others) {
            const matchOther = await bcrypt.compare(password, row.password);
            if (matchOther) {
              return res.status(400).json({ error: "Essa senha já está sendo usada por outro usuário." });
            }
          }

          const hash = await bcrypt.hash(password, 10);

          db.query(
            "UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?",
            [hash, user.id],
            (err3) => {
              if (err3) return res.status(500).json({ error: "Erro no servidor." });
              return res.json({ message: "Senha alterada com sucesso!" });
            }
          );
        }
      );
    }
  );
});

module.exports = router;
