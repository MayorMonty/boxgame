import { Box } from "./Box";

const Player = new Box({
  size: {
    width: 40
  },
  velocity: {
    scaleX: 1.7
  },
  control: "ArrowKey",
  type: "player"
});

export { Player };
