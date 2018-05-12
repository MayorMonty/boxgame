import { EntitySystem } from "./EntitySystem";
import { Ray, Entity, Enemy } from "../entities";

function colliding(a, b) {
  return (
    a.position.x < b.position.x + b.size.width &&
    a.position.x + a.size.width > b.position.x &&
    a.position.y < b.position.y + b.size.height &&
    a.size.height + a.position.y > b.position.y &&
    a.id != b.id
  );
}

const Collusion = new EntitySystem(({ entity, index, list, canvas }) => {
  let collisions = Entity.list.filter(b => colliding(entity, b));

  // Since rays don't have AI, we'll handle their collision logic here
  if (collisions.length > 0 && entity.type == "ray") Entity.delete(index);

  // Otherwise, pass it of to the controllers
  entity.collisions = collisions;
});
