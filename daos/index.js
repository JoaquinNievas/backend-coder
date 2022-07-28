import ProductFileContainer from "./containers/products/products_container_file.js";
import CartFileContainer from "./containers/cart/cart_container_file.js";
import ProductsContainerMongoDb from "./containers/products/products_container_mongoDb.js";

const DATABASES = {
  file: {
    products: new ProductFileContainer("./daos/db/productos.json"),
    cart: new CartFileContainer("./daos/db/cart.json"),
  },
  mongo: {
    products: new ProductsContainerMongoDb(
      "mongodb://localhost:27017/products"
    ),
  },
};

const DB = process.env.SELECTED_DB || "file";

const { products, cart } = DATABASES[DB];

export { products, cart };
