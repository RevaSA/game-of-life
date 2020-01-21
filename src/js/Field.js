import Cell from "./Cell";

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
        this.updateCells();
    }

    updateCells() {
        this.cells = [];

        for (let i = 0; i < this.countRow; i++) {
            this.cells.push([]);

            for (let j = 0; j < this.countCol; j++) {
                const x = this.x + j * this.settings.size.cell;
                const y = this.y + i * this.settings.size.cell;

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

    draw() {
        this.drawCells();
        this.drawBorders();
    }

    drawCells() {
        this.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
                this.cells[i][j].draw();
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
