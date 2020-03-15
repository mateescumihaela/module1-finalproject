document.addEventListener('DOMContentLoaded', () => {
    const page = document.getElementById("page")
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const input = document.getElementById('typing-form');
    const wordList = document.getElementById('word-list');
  
    const game = new Game(page, ctx, canvas, wordList, input);

    let titlepos = -60;
    let startCounter = 0;

    if (canvas.className === "start-screen") {
        game.drawMenuBackground();
    }
})