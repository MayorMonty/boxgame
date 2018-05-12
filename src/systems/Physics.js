import { EntitySystem } from "./EntitySystem";
import { Entity } from "../entities";

const Physics = new EntitySystem(({ entity, index, canvas }) => {
  // Apply the velocity
  entity.position.x += entity.velocity.x * entity.velocity.scaleX;
  entity.position.y += entity.velocity.y * entity.velocity.scaleY;

  if (entity.position.x < 0) entity.position.x = canvas.width;
  if (entity.position.x > canvas.width) entity.position.x = 0;

  // Reduce the velocity
  entity.velocity.x =
    Math.sign(entity.velocity.x) *
    (Math.abs(entity.velocity.x) - entity.velocity.frictionX);

  if (Math.abs(entity.velocity.x) < entity.velocity.frictionX / 2)
    entity.velocity.x = 0;

  entity.velocity.y =
    Math.sign(entity.velocity.y) *
    (Math.abs(entity.velocity.y) - entity.velocity.frictionY);

  if (Math.abs(entity.velocity.y) < entity.velocity.frictionY / 2)
    entity.velocity.y = 0;
});
