import { EntitySystem } from "./EntitySystem";

const Physics = new EntitySystem(({ entity }) => {
  // Apply the velocity
  entity.position.x += entity.velocity.x * entity.velocity.scaleX;
  entity.position.y += entity.velocity.y * entity.velocity.scaleY;

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
