import fs from "fs";
const FILE_PATH = "mesasges.json";

// class Message {
//   constructor(email, message, date) {
//     this.email = email;
//     this.message = message;
//     this.date = date;
//   }
// }

export default class Contenedor {
  async save(message) {
    try {
      let data = [];
      let exist = true;
      //verifico si existe el archivo
      await fs.promises.stat(FILE_PATH).catch((_) => (exist = false));
      console.log(`La base de datos ${exist ? "existe" : "no existe"}`);
      const file = exist
        ? await fs.promises.readFile(FILE_PATH, "utf-8")
        : false;

      if (file) data = JSON.parse(file);
      message.date = new Date().toISOString();
      data.push(message);
      await fs.promises.writeFile(FILE_PATH, JSON.stringify(data));
      return message.date;
    } catch (error) {
      console.log(`error al guardar mensaje: ${error.message}`);
    }
  }

  async getMessages() {
    try {
      const file = await fs.promises.readFile(FILE_PATH, "utf-8");
      if (!file) throw new Error("El archivo está vacío");
      const data = JSON.parse(file);
      return data;
    } catch (error) {
      console.log(`error al leer mensajes: ${error.message}`);
    }
  }
}
