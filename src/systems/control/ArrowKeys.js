import { EntitySystem } from "../EntitySystem";

const ArrowKeyController = new EntitySystem(({ entity, canvas }) => {
  if (entity.control !== "ArrowKey") return;

  if (state.has("ArrowRight")) {
    entity.velocity.x < 0 ? (entity.velocity.x = 0) : null;
    entity.velocity.x <= 10
      ? (entity.velocity.x += entity.velocity.scaleX)
      : null;
  }

  if (state.has("ArrowLeft")) {
    entity.velocity.x > 0 ? (entity.velocity.x = 0) : null;
    entity.velocity.x >= -10
      ? (entity.velocity.x -= entity.velocity.scaleX)
      : null;
  }

  if (
    state.has("ArrowLeft") &&
    entity.position.x - entity.velocity.scaleX > 0 &&
    Math.abs(entity.velocity.x) < 6
  )
    entity.velocity.x -= entity.velocity.scaleX;
  if (
    state.has("ArrowRight") &&
    canvas.width > entity.position.x + entity.velocity.scaleX &&
    Math.abs(entity.velocity.x) < 6
  )
    entity.velocity.x += entity.velocity.scaleX;
});
