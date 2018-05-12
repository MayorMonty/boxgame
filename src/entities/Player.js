import { Box } from "./Box";

const Player = new Box({
  size: {
    width: 40
  },
  velocity: {
    scaleX: 2
  },
  control: "ArrowKey",
  type: "player"
});

export { Player };
