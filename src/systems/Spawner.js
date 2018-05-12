import { System } from "../systems";
import { Enemy, Player } from "../entities";

const Spawner = new System(() => {
  if (Math.random() < 1 / 200) {
    let enemy = new Enemy({
      position: {
        x: Player.position.x,
        y: 10
      }
    });
  }
});

export { Spawner };
