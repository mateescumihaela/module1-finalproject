let fighter = (function(){
    //x,y coords for map. Map has 5 images for each of 7
    // animations. All width/height set at 100px/100px
    let x = 0;
    let y = 600;
    let frameCounter = 0;
    let imgFighter = new Image();
    //added 'assets' to path
    imgFighter.src = "images/greenFighter.png";
   
    return{
     draw: function(dx, dy, size){
    //draw each position 3 times before moving to the next
     if(frameCounter > 1){
      if(x > 300){
       x = 0;
    //powerAttack animation (y==600) is adjusted indepentently
       if(y !== 600){
        y = 0;
       }
      } else {
       x += 100;
      }
      frameCounter = 0;
     } else {
      frameCounter++;
     }
      ctx.globalAlpha = 1;
      ctx.drawImage(imgFighter, x, y, 100, 100, dx, dy, size, size);
     },
     adjustY: function(){
      y = randomInt_HELPER(1, 4) * 100;
      x = 0;
      frameCounter = 0;
     },
     miss: function(){
      y = 500;
      frameCounter = 0;
     },
     setAnimation: function(){
      y = 600;
      frameCounter = 0;
     }
    }
   })();
   
   
   let powerAttack = (function(){
     let power = 0;
   
     return{
       setPower: function(){
         power = ((scoreKeeper.getRound()) / 20000) * 200 >
                 canvas.height - deck.getY() - 20 ?
                 canvas.height - deck.getY() - 20 :
                 ((scoreKeeper.getRound()) / 20000) * 200
       },
       callPower: function(){
         if(power > 5){
           deck.drop(power/4);
           power -= power/4;
         } else {
         gameManager.setState(2);
         }
       },
       getPower: function(){
         return power;
       }
     }
   })();