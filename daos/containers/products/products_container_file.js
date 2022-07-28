import fs from "fs";
// class Producto {
//   constructor(_id, title, price, thumbnail) {
//     this._id = _id;
//     this.title = title;
//     this.price = price;
//     this.thumbnail = thumbnail;
//   }
// }

export default class Contenedor {
  constructor(FILE_PATH) {
    this.FILE_PATH = FILE_PATH;
  }

  async save(product) {
    //recibe un objeto lo guarda en el archivo y devuelve el id asignado
    let data = [];
    let exist = true;
    //verifico si existe el archivo
    await fs.promises.stat(this.FILE_PATH).catch((_) => (exist = false));
    console.log(`La base de datos ${exist ? "existe" : "no existe"}`);
    const file = exist
      ? await fs.promises.readFile(this.FILE_PATH, "utf-8")
      : false;
    if (file) data = JSON.parse(file);
    const pId = parseInt(product.id);
    const index = data.findIndex((prod) => prod.id === pId);
    if (index != -1) {
      //Actualizo
      product.id = pId;
      data[index] = product;
    } else {
      product.timestamp = new Date().getTime();
      product.id =
        data.length == 0 ? 1 : parseInt(data[data.length - 1].id) + 1;
      data.push(product);
    }
    await fs.promises.writeFile(this.FILE_PATH, JSON.stringify(data));
    return product.id;
  }

  async getById(id) {
    //recibe un id y devuelve el objeto asociado
    const file = await fs.promises.readFile(this.FILE_PATH, "utf-8");
    if (!file) throw new Error("El archivo está vacío");
    const data = JSON.parse(file);
    const producto = data.find((producto) => producto.id == id);
    return producto ?? { error: "Producto no encontrado" };
  }

  async getByMultipleId(ids) {
    //recibe un array de ids y devuelve un array de objetos asociados
    const file = await fs.promises.readFile(this.FILE_PATH, "utf-8");
    if (!file) throw new Error("El archivo está vacío");
    const data = JSON.parse(file);
    const productos = data.filter((producto) => ids.includes(producto.id));
    if (productos.length === 0) throw new Error("No se encontraron productos");
    return productos;
  }

  async getRandom() {
    //devuelve un array con todos los objetos
    const file = await fs.promises.readFile(this.FILE_PATH, "utf-8");
    if (!file) throw new Error("El archivo está vacío");
    const data = JSON.parse(file);
    //return random produto from data
    return data[Math.floor(Math.random() * data.length)];
  }

  async getAll() {
    //devuelve un array con todos los objetos
    const file = await fs.promises.readFile(this.FILE_PATH, "utf-8");
    if (!file) throw new Error("El archivo está vacío");
    const data = JSON.parse(file);
    return data;
  }

  async deleteById(id) {
    //recibe un id y elimina el objeto asociado
    const file = await fs.promises.readFile(this.FILE_PATH, "utf-8");
    if (!file) throw new Error("El archivo está vacío");
    let data = JSON.parse(file);
    const index = data.findIndex((producto) => producto.id == id);
    if (index == -1) throw new Error("El producto no existe");
    data.splice(index, 1);
    await fs.promises.writeFile(this.FILE_PATH, JSON.stringify(data));
  }

  async deleteAll() {
    //elimina todos los objetos
    await fs.promises.writeFile(this.FILE_PATH, "[]");
  }
}

// const productos = [
//   new Producto("", "Producto 1", "10.00", "https://picsum.photos/200"),
//   new Producto("", "Producto 2", "20.00", "https://picsum.photos/200"),
//   new Producto("", "Producto 3", "30.00", "https://picsum.photos/200"),
//   new Producto("", "Producto 4", "40.00", "https://picsum.photos/200"),
// ];

// const cont = new Contenedor();

//////Agrega productos al archivo//////
// cont.save(productos[3]).then((id) => console.log(id));

//////Obtiene un producto por id//////
// cont.getById(2).then((producto) => console.log(producto));

//////Obtiene todos los productos//////
// cont.getAll().then((productos) => console.log(productos));

//////Elimina un producto por id//////
// cont.deleteById(2);

//////Elimina todos los productos//////
// cont.deleteAll();
