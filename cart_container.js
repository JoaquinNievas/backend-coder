import fs from "fs";
const FILE_PATH = "cart.json";

export default class Contenedor {
  async readFile() {
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

      return data;
    } catch (error) {
      console.log(`error al leer archivo: ${error.message}`);
    }
  }

  async saveFile(data) {
    try {
      await fs.promises.writeFile(FILE_PATH, JSON.stringify(data));
    } catch (error) {
      console.log(`error al guardar archivo: ${error.message}`);
    }
  }

  async save(cart) {
    try {
      let data = await this.readFile();
      cart.id = data.length == 0 ? 1 : parseInt(data[data.length - 1]._id) + 1;
      cart.timestamp = new Date().toISOString();
      data.push(cart);
      await this.saveFile(data);
      return cart.id;
    } catch (error) {
      console.log(`error al guardar mensaje: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      let data = await this.readFile();
      return data.find((cart) => cart._id == id);
    } catch (error) {
      console.log(`error leer carrito: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      let data = await this.readFile();
      data = data.filter((cart) => cart._id != id);
      await this.saveFile(data);
    } catch (error) {
      console.log(`error al eliminar carrito: ${error.message}`);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      let data = await this.readFile();
      let cart = data.find((cart) => cart._id == cartId);
      let product = cart.find((product) => product._id == productId);
      if (!product) throw new Error("Producto no encontrado");
      cart.products.push(product);
      await this.saveFile(data);
    } catch (error) {
      console.log(`error al agregar producto: ${error.message}`);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      let data = await this.readFile();
      let cart = data.find((cart) => cart._id == cartId);
      let productIndex = cart.products.findIndex(
        (product) => product._id == productId
      );
      if (productIndex === -1) throw new Error("Producto no encontrado");
      cart.products.splice(productIndex, 1);
      await this.saveFile(data);
    } catch (error) {
      console.log(`error al eliminar producto: ${error.message}`);
    }
  }
}
