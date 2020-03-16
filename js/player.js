class Player {

    constructor(ctx, canvas) {
      this.ctx = ctx;
      this.canvas = canvas;
      this.killCount = 0;
      this.attack = false;
  
      this.playerImg = new Image();
      this.playerImg.src = "../images/player.png";
    }
    
    draw() {
        if (this.attack) {
          this.ctx.drawImage(this.playerImg,
                        225, 239,
                        72, 81,
                        canvas.width - 150, canvas.height / 2,
                        72, 81);
        } else {
          this.ctx.drawImage(this.playerImg,
                        297, 240,
                        72, 81,
                        canvas.width - 150, canvas.height / 2,
                        72, 81);
        }
      }

        // drawKillCount() {
        //   this.ctx.beginPath();
        //   this.ctx.fillStyle = "white";
        //   this.ctx.font = 'bold 18px "Roboto Slab"';
        //   this.ctx.fillText("Kills: " + this.killCount.toString(), this.canvas.width - 210, 50);
        //   this.ctx.fill();
        //   this.ctx.closePath();
        // }       
}

