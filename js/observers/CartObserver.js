export class CartObserver {
  constructor() {
    this.observers = { INIT: [], EVENTS: [] };
  }

  subsecribe(eventType, fn) {
    if (this.observers[eventType]) this.observers[eventType].push(fn);
  }

  notify(eventType, data) {
    this.observers[eventType].forEach((observer) => observer(data));
  }
}
