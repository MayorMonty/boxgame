export class Entity {
  children = [];
  constructor(components) {
    this.id = `${Math.random() * performance.now()}`;
    Object.assign(this, components);
    Entity.list.push(this);
  }
}

Entity.list = [];

Entity.delete = function(index) {
  Entity.list.splice(index, 1);
};
