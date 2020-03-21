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
   
   