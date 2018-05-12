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

  if (Keyboard.state.has("ArrowUp") && !entity.rayCountdown) {
    let ray = new Ray({
      position: { y: entity.position.y }
    });
    ray.position.x =
      entity.position.x + entity.size.width / 2 - ray.size.width / 2;
    entity.rayCountdown = 6;
  }

  if (entity.rayCountdown > 0) entity.rayCountdown--;
});
