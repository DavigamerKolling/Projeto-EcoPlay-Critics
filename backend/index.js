const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json());

// ===== ROTAS DA API =====
app.use("/auth", require("./routes/auth"));
app.use("/api/games", require("./routes/games"));

// ===== ARQUIVOS ESTÁTICOS =====
// Frontend (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "../frontend")));

// Uploads de jogos (capas, imagens, vídeos)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../frontend/uploads"))
);

// ===== ROTA PRINCIPAL =====
// Abre a tela de login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

// ===== PORTA =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
