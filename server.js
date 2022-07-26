import express from "express";
import router from "./routes.js";
import { engine } from "express-handlebars";
import http from "http";
import { Server } from "socket.io";
import {
  products as productsApi,
  messages as messagesApi,
} from "./daos/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));

app.use("/api", router);
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));

server.listen(8080, () => {
  console.log("Server running on port 8080!");
});

io.on("connection", async (socket) => {
  console.log("Usuario conectado");

  const products = await productsApi.getAll();
  socket.emit("products", products);

  const messages = await messagesApi.getMessages();
  socket.emit("messages", messages);

  socket.on("new-product", async (data) => {
    await productsApi.save(data);
    const products = await productsApi.getAll();
    io.sockets.emit("products", products);
  });

  socket.on("new-message", async (data) => {
    await messagesApi.save(data);
    const messages = await messagesApi.getMessages();
    io.sockets.emit("messages", messages);
  });
});
