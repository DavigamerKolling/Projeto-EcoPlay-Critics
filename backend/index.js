const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/api/games", require("./routes/games"));
app.use("/api/help", require("./routes/help"));

app.use(express.static(path.join(__dirname, "../frontend")));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../frontend/uploads"))
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
