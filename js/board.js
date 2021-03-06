
class Board {
  constructor (ctx, numInitialShapes) {
    this.ctx = ctx;
    this.numInitialShapes = numInitialShapes;
    this.startTime = new Date();
    this.gradientValue = 350;
    this.gradientDirection = "increasing";
    
    this.shapes = [];
    this.addInitialShapes();

    this.score = 0;
    //this.accuracy = "";

    this.poppedShapes = [];
    this.completedShapes = [];
    this.pastWords = [];

    this.plusPosDelta = 1;
    this.minusPosDelta = 1;

    this.mute = false;
  }

  addShape() {
    const randomWidth = Math.floor(Math.random() * 150) + 90;
    const randomHeight = Math.floor(Math.random() * 150) + 50;
    const randomPosition = [
      90 + Math.random() * (window.innerWidth - 300),
      90 + Math.random() * (window.innerHeight - 300),
    ];
    const randomColor = Object.values(COLORS)[Math.floor(Math.random() * Object.values(COLORS).length)];
    const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    // function wordGenerator() {
    //   const randomIdx = Math.floor(Math.random() * this.randomWord.length)
    //   return this.randomWord[randomIdx]
    // } 
   

    this.shapes.unshift(new Shape({
      shapeType: randomShape,
      color: randomColor,
      pos: randomPosition,
      width: randomWidth,
      height: randomHeight,
      word: randomWord[0]
    }));
  }

  addInitialShapes() {
    for (let i = 0; i < this.numInitialShapes; i++) {
      this.addShape();
    }
  }

  pulseBackground () {
    if (this.gradientValue < 350 ) {
      this.gradientValue += 2;
      this.gradientDirection = 'increasing';
    } else if (this.gradientValue > 1200) {
      this.gradientValue -= 2;
      this.gradientDirection = 'decreasing';
    } else if (this.gradientDirection === 'increasing') {
      this.gradientValue += 2;
    } else if (this.gradientDirection === 'decreasing') {
      this.gradientValue -= 2;
    }
  }

  drawBackground () {
    this.pulseBackground();
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const gradient = this.ctx.createRadialGradient(window.innerWidth/2, window.innerHeight/2, 2, window.innerWidth/2 + 1, window.innerHeight/2 + 10, this.gradientValue);
    gradient.addColorStop(0, "#333333");
    gradient.addColorStop(1, "#191919");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }

  drawPregame () {
    // draw background image before drawing rest of pregame screen
    const img = document.getElementById('pregame-bg');
    this.ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);

    this.ctx.fillStyle = '#e1e1e1';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseLine = 'middle';
    this.ctx.font = '80px PT Mono';
    this.ctx.fillText(`alphaPop`, window.innerWidth / 2, 150);
    this.ctx.font = '25px PT Mono';
    this.ctx.font = '25px Menlo';
    this.ctx.fillText(`⏱️ Score as many points as you can`, window.innerWidth / 2, window.innerHeight / 2 - 140);
    this.ctx.fillText(`by typing the letters before the growing shape pops`, window.innerWidth / 2, window.innerHeight / 2 - 110);
    this.ctx.fillText(`💀 Game over after 2 missed shapes`, window.innerWidth / 2, window.innerHeight / 2 - 50);
    this.ctx.fillText(`💯 Move to the next level after 15 correct shapes`, window.innerWidth / 2, window.innerHeight / 2 - 20);
    this.ctx.fillText(`Select difficulty:`, window.innerWidth / 2, window.innerHeight / 2 + 60);
  }

  drawGameOver () {
    // draw background image
    const img = document.getElementById('pregame-bg');
    this.ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);

    this.ctx.fillStyle = '#e1e1e1';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseLine = 'middle';
    this.ctx.font = '50px PT Mono';

    this.ctx.fillText(`Game Over...`, window.innerWidth/2, 150);
    this.ctx.font = '20px PT Mono';

    this.ctx.fillText(`You completed ${this.score} words!`, window.innerWidth/2, window.innerHeight/2 + 20);
    //this.ctx.fillText(`Your final accuracy: ${this.accuracy}%`, window.innerWidth/2, window.innerHeight/2 + 50);
  }

  drawNextLevel () {
    const img = document.getElementById('pregame-bg');
    this.ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);

    this.ctx.fillStyle = '#e1e1e1';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseLine = 'middle';
    this.ctx.font = '80px PT Mono';

    this.ctx.fillText(`Well done! 👏`, window.innerWidth/2, 150);
    this.ctx.font = '40px PT Mono';

    this.ctx.fillText(`Your final score: ${this.score}`, window.innerWidth/2, window.innerHeight/2 - 70);
    //this.ctx.fillText(`Your final accuracy: ${this.accuracy}%`, window.innerWidth/2, window.innerHeight/2 - 30);
  }

  drawShapes(currentShape, typedLetters) {
    this.shapes.forEach((shape, idx) => {
      if (shape.height > 300 || shape.width > 400) {
        this.removeShape(shape, idx);
        //this.poppedShapes.push(shape);
        //console.log(this.poppedShapes);
        // if (!this.mute) {
        //   const loseLifeSound = document.getElementById('lose-life-sound');
        //   loseLifeSound.load();
        //   loseLifeSound.volume = 0.2;
        //   loseLifeSound.play();
        // }
      } else if (shape === currentShape) {
        shape.drawShape(this.ctx, typedLetters);
      } else {
        shape.drawShape(this.ctx);
      }
    });
  }

  removeShape(shape, shapeIdx) {
    this.shapes = this.shapes.slice(0, shapeIdx).concat(this.shapes.slice(shapeIdx + 1));
    this.pastWords.push(this.shapes);
  }

  // calculateAccuracy (keystrokes, wrongKeystrokes) {
  //   let count = 0;
  //   const allCorrectLetters = this.pastWords.join("").split("");
  //   let keystrokesArray = keystrokes.slice();

  //   for (let i = 0; i < allCorrectLetters.length; i++) {
  //     if (allCorrectLetters[i] !== keystrokesArray[i]) {
  //       count += 0.5;
  //       keystrokesArray = keystrokesArray.slice(0, i).concat(keystrokesArray.slice(i + 1));
  //     }
  //   }
 
  //   // if (keystrokes.length === 0) { 
  //   //   this.accuracy = 0; 
  //   if (wrongKeystrokes.length === 0) {
  //     this.accuracy = 100;
  //   } else {
  //     this.accuracy = ((allCorrectLetters.length - count)/allCorrectLetters.length * 100).toFixed(1);
  //   }
  // }

  drawGUI() {
    const currentTime = new Date();
    const timeElapsedInMinutes = (currentTime - this.startTime) / 1000 / 60;
    this.ctx.fillStyle = "#f5f5f5";
    this.ctx.textAlign = "left";
    this.ctx.textBaseLine = "hanging";
    this.ctx.fillText(`Lives:   ${10 - this.poppedShapes.length}`, 50, 35);
    //this.ctx.fillText(`Accuracy:    ${this.accuracy}%`, 340, 35);
    this.ctx.fillText(`Score:   ${this.score}`, 350, 35);

    this.ctx.textAlign = "center";
    this.ctx.fillText(`Type the words before the growing shapes pop!`, window.innerWidth / 2, window.innerHeight - 35);
  }

