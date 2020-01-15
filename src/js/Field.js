class Field {
    constructor(ctx, settings) {
        this.ctx = ctx;
        this.cells = [];
        this.updateSettings(settings);
    }

    updateSettings(settings) {
        const defaultSettings = {
            size: {
                cell: 50
            },
            color: {
                active: 'firebrick',
                border: 'white',
            }
        };

        this.settings = Object.assign(this.settings ? this.settings : defaultSettings, settings);
    }

    updateSize(width, height) {
        this.countCol = Math.floor(width / this.settings.size.cell);
        this.countRow = Math.floor(height / this.settings.size.cell);
        this.w = this.countCol * this.settings.size.cell;
        this.h = this.countRow * this.settings.size.cell;
        this.x = Math.floor((width - this.w) / 2);
        this.y = Math.floor((height - this.h) / 2);
        this.updateCells();
        this.draw();
    }

    updateCells() {
        this.cells = Array(this.countRow)
            .fill(null)
            .map(row => Array(this.countCol).fill(0));

        console.log(this.cells)
    }

    draw() {
        this.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
                this.drawCell(i, j);
            });
        });
    }

    drawCell(i, j) {
        const ctx = this.ctx;
        const size = this.settings.size.cell;
        const x = this.x + j * size;
        const y = this.y + i * size;

        ctx.strokeStyle = this.settings.color.border;
        ctx.fillStyle = this.settings.color.active;
        ctx.fillRect(x, y, size, size);

        if (size > 10) {
            ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
        }
    }
}


export default Field;
