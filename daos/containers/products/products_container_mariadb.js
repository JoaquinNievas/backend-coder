import ProductsContainer from "./products_container_knex.js";
import mdbOptions from "../../db_config/mariaDB.js";

export default class ProductsContainerMdb extends ProductsContainer {
  constructor() {
    super(mdbOptions);
  }
}
