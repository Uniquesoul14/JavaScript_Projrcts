class Stopwatch {
    constructor(displaySelector) {
      this.startTime = 0;
      this.elapsed = 0;
      this.interval = null;
      this.$display = $(displaySelector);
    }
  
    formatTime(ms) {
      let milliseconds = Math.floor((ms % 1000) / 10);
      let seconds = Math.floor((ms / 1000) % 60);
      let minutes = Math.floor((ms / (1000 * 60)) % 60);
  
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    }
  
    updateDisplay() {
      this.$display.text(this.formatTime(this.elapsed));
    }
  
    start() {
      if (this.interval) return;
  
      this.startTime = Date.now() - this.elapsed;
  
      this.interval = setInterval(() => {
        this.elapsed = Date.now() - this.startTime;
        this.updateDisplay();
      }, 10);
    }
  
    stop() {
      clearInterval(this.interval);
      this.interval = null;
    }
  
    reset() {
      this.stop();
      this.elapsed = 0;
      this.updateDisplay();
    }
  }
  
  $(document).ready(function () {
    const stopwatch = new Stopwatch('.display');
  
    $('#start').on('click', () => stopwatch.start());
    $('#stop').on('click', () => stopwatch.stop());
    $('#reset').on('click', () => stopwatch.reset());
  });
  