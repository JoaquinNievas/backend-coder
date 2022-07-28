import mongoose from "mongoose";
import { productsModel } from "../../db_config/mongoDb.js";

export default class ProductsContainerMongoDb {
  constructor(mongoDbUrl) {
    this.mongoDbUrl = mongoDbUrl;
    if (this.mongoDbUrl) this.init();
  }

  init() {
    mongoose.connect(this.mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongodb");
  }

  async close() {
    await mongoose.connection.close();
  }

  async save(product) {
    await productsModel(product).save();
  }

  async getById(id) {
    const product = await productsModel.findById(id);
    return product ?? { error: "Product not found" };
  }

  async getByIds(ids) {
    const products = await productsModel.find({ _id: { $in: ids } });
    return products;
  }

  async getRandom() {
    const products = await productsModel.aggregate([{ $sample: { size: 1 } }]);
    return products[0];
  }

  async getAll() {
    const products = await productsModel.find();
    return products;
  }

  async deleteById(id) {
    await productsModel.deleteOne({ id });
  }

  async deleteAll() {
    await productsModel.deleteMany({});
  }
}
