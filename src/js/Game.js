import settings from './settings';
import Field from './Field';
import Cell from './Cell';

class Game {
    constructor(options) {
        this.cache(options);
        this.events();
        this.onResize();
        requestAnimationFrame(this.loop.bind(this));
    }

    cache(options) {
        this.canvas = document.querySelector(options.selector);
        this.ctx = this.canvas.getContext('2d');
        this.field = new Field(this.ctx);
    }

    events() {
        window.addEventListener('resize', this.onResize.bind(this));
    }

    onResize() {
        this.w = this.canvas.clientWidth;
        this.h = this.canvas.clientHeight;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.field.updateSize(this.w, this.h);
        this.updateCells();
    }

    updateCells() {
        this.cells = [];

        for (let i = 0; i < this.field.countRow; i++) {
            this.cells.push([]);

            for (let j = 0; j < this.field.countCol; j++) {
                const x = this.field.x + j * settings.size.cell;
                const y = this.field.y + i * settings.size.cell;

                this.cells[i].push(new Cell(this.ctx, x, y, i, j));
            }
        }

        for (let i = 0; i < this.field.countRow; i++) {
            for (let j = 0; j < this.field.countCol; j++) {
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

                row = row < 0 ? this.field.countRow - 1 : row >= this.field.countRow ? 0 : row;
                col = col < 0 ? this.field.countCol - 1 : col >= this.field.countCol ? 0 : col;
                neighbors.push(this.cells[row][col]);
            }
        }

        return neighbors;
    }

    drawCells() {
        for (let i = 0; i < this.field.countRow; i++) {
            for (let j = 0; j < this.field.countCol; j++) {
                this.cells[i][j].draw();
            }
        }
    }

    loop() {
        this.drawCells();
        this.field.draw();
        requestAnimationFrame(this.loop.bind(this));
    }
}

export default Game;
