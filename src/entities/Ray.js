import { Box } from "./Box";

const Ray = new Box({
  size: {
    width: 2,
    height: 40
  },
  velocity: {
    scaleY: 5,
    scaleX: 0,
    frictionY: 0
  }
});

export { Ray };
