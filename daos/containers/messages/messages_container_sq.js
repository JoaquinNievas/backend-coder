import MessagesContainer from "./messages_container_knex.js";
import sqOptions from "../../db_config/sqlite.js";

export default class MessagesContainerSQ extends MessagesContainer {
  constructor() {
    super(sqOptions);
  }
}
