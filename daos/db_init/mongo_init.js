import mongoose from "mongoose";
import * as model from "../db_config/mongoDb.js";

//connect to mongodb and create a new database called ecommerce

async function connect() {
  mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongodb");
}

// async function that add product to mongodb
async function addProduct() {
  const product = {
    title: "Producto 1",
    price: 100,
    thumbnail: "https://picsum.photos/200/300",
  };
  const productsModel = new model.productsModel(product);
  await productsModel.save();
  console.log("Product added to mongodb");
}

async function addProducts() {
  const products = [
    {
      title: "Producto 1",
      price: 100,
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      title: "Producto 2",
      price: 200,
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      title: "Producto 3",
      price: 300,
      thumbnail: "https://picsum.photos/200/300",
    },
  ];

  products.forEach(async (product) => {
    await new model.productsModel(product).save();
  });
}

//async function to read all products from mongodb
async function readAllProducts() {
  const products = await model.productsModel.find();
  console.log(products);
}

//async function to disconnect from mongodb
async function disconnect() {
  await mongoose.connection.close();
  console.log("Disconnected from mongodb");
}

async function init() {
  try {
    await connect();
    // await addProduct();
    await addProducts();
    await readAllProducts();
    await disconnect();
  } catch (error) {
    console.log(error);
    await disconnect();
  }
}

init();
