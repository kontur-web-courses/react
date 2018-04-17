export default class Timer {
  constructor() {
    this.tickInterval = null;
    this.handlers = [];
  }

  addUpdated(handler) {
    this.handlers.push(handler);
    if (!this.tickInterval) {
      this.tickInterval = setInterval(() => {
        const currentTime = new Date();
        for (const handler of this.handlers) {
          handler(currentTime);
        }
      }, 1000);
    }
  }

  removeUpdated(handler) {
    this.handlers = this.handlers.filter(h => h !== handler);
    if (this.handlers.length === 0 && this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  }
}