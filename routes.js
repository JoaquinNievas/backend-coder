import express from "express";
import Contenedor from "./products_container.js";

const { Router } = express;
const router = Router();
const pContainer = new Contenedor();

router
  .route("/productos")
  .get((req, res) => pContainer.getAll().then((prods) => res.send(prods)))
  .post((req, res) =>
    pContainer.save(req.body).then((id) => res.send(id.toString()))
  )
  .delete((req, res) => {
    //TODO delete all products
    res.send("delete ok");
  });

router
  .route("/productos/:id")
  .get((req, res) =>
    //TODO handle error
    pContainer.getById(req.params.id).then((prod) => res.send(prod))
  )
  .put((req, res) => {
    //TODO update product
    res.send("put ok");
  })
  .delete((req, res) => {
    //TODO delete product
    res.send("delete ok");
  });

export default router;
