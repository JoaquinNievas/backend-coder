import express from "express";
import Contenedor from "./products_container.js";
const app = express();
const pContainer = new Contenedor();

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/productos", (req, res) =>
  pContainer.getAll().then((prods) => res.send(prods))
);

app.get("/productoRandom", (req, res) =>
  pContainer.getRandom().then((prod) => res.send(prod))
);

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
