import { App } from "./app.js";
import "./style.scss";

const root = document.getElementById("root");
if (!root) {
  throw new Error('❗ No element with id="root" found');
}

App(root);
