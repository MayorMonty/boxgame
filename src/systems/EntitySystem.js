import { System } from "./System";
import { Entity } from "../entities";

export class EntitySystem extends System {
  constructor(action) {
    super(passed => Entity.list.map(entity => action({ entity, ...passed })));
  }
}
