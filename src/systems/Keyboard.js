import { EventEmitter } from "events";
import { EntitySystem } from "./EntitySystem";
import { Player } from "../entities";

const state = new Set();
const events = new EventEmitter();
const touches = [];

document.addEventListener("keydown", e => {
  state.add(e.code);
  events.emit(e.code);
});

document.addEventListener("keyup", e => state.delete(e.code));
window.addEventListener("blur", () => state.clear());

document.addEventListener("touchstart", e => {
  touches.splice(0, touches.length);
  touches.push(...e.changedTouches);
});
document.addEventListener("touchend", e => {
  touches.splice(0, touches.length);
  Keyboard.state.delete("ArrowUp");
});
document.addEventListener("touchmove", e => {
  touches.splice(0, touches.length);
  touches.push(...e.changedTouches);
});

const Keyboard = {
  state,
  events,
  touches
};

export { Keyboard };
