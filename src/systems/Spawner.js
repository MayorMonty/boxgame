import { System } from "../systems";
import { Enemy, Player } from "../entities";

const Spawner = new System(({ canvas }) => {
  if (Math.random() < 1 / 50) {
    let enemy = new Enemy({
      position: {
        x: Math.random() * (canvas.width * 1 / 3) + canvas.width * 1 / 3,
        y: 10
      }
    });
  }
});

export { Spawner };
