import fs from "fs";
const FILE_PATH = "productos.txt";

class Producto {
  constructor(_id, title, price, thumbnail) {
    this._id = _id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}

export default class Contenedor {
  async save(product) {
    //recibe un objeto lo guarda en el archivo y devuelve el id asignado
    try {
      let data = [];
      let exist = true;
      //verifico si existe el archivo
      await fs.promises.stat(FILE_PATH).catch((_) => (exist = false));
      console.log(`La base de datos ${exist ? "existe" : "no existe"}`);
      const file = exist
        ? await fs.promises.readFile(FILE_PATH, "utf-8")
        : false;
      if (file) data = JSON.parse(file);
      const index = data.findIndex((prod) => prod._id == product._id);
      if (index != -1) {
        data[index] = product;
      } else {
        product._id =
          data.length == 0 ? 1 : parseInt(data[data.length - 1]._id) + 1;
        data.push(product);
      }
      await fs.promises.writeFile(FILE_PATH, JSON.stringify(data));
      return product._id;
    } catch (error) {
      console.log(`error en save: ${error.message}`);
    }
  }

  async getById(id) {
    //recibe un id y devuelve el objeto asociado
    try {
      const file = await fs.promises.readFile(FILE_PATH, "utf-8");
      if (!file) throw new Error("El archivo está vacío");
      const data = JSON.parse(file);
      const producto = data.find((producto) => producto._id == id);
      return producto ?? { error: "Producto no encontrado" };
    } catch (error) {
      console.log(`error de lectura en getById: ${error.message}`);
    }
  }

  async getRandom() {
    //devuelve un array con todos los objetos
    try {
      const file = await fs.promises.readFile(FILE_PATH, "utf-8");
      if (!file) throw new Error("El archivo está vacío");
      const data = JSON.parse(file);
      //return random produto from data
      return data[Math.floor(Math.random() * data.length)];
    } catch (error) {
      console.log(`error de lectura en getById: ${error.message}`);
    }
  }

  async getAll() {
    //devuelve un array con todos los objetos
    try {
      const file = await fs.promises.readFile(FILE_PATH, "utf-8");
      if (!file) throw new Error("El archivo está vacío");
      const data = JSON.parse(file);
      return data;
    } catch (error) {
      console.log(`error de lectura en getById: ${error.message}`);
    }
  }

  async deleteById(id) {
    //recibe un id y elimina el objeto asociado
    try {
      const file = await fs.promises.readFile(FILE_PATH, "utf-8");
      if (!file) throw new Error("El archivo está vacío");
      let data = JSON.parse(file);
      const index = data.findIndex((producto) => producto._id == id);
      if (index == -1) throw new Error("El producto no existe");
      data.splice(index, 1);
      await fs.promises.writeFile(FILE_PATH, JSON.stringify(data));
      console.log("Eliminado");
    } catch (error) {
      console.log(`error en deleteById: ${error.message}`);
    }
  }

  async deleteAll() {
    //elimina todos los objetos
    try {
      await fs.promises.writeFile(FILE_PATH, "[]");
      console.log("Se eliminaron todos los productos");
    } catch {
      console.log("error en deleteAll");
    }
  }
}

const productos = [
  new Producto("", "Producto 1", "10.00", "https://picsum.photos/200"),
  new Producto("", "Producto 2", "20.00", "https://picsum.photos/200"),
  new Producto("", "Producto 3", "30.00", "https://picsum.photos/200"),
  new Producto("", "Producto 4", "40.00", "https://picsum.photos/200"),
];

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
