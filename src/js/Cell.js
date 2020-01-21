class Cell {
    constructor(ctx, globalSettings, x, y) {
        this.ctx = ctx;
        this.globalSettings = globalSettings;
        this.x = x;
        this.y = y;
        this.alive = Math.random() < 0.1;
        this.color = this.globalSettings.color[this.alive ? 'alive' : 'dead'];
        this.neighbors = [];
    }

    setNeighbors(neighbors) {
        this.neighbors = neighbors;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.globalSettings.size.cell, this.globalSettings.size.cell);
    }
}

export default Cell;
