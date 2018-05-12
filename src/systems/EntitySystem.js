import { System } from "./System";
import { Entity } from "../entities";

export class EntitySystem extends System {
  constructor(action) {
    super(passed =>
      Entity.list.map((entity, index, list) =>
        action({ entity, index, list, ...passed })
      )
    );
  }
}
