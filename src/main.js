import { Entity, System } from "./ecs";
import { Keyboard } from "./systems";
import { Box } from "./entities";

const player = new Box({
  size: {
    width: 40
  },
  velocity: {
    scaleX: 1.8
  },
  control: "ArrowKey",
  text: {
    content() {
      return [...Keyboard.state].join(", ");
    },
    color: "white",
    font: "18pt sans-serif"
  }
});

let canvas, context;
function init() {
  console.log("init()");
  canvas = document.querySelector("canvas#game");
  context = canvas.getContext("2d");

  canvas.focus();
  context.clearRect(0, 0, canvas.width, canvas.height);

  player.position.y = document.documentElement.clientHeight - 200;

  // Start the game tick
  requestAnimationFrame(tick);
}

function tick() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  System.tick({ canvas, context });
  console.log(player.velocity.x, player.position.x);

  requestAnimationFrame(tick);
}

document.addEventListener("DOMContentLoaded", init);
