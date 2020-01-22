import settings from './settings';
import Field from './Field';

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
        this.field.updateSizes(this.w, this.h);
    }

    loop() {
        this.field.draw();
        requestAnimationFrame(this.loop.bind(this));
    }
}

export default Game;
