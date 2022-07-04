import express from "express";
import router from "./routes.js";

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => res.render("index"));
app.use("/api", router);

app.listen(process.env.PORT || 8080, () =>
  console.log("Server running on port 8080!")
);
