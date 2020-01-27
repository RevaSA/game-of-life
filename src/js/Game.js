import Field from './Field';

class Game {
    constructor(options) {
        this.cache(options);
        this.events();
        this.resize();
        requestAnimationFrame(this.loop.bind(this));
    }

    cache(options) {
        this.canvas = document.querySelector(options.selector);
        this.ctx = this.canvas.getContext('2d');
        this.field = new Field(this.ctx);
    }

    events() {
        window.addEventListener('resize', this.resize.bind(this));
        document.addEventListener('mouseup', this.mouseUp.bind(this));
        this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
    }

    resize() {
        this.w = this.canvas.clientWidth;
        this.h = this.canvas.clientHeight;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.field.updateSizes(this.w, this.h);
    }

    mouseUp(ev) {
        if (ev.which === 1) {
            this.field.toggleDragging();
        }
    }

    mouseDown(ev) {
        if (ev.which === 1) {
            this.field.toggleDragging();
            this.mouseMove(ev);
        }
    }

    mouseMove(ev) {
        this.field.updateCursor({
            x: ev.clientX,
            y: ev.clientY
        });
    }

    step() {
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.field.update();
    }

    loop() {
        this.step();
        requestAnimationFrame(this.loop.bind(this));
    }
}

export default Game;
