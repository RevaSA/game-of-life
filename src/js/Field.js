class Field {
    constructor(ctx) {
        this.settings = {
            size: {
                cell: 50,
                cellWithBorder: 20,
                border: 2
            },
            color: {
                border: 'white',
            }
        };

        this.ctx = ctx;
        this.cells = [];
    }

    updateSize(width, height) {
        const sizeCell = this.settings.size.cell;

        this.countCol = Math.floor(width / sizeCell);
        this.countRow = Math.floor(height / sizeCell);
        this.w = this.countCol * sizeCell;
        this.h = this.countRow * sizeCell;
        this.x = Math.floor((width - this.w) / 2);
        this.y = Math.floor((height - this.h) / 2);
    }

    draw() {
        this.drawBorders();
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
