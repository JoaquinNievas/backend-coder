import ProductsContainerMdb from "./containers/products/products_container_mariadb.js";
import MessagesContainerSQ from "./containers/messages/messages_container_sq.js";

const DATABASES = {
  //   sqLite: {
  //     products: new productsSq(),
  //     messages: new messagesSq(),
  //   },
  //   mariaDb: {
  //     products: new productsMdb(),
  //   },
  firebase: {
    products: new ProductsContainerMdb(),
    messages: new MessagesContainerSQ(),
  },
};

const DB = process.env.SELECTED_DB || "firebase";

const { products, messages } = DATABASES[DB];

export { products, messages };
