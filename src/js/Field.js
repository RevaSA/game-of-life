class Field {
    constructor(ctx, settings) {
        this.ctx = ctx;
        this.cells = [];
        this.updateSettings(settings);
    }

    updateSettings(settings) {
        const defaultSettings = {
            size: {
                cell: 50,
                cellWithBorder: 20,
                border: 2
            },
            color: {
                default: 'black',
                hover: 'rebeccapurple',
                active: 'firebrick',
                border: 'white',
            }
        };

        this.settings = Object.assign(this.settings ? this.settings : defaultSettings, settings);
    }

    updateSize(width, height) {
        const sizeCell = this.settings.size.cell;

        this.countCol = Math.floor(width / sizeCell);
        this.countRow = Math.floor(height / sizeCell);
        this.w = this.countCol * sizeCell;
        this.h = this.countRow * sizeCell;
        this.x = Math.floor((width - this.w) / 2);
        this.y = Math.floor((height - this.h) / 2);
        this.updateCells();
    }

    updateCells() {
        this.cells = Array(this.countRow)
            .fill(null)
            .map(row => Array(this.countCol).fill(0));
    }

    draw() {
        this.drawCells();
        this.drawBorders();
    }

    drawCells() {
        this.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
                this.drawCell(i, j, this.settings.color.active);
            });
        });
    }

    drawBorders() {
        let i, j, x, y;

        if (this.settings.size.cell < this.settings.size.cellWithBorder) {
            return;
        }

        for (i = 0; i <= this.countRow; i ++) {
            y = this.y + i * this.settings.size.cell;
            this.drawLine(this.x, y, this.x + this.w, y);
        }

        for (j = 0; j <= this.countCol; j ++) {
            x = this.x + j * this.settings.size.cell;
            this.drawLine(x, this.y, x, this.y + this.h);
        }
    }

    drawCell(i, j, color) {
        const ctx = this.ctx;
        const size = this.settings.size.cell;
        const x = this.x + j * size;
        const y = this.y + i * size;

        ctx.fillStyle = color || this.settings.color.default;
        ctx.fillRect(x, y, size, size);
    }

    drawLine(x1, y1, x2, y2) {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.strokeStyle = this.settings.color.border;
        ctx.lineWidth = this.settings.size.border;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

export default Field;
