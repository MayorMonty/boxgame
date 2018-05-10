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
    height: 33
  },
  boxes: []
};

let start = Date.now();

/**
 * Multipler used to modify game dificulty.
 * The game will increase 100% in difficulty every 2 minutes
 */
function gameProgression() {
  return 1 + (Date.now() - start) / (2 * 60 * 1000);
}

let canvas, context;

// Lifecycle Methods
function init() {
  canvas = document.querySelector("canvas#game");
  context = canvas.getContext("2d");

  canvas.focus();

  requestAnimationFrame(step);
}

setTimeout(function boxSpawn() {
  let box = {
    x:
      state.player.position +
      state.player.width / 2 -
      state.box.width / 2 +
      (Math.random() - 0.5) * canvas.width * 1 / 3,
    y: 0,
    ...state.box
  };
  box.speedx = (state.player.position - box.x) / 200;
  box.speedy = (state.player.position - box.y) / 200;

  state.boxes.push(box);

  console.log(`Spawned box, next spawn in ${3000 / gameProgression()}ms`);
  setTimeout(boxSpawn, 3000 / gameProgression());
}, 1000 / gameProgression());

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
    box.y += box.speedy;
    box.x += box.speedx;

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