//   drawPointAnimation () {
//     let lastPlus = this.completedShapes[this.completedShapes.length - 1];
//     let lastMinus = this.poppedShapes[this.poppedShapes.length - 1];
//     this.ctx.textAlign = "center";
//     this.ctx.textBaseLine = "middle";
//     if (this.completedShapes.length > 0) {
//       if (lastPlus.animatePoint) {
//         let lastPlusAnimationY = lastPlus.pos[1] - this.plusPosDelta;
//         if (lastPlusAnimationY > lastPlus.pos[1] - 30) {
//           this.ctx.fillStyle = '#32cd32';
//           if (lastPlus.shapeType === 'circle') {
//             this.ctx.fillText(`+1`, lastPlus.pos[0], lastPlusAnimationY);
//           } else {
//             this.ctx.fillText(`+1`, lastPlus.pos[0] + lastPlus.width / 2, lastPlusAnimationY + lastPlus.height / 2);
//           }
//           this.plusPosDelta += 1;
//         } else {
//           lastPlus.animatePoint = false;
//           this.plusPosDelta = 1;
//         }
//       }
//     }
//     if (this.poppedShapes.length > 0) {
//       if (lastMinus.animatePoint) {
//         let lastMinusAnimationY = lastMinus.pos[1] + this.minusPosDelta;
//         if (lastMinusAnimationY < lastMinus.pos[1] + 30) {
//           this.ctx.fillStyle = 'red';
//           if (lastMinus.shapeType === 'circle') {
//             this.ctx.fillText(`-1`, lastMinus.pos[0], lastMinusAnimationY);
//           } else {
//             this.ctx.fillText(`-1`, lastMinus.pos[0] + lastMinus.width / 2, lastMinusAnimationY + lastMinus.height / 2);
//           }
//           this.minusPosDelta += 1;
//         } else {
//           lastMinus.animatePoint = false;
//           this.minusPosDelta = 1;
//         }
//       }
//     }
//   }
}

const COLORS = {
  magenta: "#ca3267",
  purple: "#646496",
  orange: "#ed9260",
  pinkish: "#cd4bb4",
  blue: "#50b4dc",
  violet: "#32288c",
  maroony: "#82555f",
  tealish: "#6496a0",
};

const SHAPES = [
  "circle",
  "rectangle",
  "triangle",
];

const wordList = ["c","x","m","f","i","w","o","p",
"h","z","s","a","v","o","r","b",
"k","u","t","e","l","j","t","v",
"c","f","i","r","n","g","s","g",
"o","e","h","d","r","l","e","v",
"a","w","t","n","g","d","p","y",
"s","g","m","g","t","c","g","r",
"l","d","t","n","a","y","b","e",
"h","w","r","p","r","e","p","d",
"x","j","e","m","y","d","g","m",
"r","w","u","l","s","d","k","e",
"t","a","h","m","c","h","c","p",
"t","n","h","m","l","v","d","x",
"y","b","k","s","o","g","l","q"];
