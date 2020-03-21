

let gameManager = (function(){
    //number to track game state. checked with every keypress
    //states;
    // 0-paused, no input, no frame refresh
    // 1-opening/'game over' screen. input -> gameManager.newGame
    // 2-deck rolling. standard gameplay. input -> deck.compare
    // 3-powerAttack display. no input.
    let state = 1;
    let intervalId = null;
    
    return {
     getState: function(){
      return state;
     },
     setState: function(s){
    },
     newGame: function(){
    //reset all variables/level/score/DECK[]/pew/background
      scoreKeeper.clear();
      scoreKeeper.newLevel();
      deck.reset();
      pew_pool = [];
    //make a new DECK and start gameLoop
      line_pool.initDeck();
      state = 2;
      intervalId = setInterval(gameLoop, 1000/30);
     },
     endGame: function(){
    //add points and bonuses. display result. end gameLoop
      scoreKeeper.endLevel();
      ctx.textAlign = 'center';
      ctx.fillText("Game Over", 400, 150);
      ctx.fillText("End Score: " + scoreKeeper.getScore(), 400, 200);
      ctx.fillText("(press any key to start again)", 400, 580);
      clearInterval(intervalId);
      state = 0;
    //wrapped to prevent fast typing from resetting a new game
      setTimeout(function(){state = 1;}, 2000);
     }
    };
   })();


// GAME LOOP
   
   function gameLoop(){
    let state = gameManager.getState();
    //clear canvas. default styles
    cleanSlate();
     
    //if DECK reaches the top of the screen Or reached level 5
    // end the game loop and display 'game over'/final score
    //**changing number of levels, also change scoreKeeper.endLevel
    if(deck.getY() < 85 || scoreKeeper.getLevel() > 4){
     gameManager.endGame();
     return;
    }
    //state: deck rolling/standard gameplay
    if(state === 2){
    //progress the DECK towards the top of the screen and display
    // LINEs, score, and avatars
     scoreKeeper.draw();
     deck.march();
     deck.draw();
     fighter.draw(deck.getX() - 100, deck.getY() - 100, 100);
    //state: powerAttack display
    } else if(state === 3){ //set to 3
    
    //lower the DECK based on score or nearness to top. need a minimum power amount for 1 iteration of animation
     powerAttack.callPower();
     deck.draw();
    //display power animation
     fighter.draw(300, 200, 200 - powerAttack.getPower());
    }
    //move and display PEWs -based on typing speed
    speedometer.setSpeed();
    ctx.shadowBlur = 0;
    for(let i = pew_pool.length - 1; i >= 0; i--){
     pew_pool[i].wee();
     pewGone(i);
    }
   }
   
   