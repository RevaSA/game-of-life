class UpdateTime {
    constructor(settings) {
        this.elems = document.querySelectorAll(settings.selector);
        this.updateTime();
        setInterval(this.updateTime.bind(this), 1000);
    }

    updateTime() {
        const time = this.getCurrentTime();

        this.elems.forEach(el => {
            el.innerText = time;
        });
    }

    getCurrentTime() {
        const date = new Date();

        return [date.getHours(), date.getMinutes(), date.getSeconds()]
            .map(num => String(num < 10 ? '0' + num : num ))
            .join(':');
    }
}

export default UpdateTime;
