import settings from './settings';
import Cell from './Cell';

class Field {
    constructor(ctx) {
        this.ctx = ctx;
    }

    updateSizes(width, height) {
        this.countCol = Math.floor(width / settings.size.cell);
        this.countRow = Math.floor(height / settings.size.cell);
        this.w = this.countCol * settings.size.cell;
        this.h = this.countRow * settings.size.cell;
        this.x = Math.floor((width - this.w) / 2);
        this.y = Math.floor((height - this.h) / 2);
        this.updateCells();
    }

    updateCells() {
        this.cells = [];

        for (let i = 0; i < this.countRow; i++) {
            this.cells.push([]);

            for (let j = 0; j < this.countCol; j++) {
                const x = this.x + j * settings.size.cell;
                const y = this.y + i * settings.size.cell;

                this.cells[i].push(new Cell(this.ctx, x, y, i, j));
            }
        }

        for (let i = 0; i < this.countRow; i++) {
            for (let j = 0; j < this.countCol; j++) {
                this.cells[i][j].setNeighbors(this.getNeighbors(i, j))
            }
        }
    }

    getNeighbors(rowSource, colSource) {
        const neighbors = [];
        let i, j;

        for (i = -1; i <= 1; i++) {
            for (j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }

                let row = rowSource + i;
                let col = colSource + j;

                row = row < 0 ? this.countRow - 1 : row >= this.countRow ? 0 : row;
                col = col < 0 ? this.countCol - 1 : col >= this.countCol ? 0 : col;
                neighbors.push(this.cells[row][col]);
            }
        }

        return neighbors;
    }

    drawCells() {
        for (let i = 0; i < this.countRow; i++) {
            for (let j = 0; j < this.countCol; j++) {
                this.cells[i][j].draw();
            }
        }
    }

    draw() {
        this.drawCells();
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
