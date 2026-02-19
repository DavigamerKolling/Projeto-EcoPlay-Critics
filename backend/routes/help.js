const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/report", async (req, res) => {
  try {
    const { tipo, desc } = req.body;

    if (!tipo || !desc) {
      return res.status(400).json({ message: "tipo e desc são obrigatórios." });
    }

    const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      subject: `EcoPlay Critics - Relatório (${tipo})`,
      text: `Tipo: ${tipo}\n\nDescrição:\n${desc}\n`
    });

    return res.json({ message: "Relatório enviado!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao enviar email." });
  }
});

module.exports = router;
