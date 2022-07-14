import mariaDbOptions from "./options/mariaDb.js";
import knex from "knex";

const knexClient = knex(mariaDbOptions);

//create product table
knexClient.schema
  .createTable("products", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.float("price");
    table.string("thumbnail");
  })
  .then(() => {
    console.log("Table created");
    return knexClient("products").insert({
      title: "Producto 1",
      thumbnail:
        "https://www.google.com/img/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      price: 100.0,
    });
  })
  .catch((error) => {
    console.log(`error al crear tabla: ${error.message}`);
  })
  .finally(() => {
    knexClient.destroy();
  });
