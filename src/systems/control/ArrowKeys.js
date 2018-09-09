import { EntitySystem } from "../EntitySystem";
import { Keyboard } from "../Keyboard";
import { Ray } from "../../entities";

const ArrowKeyController = new EntitySystem(({ entity, canvas }) => {
  if (entity.control !== "ArrowKey") return;

  Keyboard.touches.forEach(touch => {
    let dist = (touch.clientX - entity.position.x) / 30;
    if (Math.abs(dist) > 100) dist = 0;

    if (touch.clientY < canvas.height / 1.5) {
      Keyboard.state.add("ArrowUp");
    } else {
      Keyboard.state.delete("ArrowUp");
    }

    entity.velocity.x = dist;
  });

  if (Keyboard.state.has("ArrowRight")) {
    entity.velocity.x < 0 ? (entity.velocity.x = 0) : null;
    entity.velocity.x <= 25
      ? (entity.velocity.x += entity.velocity.scaleX)
      : null;
  }

  if (Keyboard.state.has("ArrowLeft")) {
    entity.velocity.x > 0 ? (entity.velocity.x = 0) : null;
    entity.velocity.x >= -25
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
