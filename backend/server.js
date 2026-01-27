require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/games", require("./routes/games"));

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
