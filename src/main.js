import { Entity, System } from "./ecs";
import { Keyboard } from "./systems";
import { Box, Player } from "./entities";

let canvas, context;
function init() {
  console.log("init()");
  canvas = document.querySelector("canvas#game");
  context = canvas.getContext("2d");

  canvas.focus();
  context.clearRect(0, 0, canvas.width, canvas.height);

  Player.position.y = document.documentElement.clientHeight - 200;

  // Start the game tick
  requestAnimationFrame(tick);
}

function tick() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  System.tick({ canvas, context });
  console.log(Player.velocity.x, Player.position.x);

  requestAnimationFrame(tick);
}

document.addEventListener("DOMContentLoaded", init);
