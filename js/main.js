var state = {
  player: {
    x: 0,
    width: 40,
    height: 40,
    speed: 0,
    y: 0
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
    collide: 0
  },
  boxes: [],
  running: true,
  over: false,
  score: 0
};

var start = Date.now();

/**
 * Multipler used to modify game dificulty.
 * The game will increase 100% in difficulty every minute
 */
function gameProgression() {
  return 1 + (Date.now() - start) / (60 * 1000);
}

var canvas, context;

// Lifecycle Methods
function gameOver() {
  state.over = true;

  context.font = "48px sans-serif";
  context.textAlign = "center";
  context.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
  context.font = "18px sans-serif";
  context.fillText("Press Space", canvas.width / 2, canvas.height / 2 + 48);
}

function init() {
  canvas = document.querySelector("canvas#game");
  context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  state.player.x = canvas.width / 2 - state.player.width / 2;

  canvas.focus();

  requestAnimationFrame(step);
}

setTimeout(function boxSpawn() {
  if (!state.over && state.running) {
    var box = {
      x: Math.random() * (canvas.width * 1 / 3) + canvas.width * 1 / 3,
      y: 0,
      ...state.box
    };
    box.speedx = (state.player.x - box.x) / 200;
    box.speedy = Math.min((state.player.x - box.y) / 200, 3.3);

    box.id = `box${performance.now()}`;

    if (box.x < 3 * box.width) {
      box.speedx = 3;
    }

    state.boxes.push(box);

    console.log(`Spawned box, next spawn in ${3000 / gameProgression()}ms`);
  }
  setTimeout(boxSpawn, 1800 / gameProgression());
}, 1000 / gameProgression());

function step() {
  if (state.running) {
    if (!state.over) updateState();
    render();
  }
  requestAnimationFrame(step);
}

function updateState() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  state.player.y = canvas.height - 100;

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
      x: state.player.x + state.player.width / 2 - state.ray.width / 2,
      y: canvas.height - 100,
      id: `ray${performance.now()}`,
      ...state.ray
    });
  }

  if (state.ray.countdown > 0) state.ray.countdown--;

  // "Physics"
  state.player.x += state.player.speed / 2;
  state.player.speed > 0
    ? (state.player.speed -= 1.5)
    : state.player.speed < 0
      ? (state.player.speed += 1.5)
      : null;

  if (state.player.x < 0) state.player.x = canvas.width;
  if (state.player.x > canvas.width) state.player.x = 0;

  state.score += 1;
}

function render() {
  context.fillStyle = "#1a1a1a";
  context.fillRect(
    state.player.x,
    state.player.y,
    state.player.width,
    state.player.width
  );

  // Rays
  state.rays.forEach((ray, index) => {
    if (!state.over) ray.y -= ray.speed;

    var collision = state.boxes.findIndex(box => colliding(ray, box));
    if (collision > -1) {
      state.rays.splice(index, 1);
      state.boxes.splice(collision, 1);
      state.score += 500;
    }

    context.fillRect(ray.x, ray.y, ray.width, ray.height);

    if (ray.y < 0) state.rays.splice(index, 1);
  });

  // Boxes
  state.boxes.forEach((box, index) => {
    if (!state.over) {
      box.y += box.speedy;
      box.x += box.speedx;
    }

    box.speedx = (state.player.x - box.x) / 200;
    box.speedy = Math.min((state.player.x - box.y) / 200, 6);

    if (Math.abs(box.x - state.player.x) < 50) {
      box.speedy = 4;
    }

    if (box.collide > 0) box.collide--;

    if (box.x < 0) box.x = canvas.width;
    if (box.x > canvas.width) box.x = 0;

    if (colliding(box, state.player)) gameOver();
    if (box.y > canvas.height) gameOver();
    var collision = state.boxes.find(bx => colliding(bx, box));
    if (collision) {
      box.collide = 10;
      colliding.collide = 10;
      box.speedx = box.speedx * 3;
      collision.speedx = -collision.speedx * 3;
    }

    context.fillRect(box.x, box.y, box.width, box.height);
  });

  if (!game.over) {
    context.font = "18pt sans-serif";
    context.fillText(state.score, 40, 40);
  }
}

window.addEventListener("DOMContentLoaded", init);

// Keyboard Events
function keydown(e) {
  if (e.code === "Space") {
    if (state.over) {
      state.boxes = [];
      state.rays = [];
      start = Date.now();
      state.over = false;
      state.running = true;
      state.score = 0;
    } else {
      state.running = !state.running;
    }
  }
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

window.addEventListener("touchstart", event => {
  var touch = event.changedTouches[0];

  if (touch.pageX > canvas.width / 2) {
    keydown({ code: "ArrowRight" });
  } else {
    keydown({ code: "ArrowLeft" });
  }
});

window.addEventListener("touchend", event => {
  var touch = event.changedTouches[0];

  if (touch.pageX > canvas.width / 2) {
    keyup({ code: "ArrowRight" });
  } else {
    keyup({ code: "ArrowLeft" });
  }
});

// Collision Detection
function colliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.height + a.y > b.y &&
    a.id != b.id
  );
}
