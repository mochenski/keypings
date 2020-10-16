class timer  {
    constructor(div) {
        this.display = div
        this.interval = null
        this._totalSeconds = 0
    }

    set totalSeconds(value) {
        this._totalSeconds = value
    }
    get totalSeconds() {
        return this._totalSeconds 
    }

    start(initialTime) {
        this.totalSeconds = initialTime
        this.interval = setInterval(() => {
            
            let minutes = (this.totalSeconds - (this.totalSeconds % 60)) * 60
            let seconds = this.totalSeconds - (minutes * 60)
            this.totalSeconds++
            
            this.display.innerHTML = minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds)

        },1000)
    }

    stop() {
        clearInterval(this.interval)
    }
}

export default timer