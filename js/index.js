document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  ctx.font = '20px Menlo';

  window.onload = function () {
    let img = document.getElementById("pregame-bg");
    ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    const game = new Game(ctx);
    game.pregame();
  };
});
