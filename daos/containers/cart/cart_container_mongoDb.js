import { cartModel } from "../../db_config/mongoDb.js";
import { products as productsContainer } from "../../index.js";

export default class CartContainerMongoDb {
  //save
  async save(cart) {
    if (!cart.id) cart.timestamp = Date().getTime();
    const cartModel = new cartModel(cart);
    await cartModel.save();
    //TODO return cart.id;
  }

  //get by id
  async getCartProductsById(id) {
    const cart = await cartModel.findOne({ id });
    if (cart) return cart.products;
  }

  //delete by id
  async deleteById(id) {
    await cartModel.deleteOne({ _id: id });
  }

  //add product to cart
  async addProductToCart(cartId, productId) {
    let cart = await this.getCartProductsById(cartId);
    let productIndex = cart.findIndex((product) => product.id == productId);
    if (productIndex !== -1) throw new Error("Producto ya existe");

    let product = await productsContainer.getById(productId);
    if (!product) throw new Error("Producto no encontrado");
    cart.push(product);
    await this.save(cart);
  }

  //remove product from cart
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
}
