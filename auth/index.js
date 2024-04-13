const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  let x = Math.round(Math.random());
  if (x === 1) {
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
