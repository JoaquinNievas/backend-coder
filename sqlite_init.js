import knex from "knex";
import sqliteOptions from "./options/sqlite.js";

const knextClient = knex(sqliteOptions);

knextClient.schema
  .createTable("messages", (table) => {
    table.increments("id").primary();
    table.string("email");
    table.string("message");
    table.string("date");
  })
  .then(() => {
    console.log("Tabla creada");
    return knextClient("messages").insert({
      email: "joaquinnievasdj@gmail.com",
      message: "Mensaje de inicio",
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    });
  })
  .catch((error) => {
    console.log(`error al crear tabla: ${error.message}`);
  })
  .finally(() => {
    knextClient.destroy();
  });
