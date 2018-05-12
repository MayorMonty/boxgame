export class System {
  constructor(action) {
    if (typeof action != "function")
      throw new TypeError("Action must be a function");
    this.action = action;
    System.list.push(this);
  }
  tick(passed) {
    return this.action.bind(this)(passed);
  }
}

System.list = [];
System.tick = function tick(passed) {
  return System.list.map(sys => sys.tick(passed));
};
