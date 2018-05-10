let state = {
  player: {
    position: 0,
    width: 40,
    speed: 0
  },
  keys: [],
  ray: {
    width: 3,
    height: 10,
    speed: 7,
    countdown: 0
  },
  rays: [],
  box: {
    width: 45,
    height: 33,
    speed: 3
  },
  boxes: []
};

let canvas, context;

// Lifecycle Methods
function init() {
  canvas = document.querySelector("canvas#game");
  context = canvas.getContext("2d");

  canvas.focus();

  requestAnimationFrame(step);
}

setInterval(() => {
  state.rays.push({
    x: state.player.position + state.player.width / 2 - state.box.width / 2,
    y: 0,
    ...state.box
  });
}, 3000);

function step() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Update State
  if (isPressing("ArrowRight")) {
    state.player.speed < 0 ? (state.player.speed = 0) : null;
    state.player.speed <= 25 ? (state.player.speed += 3) : null;
  }

  if (isPressing("ArrowLeft")) {
    state.player.speed > 0 ? (state.player.speed = 0) : null;
    state.player.speed >= -25 ? (state.player.speed -= 3) : null;
  }

  if (isPressing("ArrowUp") && state.rays.length < 30 && !state.ray.countdown) {
    state.ray.countdown = 10;
    state.rays.push({
      x: state.player.position + state.player.width / 2 - state.ray.width / 2,
      y: canvas.height - 100,
      ...state.ray
    });
  }

  if (state.ray.countdown > 0) state.ray.countdown--;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // "Physics"
  state.player.position += state.player.speed / 2;
  state.player.speed > 0
    ? (state.player.speed -= 1)
    : state.player.speed < 0
      ? (state.player.speed += 1)
      : null;

  if (state.player.position < 0) state.player.position = canvas.width;
  if (state.player.position > canvas.width) state.player.position = 0;

  // Render

  // Player
  context.fillStyle = "#1a1a1a";
  context.fillRect(
    state.player.position,
    canvas.height - 100,
    state.player.width,
    40
  );

  // Rays
  state.rays.forEach((ray, index) => {
    ray.y -= ray.speed;

    context.fillRect(ray.x, ray.y, ray.width, ray.height);

    if (ray.y < 0) state.rays.splice(index, 1);
  });

  // Boxes
  state.boxes.forEach((box, index) => {
    box.y += box.speed;

    context.fillRect(box.x, box.y, box.width, box.height);
  });

  requestAnimationFrame(step);
}
window.addEventListener("DOMContentLoaded", init);

// Keyboard Events
function keydown(e) {
  if (~state.keys.indexOf(e.code)) return;
  state.keys.push(e.code);
}
function keyup(e) {
  state.keys.splice(state.keys.indexOf(e.code), 1);
}
function isPressing(code) {
  return state.keys.includes(code);
}
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);
window.addEventListener("blur", () => (state.keys.length = 0));
