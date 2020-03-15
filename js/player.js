class Player {

    constructor(ctx, canvas) {
      this.ctx = ctx;
      this.canvas = canvas;
      this.health = 100;
      this.wpm;
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
}

