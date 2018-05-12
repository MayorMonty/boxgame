import { Box } from "./Box";
import deepmerge from "deepmerge";

export class Enemy extends Box {
  constructor(components) {
    super(
      deepmerge(
        {
          size: {
            width: 45,
            height: 45
          },
          health: 1,
          type: "enemy",
          control: "Enemy",
          collisions: []
        },
        components
      )
    );
  }
}
