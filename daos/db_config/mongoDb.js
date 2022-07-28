import mongoose from "mongoose";

const productsCollectionName = "products";
const productsSchema = new mongoose.Schema({
  title: String,
  price: Number,
  thumbnail: String,
  // description: String,
  // image: String,
  // category: String,
  // createdAt: {
  //     type: Date,
  //     default: Date.now,
  // },
  // updatedAt: {
  //     type: Date,
  //     default: Date.now,
  // },
});

export const productsModel = mongoose.model(
  productsCollectionName,
  productsSchema
);

const cartCollectionName = "cart";
const cartSchema = new mongoose.Schema({
  products: [
    {
      id: Number,
      title: String,
      thumbnail: String,
      price: Number,
      stock: Number,
      timestamp: Number,
      id: String,
    },
  ],
  timestamp: Number,
});

export const cartModel = mongoose.model(cartCollectionName, cartSchema);
