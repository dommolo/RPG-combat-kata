class Positioned {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceFrom(p) {
    return Math.sqrt((this.x - p.x) ** 2 + (this.y - p.y) ** 2);
  }
}

module.exports = {
  Positioned: Positioned
};