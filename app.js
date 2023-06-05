import { TableInit } from "./modules/taskTable/module.js";
import { DbInit } from "./modules/database/db.js";

const worker = new Worker("worker.js", {type: 'module'});
DbInit();
TableInit();