import settings from './settings';

class Cell {
    constructor(ctx, row, col, x, y) {
        this.ctx = ctx;
        this.row = row;
        this.col = col;
        this.x = x;
        this.y = y;
        this.isAlive = false;
        this.neighbors = [];
    }

    get color() {
        return settings.color[this.isAlive ? 'alive' : 'dead'];
    }

    toggle() {
        this.isAlive = !this.isAlive;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, settings.size.cell, settings.size.cell);
    }
}

export default Cell;
