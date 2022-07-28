import admin from "firebase-admin";
import config from "../db_config/firebase.js";

admin.initializeApp(config);
console.log("Firebase admin SDK initialized");
const db = admin.firestore();

async function insertOneProduct() {
  const query = db.collection("products");

  const doc = query.doc();
  await doc.create({
    title: "Product 1",
    price: 100,
    thumbnail: "https://via.placeholder.com/150",
  });
  console.log("Product 1 created");
}

async function insertManyProducts() {
  const products = [
    {
      title: "Product 1",
      price: 100,
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      title: "Product 2",
      price: 200,
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      title: "Product 3",
      price: 300,
      thumbnail: "https://via.placeholder.com/150",
    },
  ];

  const query = db.collection("products");
  const batch = db.batch();

  products.forEach((doc) => {
    batch.set(query.doc(), doc);
  });
  await batch.commit();
}

async function readAllProducts() {
  const query = db.collection("products");
  const snapshot = await query.get();
  snapshot.forEach((doc) => {
    console.log(doc.data());
  });
}

async function init() {
  try {
    // await insertOneProduct();
    // await insertManyProducts();
    await readAllProducts();
  } catch (error) {
    console.log(error);
  }
}

init();
