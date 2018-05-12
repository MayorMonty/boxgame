import { Box } from "./Box";
import deepmerge from "deepmerge";

export class Ray extends Box {
  constructor(components) {
    super(
      deepmerge(
        {
          size: {
            width: 3,
            height: 10
          },
          velocity: {
            scaleY: 5,
            scaleX: 0,
            frictionY: 0,
            y: -3
          }
        },
        components
      )
    );
  }
}
