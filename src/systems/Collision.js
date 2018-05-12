import { EntitySystem } from "./EntitySystem";

function colliding(a, b) {
  return (
    a.position.x < b.position.x + b.size.width &&
    a.position.x + a.size.width > b.position.x &&
    a.position.y < b.position.y + b.size.height &&
    a.size.height + a.position.y > b.position.y &&
    a.id != b.id
  );
}

const Collusion = new EntitySystem(({ entity, list, canvas }) => {
  let collisions = list.filter(b => colliding(entity, b));

  for (let i = 0; i < collisions.length; i++) {}
});
