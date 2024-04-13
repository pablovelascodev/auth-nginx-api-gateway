const express = require("express");
const app = express();
const PORT = 3002;

app.get("/v1/csv", (req, res) => {
  res.status(200).send("Estoy dentro de GTP V1");
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
