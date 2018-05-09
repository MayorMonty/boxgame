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
    speed: 7
  },
  rays: []
};

let canvas, context;

// Lifecycle Methods
function init() {
  canvas = document.querySelector("canvas#game");
  context = canvas.getContext("2d");

  canvas.focus();

  requestAnimationFrame(step);
}

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

  if (isPressing("ArrowUp") && state.rays.length < 30) {
    state.rays.push({
      x: state.player.position + state.player.width / 2 - state.ray.width / 2,
      y: canvas.height - 100,
      ...state.ray
    });
  }

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
