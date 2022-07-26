import sqliteOptions from "../../db_config/sqlite.js";
import knex from "knex";
const knexClient = knex(sqliteOptions);

export default class Contenedor {
  async save(message) {
    try {
      message.date = new Date().toISOString().slice(0, 19).replace("T", " ");
      await knexClient("messages").insert(message);
      return message.date;
    } catch (error) {
      console.log(`error al guardar mensaje: ${error.message}`);
    }
  }

  async getMessages() {
    try {
      const data = await knexClient.select("*").from("messages");
      return data;
    } catch (error) {
      console.log(`error al leer mensajes: ${error.message}`);
    }
  }
}
