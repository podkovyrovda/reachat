module.exports = class Palette {
  constructor() {
    this._baseColors = [];
    this._countOfColors = this.baseColors.length;
    this._defaultColor = '';
    this.usedColors = [];
  }

  getRandom() {
    if (this.countOfColors === 0) return this.defaultColor;

    const index = Math.floor(Math.random() * this.countOfColors);
    const color = this.baseColors[index];
    this.use(color, index);
    return color;
  }

  use(color, index) {
    this.usedColors.push(color);
    this.baseColors.splice(index, 1);
    this.countOfColors = this.baseColors.length;
  }

  resetColor(color) {
    this.removeFromUsedColors(color);
    this.returnToBaseColors(color);
    this.countOfColors = this.baseColors.length;
  }

  removeFromUsedColors(color) {
    const index = this.usedColors.findIndex((c) => c === color);
    this.usedColors.splice(index, 1);
  }

  returnToBaseColors(color) {
    this.baseColors.push(color)
  }

  get baseColors() {
    return this._baseColors;
  }

  set baseColors(colors) {
    this._baseColors = colors;
    this.countOfColors = colors.length;
  }

  get defaultColor() {
    return this._defaultColor;
  }

  set defaultColor(color) {
    this._defaultColor = color;
  }

  get countOfColors() {
    return this._countOfColors;
  }

  set countOfColors(count) {
    this._countOfColors = count
  }
};