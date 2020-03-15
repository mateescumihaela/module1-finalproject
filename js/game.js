class Game {
    constructor (page, ctx, canvas, wordList, input) {
        this.page = page;
        this.ctx = ctx;
        this.canvas = canvas;
        this.wordList = wordList;
        this.input = input;

        this.player = new Player (ctx, canvas);
        this.dictionary = new Dictionary ();

        this.cars = {};
        this.carsCount = 0;
        this.counter = 0;
        this.alive = true;
        this.inputTimer = 0;
        this.typeStart = 0;
        this.typeEnd = 0;

        this.drawMenuBackground = this.drawMenuBackground.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.handleCars = this.handleCars.bind(this);
        this.startGame = this.startGame.bind(this);
        this.render = this.render.bind(this);
        this.gameOver = this.gameOver.bind(this);

    }

drawMenuBackground() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, canvas.width, canvas.height);
    this.ctx.fillStyle = "rgba (0, 0 ,0, 0.8)";
    this.ctx.fill();
    this.ctx.closePath();
}

resetGame() {
    this.cars = {};
    this.carsCount = 0;
    this.counter = 0;
    this.round = 1;
    this.alive = true;
    this.player.avoidedCollissionCount = 0;
}

startTimer(e) {
if (this.typeStart === 0 && e.target.value != " ") {
    this.typeStart = Date.now();
}
}


handleCars(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      let value = this.input.value.trim();
      for (let car in this.cars) {
        if (value === this.cars[car].word) {
          this.attackTimer = this.counter;
          this.player.attack = true;
          this.player.killCount += 1;
          this.cars[car].word = null;
          this.cars[car].alive = false;
          break;
        }
      }
      this.input.value = "";
      if (this.typeStart > 0) {
        this.typeEnd = Date.now();
        this.inputTimer += (this.typeEnd - this.typeStart)/1000;
      }
      this.typeStart = 0;
    } 
  }

startGame(e) {
    if (e.keyCode === 13 || e.button === 0) {
        this.canvas.removeEventListener('click', this.startGame);
        this.page.removeEventListener('click', this.startGame);
        this.resetGame;
        clearInterval(window.setInterval);
        clearInterval(window.overInterval);
        this.canvas.className = "game-screen";
        requestAnimationFrame(this.render)
        this.input.disabled = false;
        this.input.style.display = "block";
        this.input.focus();

        }

        }

// render() {
//     let request = requestAnimationFrame(this.render);
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     this.canvas.addEventListener('click', this.input.focus());
//     this.input.addEventListener('keydown', this.handleCar);
//     this.input.addEventListener('input', this.startTimer);    

    
}

