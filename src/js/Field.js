import settings from './settings';

class Field {
    constructor(ctx) {
        this.ctx = ctx;
    }

    updateSize(width, height) {
        this.countCol = Math.floor(width / settings.size.cell);
        this.countRow = Math.floor(height / settings.size.cell);
        this.w = this.countCol * settings.size.cell;
        this.h = this.countRow * settings.size.cell;
        this.x = Math.floor((width - this.w) / 2);
        this.y = Math.floor((height - this.h) / 2);
    }

    draw() {
        this.drawBorders();
    }

    drawBorders() {
        let i, j, x, y;

        if (settings.size.cell < settings.size.cellWithBorder) {
            return;
        }

        for (i = 0; i <= this.countRow; i ++) {
            y = this.y + i * settings.size.cell;
            this.drawLine(this.x, y, this.x + this.w, y);
        }

        for (j = 0; j <= this.countCol; j ++) {
            x = this.x + j * settings.size.cell;
            this.drawLine(x, this.y, x, this.y + this.h);
        }
    }

    drawLine(x1, y1, x2, y2) {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.strokeStyle = settings.color.border;
        ctx.lineWidth = settings.size.border;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

export default Field;
