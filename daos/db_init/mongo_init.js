//0- Crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.
db = db.getSiblingDB("ecommerce");
db.createCollection("messages");
db.createCollection("products");

const date = new Date().toISOString().slice(0, 19).replace("T", " ");
const initialMessages = [
  {
    date,
    message: "Hello world 1",
    email: "joaquinnievasdj@gmail.com",
  },
  {
    date,
    message: "Hello world 2",
    email: "joaquinnievasdj@gmail.com",
  },
  {
    date,
    message: "Hello world 3",
    email: "joaquinnievasdj@gmail.com",
  },
  {
    date,
    message: "Hello world 4",
    email: "joaquinnievasdj@gmail.com",
  },
  {
    date,
    message: "Hello world 5",
    email: "joaquinnievasdj@gmail.com",
  },
  {
    date,
    message: "Hello world 6",
    email: "joaquinnievasdj@gmail.com",
  },
  {
    date,
    message: "Hello world 7",
    email: "joaquinnievasdj@gmail.com",
  },
  {
    date,
    message: "Hello world 8",
    email: "joaquinnievasdj@gmail.com",
  },
  {
    date,
    message: "Hello world 9",
    email: "joaquinnievasdj@gmail.com",
  },
  {
    date,
    message: "Hello world 10",
    email: "joaquinnievasdj@gmail.com",
  },
];

const initialProducts = [
  {
    name: "Product 1",
    price: 120,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    name: "Product 2",
    price: 580,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    name: "Product 3",
    price: 900,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    name: "Product 4",
    price: 1280,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    name: "Product 5",
    price: 1700,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    name: "Product 6",
    price: 2300,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    name: "Product 7",
    price: 2860,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    name: "Product 8",
    price: 3350,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    name: "Product 9",
    price: 4320,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    name: "Product 10",
    price: 4990,
    thumbnail: "https://picsum.photos/200/300",
  },
];

//1- Agregar 10 documentos con valores distintos a las colecciones mensajes y productos.
db.messages.insertMany(initialMessages);
db.products.insertMany(initialProducts);

//3- Listar todos los documentos en cada colección.
db.messages.find().pretty();
db.products.find().pretty();

//4- Mostrar la cantidad de documentos almacenados en cada una de ellas.
db.messages.count();
db.products.count();

//
//
//
//
//
// CRUD
//
//
//
//
//

//5.a- Agregar un producto más en la colección de productos.
db.products.insertOne({
  name: "Product 11",
  price: 4995,
  thumbnail: "https://picsum.photos/200/300",
});

//5.b.0- Realizar una consulta por nombre de producto específico
db.products.find({ name: "Product 11" }).pretty();

//5.b.i- Listar los productos con precio menor a 1000 pesos.
db.products.find({ price: { $lt: 1000 } }).pretty();

//5.b.ii- Listar los productos con precio entre los 1000 a 3000 pesos.
db.products.find({ price: { $gt: 1000, $lt: 3000 } }).pretty();

//5.b.iii- Listar los productos con precio mayor a 3000 pesos.
db.products.find({ price: { $gt: 3000 } }).pretty();

//5.b.iv- Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.products.find().sort({ price: 1 }).skip(2).limit(1).pretty();

//5.c- Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.products.updateMany({}, { $set: { stock: 100 } });

//5.d- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.products.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } });

//5.e- Borrar los productos con precio menor a 1000 pesos
db.products.deleteMany({ price: { $lt: 1000 } });

//6.a- Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce.
db.createUser({
  user: "pepe",
  pwd: "asd456",
  roles: [{ role: "reader" }],
});

//6.b- loguearse como 'pepe' y tratar de eliminar un producto.
db.auth("pepe", "asd456");
db.products.deleteOne({ name: "Product 11" }); //error
