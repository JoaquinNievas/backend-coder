import express from "express";
import router from "./routes.js";

const app = express();

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World</h1>");
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", router);

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
