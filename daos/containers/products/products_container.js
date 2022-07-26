import knex from "knex";
import mariaDbOptions from "../../db_config/mariaDB.js";
const knexClient = knex(mariaDbOptions);

// class Producto {
//   constructor(_id, title, price, thumbnail) {
//     this._id = _id;
//     this.title = title;
//     this.price = price;
//     this.thumbnail = thumbnail;
//   }
// }

export default class Contenedor {
  async save(product) {
    try {
      const id = await knexClient("products")
        .insert(product)
        .onConflict("id")
        .merge();
      console.log(id);
      return id;
    } catch (error) {
      console.log(`error en save: ${error.message}`);
    }
  }

  async getById(id) {
    //recibe un id y devuelve el objeto asociado
    try {
      const producto = await knexClient
        .from("products")
        .select("*")
        .where({ id })
        .limit(1)
        .first();
      return producto ?? { error: "Producto no encontrado" };
    } catch (error) {
      console.log(`error de lectura en getById: ${error.message}`);
    }
  }

  async getAll() {
    //devuelve un array con todos los objetos
    try {
      const products = await knexClient.from("products").select("*");
      return products ?? { error: "No hay productos" };
    } catch (error) {
      console.log(`error de lectura en getById: ${error.message}`);
    }
  }

  async deleteById(id) {
    //recibe un id y elimina el objeto asociado
    try {
      await knexClient("products").where({ id }).del();
      console.log("Eliminado");
    } catch (error) {
      console.log(`error en deleteById: ${error.message}`);
    }
  }

  async deleteAll() {
    //elimina todos los objetos
    try {
      await knexClient("products").del();
      console.log("Se eliminaron todos los productos");
    } catch {
      console.log("error en deleteAll");
    }
  }
}
