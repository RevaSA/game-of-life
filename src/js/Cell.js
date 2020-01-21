class Cell {
    constructor(ctx, x, y) {
        this.settings = {
            size: 50,
            color: {
                dead: 'black',
                alive: 'firebrick',
            }
        };

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.alive = Math.random() < 0.1;
        this.color = this.settings.color[this.alive ? 'alive' : 'dead'];
        this.neighbors = [];
    }

    setNeighbors(neighbors) {
        this.neighbors = neighbors;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.settings.size, this.settings.size);
    }
}

export default Cell;
