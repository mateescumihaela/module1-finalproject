let scoreKeeper = (function(){
    let round = 0;
    let score = 0;
    let level = 0;
   //boolean to track typing an entire LINE without a mistake
    let flawless = true;
  
    return{
      increment: function(){
        round += 100 + (level * 10);
      },
      decrement: function(){
        if(round > 200) round -= 200;
      },
      draw: function(){
      // font size set in cleanSlate
        ctx.textAlign = 'end';
        ctx.fillText('Score: ' + score, 780, 30);
        if(flawless){
         ctx.textAlign = 'center';
        }
        ctx.textAlign = 'start'; // sets alignment back to default for the LINE display
        ctx.fillText('Level ' + level + ': ' + round, 20, 30);
        ctx.beginPath();
        ctx.moveTo(0, 40);
        ctx.lineTo(800, 40);
        ctx.stroke();
      },
      endLevel: function(){
        if(flawless) score += round;
        if(level > 4) score += score; //beating the game (level 4)
        score += round;
        round = 0;
        flawless = true;
      },
      miss: function(){
        flawless = false;
      },
      isFlawless: function(){
        return flawless;
      },
      getRound: function(){
        return round;
      },
      getScore: function(){
        return score;
      },
      getLevel: function(){
        return level; //called by deck.march and checked for opening screen
      },
      newLevel: function(){
        level++;
        //added 'assets'
        // to do - document.getElementById('outerEdge').style.backgroundImage = 'url("assets/level_' + level + '.gif")';
      },
      clear: function(){
        round = 0;
        score = 0;
        level = 0;
        flawless = true;
      }
    }
  })();