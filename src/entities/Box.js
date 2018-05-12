import { Entity } from "../ecs";
import deepmerge from "deepmerge";

export class Box extends Entity {
  constructor(components) {
    super(
      deepmerge(
        {
          position: {
            x: 0,
            y: 0
          },
          velocity: {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            frictionX: 1,
            frictionY: 1
          },
          size: {
            height: 40,
            width: 40
          },
          render: {
            text: false,
            box: true
          }
        },
        components
      )
    );
  }
}
