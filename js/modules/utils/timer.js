class Timer  {
    constructor(div) {
        this.display = div
        this.interval = null
        this.minutes = 0
        this.seconds = 0
        this._totalSeconds = 0
    }

    set totalSeconds(value) {
        this._totalSeconds = value
    }
    get totalSeconds() {
        return this._totalSeconds 
    }

    start() {
        this.interval = setInterval(() => {
            
            this.minutes = this.seconds == 59? this.minutes + 1 : this.minutes
            this.seconds = this.seconds == 59? 0 : this.seconds + 1
            this.totalSeconds = this.minutes * 60 + this.seconds;
            
            this.display.innerHTML = this.minutes + ':' + ((this.seconds < 10) ? '0' + this.seconds : this.seconds)

        },1000)
    }

    stop() {
        clearInterval(this.interval)
    }
}