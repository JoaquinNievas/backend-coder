import express from "express";
import Contenedor from "./products_container.js";

const { Router } = express;
const router = Router();
const pContainer = new Contenedor();

let isAdmin = false;

router
  .route("/productos")
  .get((req, res) => {
    pContainer
      .getAll()
      .then((products) => res.send(products))
      .catch((err) => res.send({ error: err }));
  })
  .post((req, res) => {
    if (!isAdmin) return res.send({ error: "No tienes permisos" });
    pContainer.save(req.body).then((id) => {
      res.send(is.toString());
      // res.redirect("/api/productos");
    });
  })
  .delete((req, res) => {
    if (!isAdmin) return res.send({ error: "No tienes permisos" });
    pContainer
      .deleteAll()
      .then(() => res.send("Eliminados todos los productos"));
  });

router
  .route("/productos/:id")
  .get((req, res) =>
    pContainer.getById(req.params.id).then((prod) => res.send(prod))
  )
  .put((req, res) => {
    if (!isAdmin) return res.send({ error: "No tienes permisos" });
    const prod = req.body;
    prod._id = req.params.id;
    pContainer.save(prod).then((id) => res.send(id.toString()));
  })
  .delete((req, res) => {
    if (!isAdmin) return res.send({ error: "No tienes permisos" });
    pContainer.deleteById(req.params.id).then(() => res.send("Eliminado"));
  });

export default router;
