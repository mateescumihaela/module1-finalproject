document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  const ctx = canvasEl.getContext('2d');
  ctx.font = '20px Menlo';

  window.onload = function () {
    let img = document.getElementById("pregame-bg");
    ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    const game = new Game(ctx);
    game.pregame();
  };


});
