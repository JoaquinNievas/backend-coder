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
  .delete((req, res) =>
    pContainer
      .deleteAll()
      .then(() => res.send("Eliminados todos los productos"))
  );

router
  .route("/productos/:id")
  .get((req, res) =>
    pContainer.getById(req.params.id).then((prod) => res.send(prod))
  )
  .put((req, res) => {
    const prod = req.body;
    prod._id = req.params.id;
    pContainer.save(prod).then((id) => res.send(id.toString()));
  })
  .delete((req, res) =>
    pContainer.deleteById(req.params.id).then(() => res.send("Eliminado"))
  );

export default router;
