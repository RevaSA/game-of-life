import settings from './settings';

class Cell {
    constructor(ctx, row, col, x, y) {
        this.ctx = ctx;
        this.row = row;
        this.col = col;
        this.x = x;
        this.y = y;
        this.isAlive = Math.random() <= settings.probabilityLife;
        this.wasAlive = this.isAlive;
        this.neighbors = [];
    }

    update() {
        const countAliveNeighbors = this.neighbors.reduce((count, cell) => cell.wasAlive ? count + 1 : count, 0);
        let isAlive = false;

        if (
            this.wasAlive && (countAliveNeighbors === 2 || countAliveNeighbors === 3)
            || !this.wasAlive && countAliveNeighbors === 3
        ) {
            isAlive = true;
        }

        this.isAlive = isAlive;
    }

    updatePrevious() {
        this.wasAlive = this.isAlive;
    }

    draw() {
        if (!this.isAlive) {
            return
        }

        this.ctx.fillStyle = settings.color.cell;
        this.ctx.fillRect(this.x, this.y, settings.size.cell, settings.size.cell);
    }
}

export default Cell;
