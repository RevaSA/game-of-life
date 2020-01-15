class Field {
    constructor(ctx, settings) {
        this.ctx = ctx;
        this.cursor = null;
        this.cells = [];
        this.updateSettings(settings);
        requestAnimationFrame(this.loop.bind(this));
    }

    updateSettings(settings) {
        const defaultSettings = {
            size: {
                cell: 50
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
        this.countCol = Math.floor(width / this.settings.size.cell);
        this.countRow = Math.floor(height / this.settings.size.cell);
        this.w = this.countCol * this.settings.size.cell;
        this.h = this.countRow * this.settings.size.cell;
        this.x = Math.floor((width - this.w) / 2);
        this.y = Math.floor((height - this.h) / 2);
        this.updateCells();
    }

    updateCells() {
        this.cells = Array(this.countRow)
            .fill(null)
            .map(row => Array(this.countCol).fill(0));

        console.log(this.cells)
    }

    updateCursorPosition(cursor) {
        this.cursor = cursor;
    }

    loop() {
        this.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
                this.drawCell(i, j, 'active');
            });
        });

        this.drawHoverCell();
        requestAnimationFrame(this.loop.bind(this));
    }

    drawCell(i, j, color = 'default') {
        const ctx = this.ctx;
        const size = this.settings.size.cell;
        const x = this.x + j * size;
        const y = this.y + i * size;

        ctx.strokeStyle = this.settings.color.border;
        ctx.fillStyle = this.settings.color[color];
        ctx.fillRect(x, y, size, size);

        if (size > 10) {
            ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
        }
    }

    drawHoverCell() {
        if (!this.cursor) {
            return;
        }

        const x = Math.max(Math.min(this.cursor.x - this.x, this.w), 0);
        const y = Math.max(Math.min(this.cursor.y - this.y, this.h), 0);
        const i = Math.floor(Math.max(y - 1, 0) / this.settings.size.cell);
        const j = Math.floor(Math.max(x - 1, 0) / this.settings.size.cell);

        this.drawCell(i, j, 'hover');
    }
}


export default Field;
