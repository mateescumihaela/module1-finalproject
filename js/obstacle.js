class Obstcle {
    constructor(ctx, canvas, word, x, y, notCollided){
      this.ctx = ctx;
      this.canvas = canvas;
      this.word = word;
      this.x = x;
      this.y = y;
      this.dx = 2.5
      this.dy = 0;
      this.shift = 0;
      this.deadShift = 575;
      this.notCollided = notCollided;
      
      this.carImg = new Image();
      this.carImg.src = "./public/images/car.png";
    }
    
    draw() {
      this.ctx.drawImage(this.carImg, 
                          this.shift, 88, 
                          50, 90, 
                          this.x, this.y,
                          50, 90);
    }
  
    drawDead() {
      this.ctx.drawImage(this.carImg,
                          this.deadShift, 270,
                          50, 90,
                          this.x, this.y,
                          50, 90);
    }
  
    drawAttack() {
      this.ctx.drawImage(this.carImg,
                          this.deadShift, 178,
                          75, 90,
                          this.x, this.y,
                          55, 90);
    }
  
    drawText() {
      this.ctx.beginPath();
        this.ctx.fillStyle = "#13ffde";
        this.ctx.font = 'bold 18px "Roboto Slab"';
        this.ctx.fillText(this.word, this.x + 20, this.y - 7);
        this.ctx.fill();
        this.ctx.shadowBlur = 3;
        this.ctx.font = '19px "Roboto Slab"'
      this.ctx.closePath();
    }
  
    converge() {
      if (this.x > 350) {
        if (this.y < this.canvas.height / 2) {
          this.dy = 2;
        } else if (this.y > this.canvas.height / 2) {
          this.dy = -2;
        } else {
          this.dy = 0;
        }
      }
    }

    }