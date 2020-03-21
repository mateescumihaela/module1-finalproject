//global variables
let canvas,
    ctx,
    format_pool = [];

window.onload = function(){
 //ensures screen size is big enough for canvas
 if(screenCheck()) return;
 //set up the canvas and color scheme
 canvas = document.getElementById('gameCanvas');
 ctx = canvas.getContext('2d');
 ctx.shadowColor = 'rgb(0, 155, 35)';
 ctx.strokeStyle = 'rgb(0, 255, 43)';

 //start game
function initGame(){
 //press any key to start
  document.onkeypress = function(e){
   if(gameManager.getState() === 1){
    gameManager.newGame();
   } else if(gameManager.getState() === 2){
    deck.compare(event.key || String.fromCharCode(e.charCode));
   }
  };

 //display opening screen
  welcome_HELPER();
};
initGame();
}();

let line_pool = (function(){
 //object to contain text to type
 let pool = {"lines": [
{"str": "test test test"}
]};;

 return {
  initDeck: function(){
 //set size, location, speed of DECK
 //size -1 determines the number of levels in the game
   for(var i = 0; i < 5; i++){
    deck.add(120, 600, i);
   };
  },
  getStr: function(indx){
   return pool.lines[indx].str;
  },
  getPool: function(){
   return pool.lines;
  },
  getLength: function(){
   return pool.lines.length;
  }
 };
})();

