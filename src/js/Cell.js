import settings from './settings';

class Cell {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.alive = Math.random() < 0.1;
        this.color = settings.color[this.alive ? 'alive' : 'dead'];
        this.neighbors = [];
    }

    setNeighbors(neighbors) {
        this.neighbors = neighbors;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, settings.size.cell, settings.size.cell);
    }
}

export default Cell;
