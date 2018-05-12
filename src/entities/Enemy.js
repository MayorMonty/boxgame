import { Box } from "./Box";
import deepmerge from "deepmerge";

export class Enemy extends Box {
  constructor(components) {
    super(
      deepmerge(
        {
          size: {
            width: 25,
            height: 25
          },
          type: "enemy"
        },
        components
      )
    );
  }
}
