import express from "express";
import productsContainer from "./products_container.js";
import cartContainer from "./cart_container.js";

const { Router } = express;
const router = Router();
const pContainer = new productsContainer();
const cContainer = new cartContainer();

let isAdmin = true;

router
  .route("/productos")
  .get((req, res) => {
    pContainer
      .getAll()
      .then((products) => res.send(products))
      .catch((err) => res.send({ error: err }));
  })
  .post((req, res) => {
    if (!isAdmin)
      return res.send({
        error: -1,
        descripcion: "ruta productos método POST no autorizada",
      });
    pContainer
      .save(req.body)
      .then((id) => {
        res.send({ id });
        // res.redirect("/api/productos");
      })
      .catch((err) => res.send({ error: err.message }));
  })
  .delete((req, res) => {
    if (!isAdmin)
      return res.send({
        error: -1,
        descripcion: "ruta productos método DELETE no autorizada",
      });
    pContainer
      .deleteAll()
      .then(() => res.send("Eliminados todos los productos"))
      .catch((err) => res.send({ error: err.message }));
  });

router
  .route("/productos/:id")
  .get((req, res) =>
    pContainer
      .getById(req.params.id)
      .then((prod) => res.send(prod))
      .catch((err) => res.send({ error: err.message }))
  )
  .put((req, res) => {
    if (!isAdmin)
      return res.send({
        error: -1,
        descripcion: "ruta productos método PUT no autorizada",
      });
    const prod = req.body;
    prod.id = req.params.id;
    pContainer
      .save(prod)
      .then((id) => res.send({ id }))
      .catch((err) => res.send({ error: err.message }));
  })
  .delete((req, res) => {
    if (!isAdmin)
      return res.send({
        error: -1,
        descripcion: "ruta productos método DELETE no autorizada",
      });
    pContainer
      .deleteById(req.params.id)
      .then(() => res.send("Eliminado"))
      .catch((err) => res.send({ error: err.message }));
  });

router.route("/carrito").post((req, res) => {
  cContainer
    .save(req.body)
    .then((id) => res.send({ id }))
    .catch((err) => res.send({ error: err.message }));
});

router.route("/carrito/:id").delete((req, res) => {
  cContainer
    .deleteById(req.params.id)
    .then(() => res.send("Eliminado"))
    .catch((err) => res.send({ error: err.message }));
});

router
  .route("/carrito/:id/productos")
  .get((req, res) => {
    cContainer
      .getCartProductsById(req.params.id)
      .then((cart) => {
        if (cart) return res.send(cart);
        res.send({ error: "No se encontró el carrito" });
      })
      .catch((err) => res.send({ error: err.message }));
  })
  .post((req, res) => {
    cContainer
      .addProductToCart(req.params.id, req.body.id)
      .then(() => res.send("Agregado"))
      .catch((err) => res.send({ error: err.message }));
  });

router.route("/carrito/:id/productos/:productId").delete((req, res) => {
  cContainer
    .removeProductFromCart(req.params.id, req.params.productId)
    .then(() => res.send("Eliminado"))
    .catch((err) => res.send({ error: err.message }));
});

export default router;
