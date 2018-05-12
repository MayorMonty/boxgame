export class Entity {
  children = [];
  constructor(components) {
    Object.assign(this, components);
    Entity.list.push(this);
  }
}

Entity.list = [];
