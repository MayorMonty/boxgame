import { EntitySystem } from "../EntitySystem";
import { Ray, Player, Entity } from "../../entities";

const EnemyController = new EntitySystem(({ entity, index, canvas }) => {
  if (entity.control !== "Enemy") return;

  entity.health -= entity.collisions.filter(col => col.type == "ray").length;
  if (entity.health <= 0) Entity.delete(index);

  entity.velocity.x = (Player.position.x - entity.position.x) / 200;
  entity.velocity.y = Math.min(
    (Player.position.x - entity.position.y) / 200,
    2
  );
});
