import { EntitySystem } from "./EntitySystem";
import { Entity } from "../entities";

const Physics = new EntitySystem(({ entity, index, canvas }) => {
  // Apply the velocity
  entity.position.x += entity.velocity.x * entity.velocity.scaleX;
  entity.position.y += entity.velocity.y * entity.velocity.scaleY;

  if (entity.position.y < 0 || entity.position.y > canvas.height)
    delete Entity.list[index];

  if (entity.position.x < 0 || entity.position.x > canvas.width)
    delete Entity.list[index];

  // Reduce the velocity
  entity.velocity.x =
    Math.sign(entity.velocity.x) *
    (Math.abs(entity.velocity.x) - entity.velocity.frictionX);

  if (Math.abs(entity.velocity.x) < 1) entity.velocity.x = 0;

  entity.velocity.y =
    Math.sign(entity.velocity.y) *
    (Math.abs(entity.velocity.y) - entity.velocity.frictionY);

  if (Math.abs(entity.velocity.y) < 1) entity.velocity.y = 0;
});
