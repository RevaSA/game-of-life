class Field {
    constructor(ctx, globalSettings) {
        this.ctx = ctx;
        this.globalSettings = globalSettings;
    }

    updateSize(width, height) {
        const sizeCell = this.globalSettings.size.cell;

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

        if (this.globalSettings.size.cell < this.globalSettings.size.cellWithBorder) {
            return;
        }

        for (i = 0; i <= this.countRow; i ++) {
            y = this.y + i * this.globalSettings.size.cell;
            this.drawLine(this.x, y, this.x + this.w, y);
        }

        for (j = 0; j <= this.countCol; j ++) {
            x = this.x + j * this.globalSettings.size.cell;
            this.drawLine(x, this.y, x, this.y + this.h);
        }
    }

    drawLine(x1, y1, x2, y2) {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.strokeStyle = this.globalSettings.color.border;
        ctx.lineWidth = this.globalSettings.size.border;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

export default Field;
