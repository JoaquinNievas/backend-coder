import ProductFileContainer from "./containers/products/products_container_file.js";
import CartFileContainer from "./containers/cart/cart_container_file.js";
import ProductsContainerMongoDb from "./containers/products/products_container_mongoDb.js";
import CartContainerMongoDb from "./containers/cart/cart_container_mongoDb.js";

const DATABASES = {
  file: {
    products: new ProductFileContainer("./daos/db/productos.json"),
    cart: new CartFileContainer("./daos/db/cart.json"),
  },
  mongo: {
    products: new ProductsContainerMongoDb(
      "mongodb://127.0.0.1:27017/ecommerce"
    ),
    cart: new CartContainerMongoDb(),
  },
};

const DB = process.env.SELECTED_DB || "mongo";
console.log(`Using database: ${DB}`);

const { products, cart } = DATABASES[DB];

export { products, cart };
