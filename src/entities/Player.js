import { Box } from "./Box";

const Player = new Box({
  size: {
    width: 40
  },
  velocity: {
    scaleX: 2
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

export { Player };
