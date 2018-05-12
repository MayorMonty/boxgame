import { EventEmitter } from "events";
import { EntitySystem } from "./EntitySystem";

const state = new Set();
const events = new EventEmitter();

document.addEventListener("keydown", e => {
  state.add(e.code);
  events.emit(e.code);
});

document.addEventListener("keyup", e => state.delete(e.code));
window.addEventListener("blur", () => state.clear());

const Keyboard = {
  state,
  events
};

export { Keyboard };
