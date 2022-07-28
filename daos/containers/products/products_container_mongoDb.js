import mongoose from "mongoose";
import model from "../../db_config/mongoDb.js";

export default class ProductsContainerMongoDb {
  constructor(mongoDbUrl) {
    this.mongoDbUrl = mongoDbUrl;
  }

  async init() {
    await mongoose.connect(this.mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }

  async close() {
    await mongoose.connection.close();
  }
}
