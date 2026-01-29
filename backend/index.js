const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));


// Servir arquivos do frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Rotas da API
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Rota principal -> login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
