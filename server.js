import express from "express";
import router from "./routes.js";
import { engine } from "express-handlebars";

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));

app.use("/api", router);
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));

app.listen(8080, () => {
  console.log("Server running on port 8080!");
});
