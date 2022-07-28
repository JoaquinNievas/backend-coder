import fs from "fs";
import { products as productsContainer } from "../../index.js";

export default class Contenedor {
  constructor(FILE_PATH) {
    this.FILE_PATH = FILE_PATH;
  }

  async readFile() {
    let data = [];
    let exist = true;
    //verifico si existe el archivo
    await fs.promises.stat(this.FILE_PATH).catch((_) => (exist = false));
    console.log(`La base de datos ${exist ? "existe" : "no existe"}`);
    const file = exist
      ? await fs.promises.readFile(this.FILE_PATH, "utf-8")
      : false;

    if (file) data = JSON.parse(file);

    return data;
  }

  async saveFile(data) {
    await fs.promises.writeFile(this.FILE_PATH, JSON.stringify(data));
  }

  async save(cart) {
    let data = await this.readFile();
    cart.id = data.length == 0 ? 1 : parseInt(data[data.length - 1].id) + 1;
    cart.timestamp = new Date().getTime();
    const products = await productsContainer.getByMultipleId(cart.products);
    cart.products = products;
    data.push(cart);
    await this.saveFile(data);
    return cart.id;
  }

  async getCartProductsById(id) {
    let data = await this.readFile();
    const cart = data.find((cart) => cart.id == id);
    if (cart) return cart.products;
  }

  async deleteById(id) {
    let data = await this.readFile();
    data = data.filter((cart) => cart.id != id);
    await this.saveFile(data);
  }

  async addProductToCart(cartId, productId) {
    let data = await this.readFile();
    let cart = data.find((cart) => cart.id == cartId);
    let productIndex = cart.products.findIndex(
      (product) => product.id == productId
    );
    if (productIndex !== -1) throw new Error("Producto ya existe");

    let product = await productsContainer.getById(productId);
    if (!product) throw new Error("Producto no encontrado");
    cart.products.push(product);
    await this.saveFile(data);
  }

  async removeProductFromCart(cartId, productId) {
    let data = await this.readFile();
    let cart = data.find((cart) => cart.id == cartId);
    let productIndex = cart.products.findIndex(
      (product) => product.id == productId
    );
    if (productIndex === -1)
      throw new Error("El producto no existe en el carrito");
    cart.products.splice(productIndex, 1);
    await this.saveFile(data);
  }
}
