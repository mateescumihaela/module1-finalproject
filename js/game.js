class Game {
  constructor (ctx) {
    this.ctx = ctx;
    this.growRate = undefined;
    this.newShapeInterval = undefined;
    
    this.currentShape = undefined;
    this.firstKeyPressed = undefined;
    this.lettersTyped = [];
    this.correctLettersTyped = [];
    this.incorrectLettersTyped = [];

    this.wordComplete = this.wordComplete.bind(this);
    this.registerListeners();
  }
  
  registerListeners () {
    // register event listeners on buttons
    const gameButtons = document.getElementsByClassName('game-buttons');
    for (let i = 0; i < gameButtons.length; i++) {
      if (gameButtons[i].id === 'easy-button') {  
        gameButtons[i].addEventListener('click', () => {
          for (let j = 0; j < gameButtons.length; j++) {
            gameButtons[j].className += " hidden";
          }
          this.growRate = 0.6;
          this.newShapeInterval = 1.75;
          this.start();
        });
      }
      if (gameButtons[i].id === 'medium-button') {
        gameButtons[i].addEventListener('click', () => {
          for (let j = 0; j < gameButtons.length; j++) {
            gameButtons[j].className += " hidden";
          }
          this.growRate = 0.85;
          this.newShapeInterval = 1.35;
          this.start();
        });
      }
      if (gameButtons[i].id === 'hard-button') {
        gameButtons[i].addEventListener('click', () => {
          for (let j = 0; j < gameButtons.length; j++) {
            gameButtons[j].className += " hidden";
          }
          this.growRate = 1.5;
          this.newShapeInterval = 0.8;
          this.start();
        });
      }
      if (gameButtons[i].id === 'restart-button') {
        gameButtons[i].addEventListener('click', () => {
          for (let j = 0; j < gameButtons.length; j++) {
            gameButtons[j].className += " hidden";
          }
          this.resetGame();
        });
      }
    }
    // register keypress listener
    document.addEventListener('keypress', event => this.ingameKeyListener(event));
  }
  
  pregame () {
    this.board = new Board(this.ctx, 1);
    this.board.drawPregame();
    //if (this.mute) this.board.mute = true;
    document.getElementById('easy-button').className = "game-buttons";
    document.getElementById('medium-button').className = "game-buttons";
    document.getElementById('hard-button').className = "game-buttons";
  }
  
  start () {
    // draw initial shapes & background when game starts
    this.board.drawShapes();
    this.board.drawGUI();

    // add shapes as game progresses
    this.shapeInterval = setInterval(() => {
      this.board.addShape();
    }, this.newShapeInterval * 1000);
    this.animate();
  }

  // toggleSound () {
  //   if (!this.mute) {
  //     document.getElementById('bg-music').volume = 0;
  //     document.getElementById('mute-button').className = "";
  //     document.getElementById('unmute-button').className = "hidden";
  //   } else {
  //     document.getElementById('bg-music').volume = 0.05;
  //     document.getElementById('mute-button').className = "hidden";
  //     document.getElementById('unmute-button').className = "";
  //   }
  //   this.mute = !this.mute;
  //   this.board.mute = !this.board.mute;
  // }

  animate () {
    if (this.gameOver()) {
      this.board.calculateAccuracy(this.lettersTyped, this.incorrectLettersTyped);
      this.board.drawGameOver();
      document.getElementById('restart-button').className = "game-buttons";
    } 

    else if (this.changeLevels()) {
      this.board.calculateAccuracy(this.lettersTyped, this.incorrectLettersTyped);
      this.board.drawNextLevel();
      document.getElementById('restart-button').className = "game-button";
    }
    
    else {
      this.board.shapes.forEach(shape => shape.grow(this.growRate));
      this.board.drawBackground();
      this.board.drawShapes(this.currentShape, this.correctLettersTyped);
      this.board.drawGUI();
      this.shapeAlreadyPopped(this.currentShape);
      this.wordComplete();
      //this.board.drawPointAnimation();
  
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  ingameKeyListener (event) {
    //console.log(event.target.value);
    // log every letter that is being typed
    const key = event.key;
    //console.log(event.key);
    this.lettersTyped.push(key);

    if (this.currentShape === undefined) {
      this.firstKeyPressed = key;
      this.selectCurrentWord();
    }
    if (this.matchesCurrentWord(this.correctLettersTyped, key)) {
      this.correctLettersTyped.push(key);
    } else { this.incorrectLettersTyped.push(key); }
  }


  selectCurrentWord () {
    this.board.shapes.forEach(shape => {
      if (this.firstKeyPressed === shape.word[0]) {
        this.currentShape = shape;
      }
    });
  }

  shapeAlreadyPopped (shape) {
    if (this.currentShape && !this.board.shapes.includes(shape)) {
      this.currentShape = undefined;
      this.correctLettersTyped = [];
    }
  }

  matchesCurrentWord (correctLetters, keyPress) {
    if (this.currentShape) {
      const idxToCheck = correctLetters.length;
      const wordLetters = this.currentShape.word.split("");
      console.log(idxToCheck);
      //console.log(correctLetters);
      //correctLettersTyped++;
      //console.log(wordLetters);
      if (keyPress === wordLetters[idxToCheck]) {
        return true;
      } else { return false; }
    }
  }

  wordComplete () {
    if (this.correctLettersTyped.length > 0 && this.correctLettersTyped.join("") === this.currentShape.word) {
      this.board.score += 1;
      }
      this.board.calculateAccuracy(this.lettersTyped, this.incorrectLettersTyped);
      this.correctLettersTyped = [];
      this.firstKeyPressed = undefined;
      const currentShapeIdx = this.board.shapes.indexOf(this.currentShape);
      this.board.completedShapes.push(this.currentShape);
      this.board.removeShape(this.currentShape, currentShapeIdx);
      this.currentShape = undefined;
    }
  

  gameOver() {
    if (this.board.poppedShapes.length === 10) {
      return true;
    }
  }

  changeLevels() {
    if (this.board.score === 10) {
      return true;
    }
  }

  resetGame () {
    clearInterval(this.shapeInterval);
    document.getElementById('restart-button').className = 'hidden';
    this.currentShape = undefined;
    this.firstKeyPressed = undefined;
    this.lettersTyped = [];
    this.correctLettersTyped = [];
    this.incorrectLettersTyped = [];
    this.pregame();
  }
}