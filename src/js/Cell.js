import settings from './settings';

class Cell {
    constructor(ctx, row, col, x, y) {
        this.ctx = ctx;
        this.row = row;
        this.col = col;
        this.x = x;
        this.y = y;
        this.isAlive = Math.random() <= settings.probabilityLife;
        this.wasAlive =  this.isAlive;
        this.neighbors = [];
    }

    get color() {
        return settings.color[this.isAlive ? 'alive' : 'dead'];
    }

    updatePrevious() {
        this.wasAlive = this.isAlive;
    }

    update() {
        const countAliveNeighbors = this.neighbors.reduce((count, cell) => {
            return cell.wasAlive ? count + 1 : count;
        }, 0);
        let isAlive = false;

        if (
            this.wasAlive && (countAliveNeighbors === 2 || countAliveNeighbors === 3)
            || !this.wasAlive && countAliveNeighbors === 3
        ) {
            isAlive = true;
        }

        this.isAlive = isAlive;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, settings.size.cell, settings.size.cell);
    }
}

export default Cell;
