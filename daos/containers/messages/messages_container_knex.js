import knex from "knex";

export default class Contenedor {
  constructor(options) {
    this.knexClient = knex(options);
  }

  async save(message) {
    try {
      message.date = new Date().toISOString().slice(0, 19).replace("T", " ");
      await this.knexClient("messages").insert(message);
      return message.date;
    } catch (error) {
      console.log(`error al guardar mensaje: ${error.message}`);
    }
  }

  async getMessages() {
    try {
      const data = await this.knexClient.select("*").from("messages");
      return data;
    } catch (error) {
      console.log(`error al leer mensajes: ${error.message}`);
    }
  }
}
