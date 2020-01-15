import Field from './Field';

class Game {
    constructor(settings) {
        this.cache(settings);
        this.events();
        this.onResize();
        requestAnimationFrame(this.loop.bind(this));
    }

    cache(settings) {
        this.settings = Object.assign({}, settings);
        this.canvas = document.querySelector(this.settings.selector);
        this.ctx = this.canvas.getContext('2d');
        this.field = new Field(this.ctx);
    }

    events() {
        window.addEventListener('resize', this.onResize.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onResize() {
        this.w = this.canvas.clientWidth;
        this.h = this.canvas.clientHeight;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.field.updateSize(this.w, this.h);
    }

    onMouseMove(ev) {
        this.field.updateCursorPosition({
            x: ev.clientX,
            y: ev.clientY
        });
    }

    loop() {
        this.field.draw();
        requestAnimationFrame(this.loop.bind(this));
    }
}

export default Game;
