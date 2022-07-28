import admin from "firebase-admin";

export default class ProductsContainerFirebase {
  constructor(config) {
    if (config) this.init(config);
  }

  init(config) {
    admin.initializeApp(config);
    console.log("Firebase admin SDK initialized");
    this.db = admin.firestore();
    this.collection = this.db.collection("products");
  }

  async close() {
    await admin.app().delete();
  }

  async save(product) {
    const doc = await this.collection.doc(product.id).get();
    if (doc.exists) {
      await this.collection.doc(product.id).update(product);
      return product.id;
    }

    const ref = await this.collection.doc().create(product);
    return ref.id;
  }

  async getById(id) {
    const product = await this.collection.doc(id).get();
    if (product.exists) return product.data();
    return { error: "Producto no encontrado" };
  }

  async getByIds(ids) {
    const products = await this.collection.where("id", "in", ids).get();
    if (products.empty) return [];
    return products.docs.map((doc) => doc.data());
  }

  async getRandom() {
    const products = await this.collection.orderBy("random").limit(1).get();
    if (products.empty) return { error: "Producto no encontrado" };
    return products.docs[0].data();
  }

  async getAll() {
    const products = await this.collection.get();
    if (products.empty) return { error: "No hay productos" };
    return products.docs.map((doc) => doc.data());
  }

  async deleteById(id) {
    await this.collection.doc(id).delete();
  }

  async deleteAll() {
    await this.collection.delete();
  }
}
