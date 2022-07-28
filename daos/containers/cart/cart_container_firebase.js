import admin from "firebase-admin";
import { products as productsContainer } from "../../index.js";

export default class CartContainerFirebase {
  constructor() {
    this.init();
  }

  init() {
    this.db = admin.firestore();
    this.collection = this.db.collection("cart");
  }

  async close() {
    await admin.app().delete();
  }

  async save(cart) {
    const doc = await this.collection.doc(cart.id).get();
    if (doc.exists) {
      await this.collection.doc(cart.id).update(cart);
      return cart.id;
    }

    const ref = await this.collection.doc().create(cart);
    return ref.id;
  }

  async getCartProductsById(id) {
    const cart = await this.collection.doc(id).get();
    if (cart.exists) return cart.data();
    return { error: "Carrito no encontrado" };
  }

  async deleteById(id) {
    await this.collection.doc(id).delete();
  }

  async addProductToCart(cartId, productId) {
    let cart = await this.getCartProductsById(cartId);
    let productIndex = cart.products.findIndex(
      (product) => product.id == productId
    );
    if (productIndex !== -1) throw new Error("Producto ya existe");

    let product = await productsContainer.getById(productId);
    if (!product) throw new Error("Producto no encontrado");
    cart.products.push(product);
    await this.save(cart);
  }

  async removeProductFromCart(cartId, productId) {
    let cart = await this.getCartProductsById(cartId);
    let productIndex = cart.products.findIndex(
      (product) => product.id == productId
    );
    if (productIndex === -1)
      throw new Error("El producto no existe en el carrito");
    cart.products.splice(productIndex, 1);
    await this.save(cart);
  }

  async deleteAll() {
    await this.collection.delete();
  }
}
