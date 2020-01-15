import Field from './Field';

class Game {
    constructor(settings) {
        this.cache(settings);
        this.events();
        this.onResize();
    }

    cache(settings) {
        const defaultSettings = {
            size: {
                cell: 50
            },
            color: {
                default: '#000',
                active: 'firebrick',
                border: 'white',
            }
        };

        this.settings = Object.assign({}, defaultSettings, settings);
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
}

export default Game
