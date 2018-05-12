import { EntitySystem } from "../EntitySystem";
import { Keyboard } from "../Keyboard";
import { Ray } from "../../entities";

const ArrowKeyController = new EntitySystem(({ entity, canvas }) => {
  if (entity.control !== "ArrowKey") return;

  if (Keyboard.state.has("ArrowRight")) {
    entity.velocity.x < 0 ? (entity.velocity.x = 0) : null;
    entity.velocity.x <= 10
      ? (entity.velocity.x += entity.velocity.scaleX)
      : null;
  }

  if (Keyboard.state.has("ArrowLeft")) {
    entity.velocity.x > 0 ? (entity.velocity.x = 0) : null;
    entity.velocity.x >= -10
      ? (entity.velocity.x -= entity.velocity.scaleX)
      : null;
  }

  if (Keyboard.state.has("ArrowUp")) {
    entity.children.push(
      new Ray({
        position: entity.position
      })
    );
  }
});
