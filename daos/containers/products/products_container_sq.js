import ProductsContainer from "./products_container_knex.js";
import sqOptions from "../../db_config/sqlite.js";

export default class ProductsContainerSQ extends ProductsContainer {
  constructor() {
    super(sqOptions);
  }
}
