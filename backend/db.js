const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "ecoplay"
});

db.connect(err => {
  if (err) {
    console.log("Erro no banco:", err);
  } else {
    console.log("MySQL conectado!");
  }
});

module.exports = db;
