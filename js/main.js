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

//LINE & DECK

function Line(x, y){
  this.key = randomInt_HELPER(0, line_pool.getLength() - 1);
  this.x = x;
  this.y = y;
  this.string = line_pool.getStr(this.key);
}

var deck = (function(){
  var lineArr = [];
  var spacer = 60;

  return{
    reset: function(){
     lineArr = [];
    },
    compare: function(c){
    // helper for neatness
    // referenced LINE object can be modified. is safe.
      compare_HELPER(lineArr[0], c);
    },
    add: function(x, y, i){
      lineArr.push(new Line(x + (spacer * i), y + (spacer * i) - (i * i * 3)));
    // (i * i * 3) creates a decreasing vertical distance between lines
    //size and alpha also adjusting in deck.draw
    },
    complete: function(){
    // move LINES into their parents positions then delete
      for(var i = 0; i < lineArr.length; i++){
       lineArr[i].x -= spacer;
      }
      for(var i = lineArr.length - 1; i > 0; i--){
       lineArr[i].y = lineArr[i - 1].y;
      }
      lineArr.splice(0, 1);
    },
    march: function(){
      var orders = 0.1 + (0.1 * scoreKeeper.getLevel());
      for(var i = 0; i < lineArr.length; i++){
        lineArr[i].y -= orders;
      }
    },
    draw: function(){
    //reduce size and alpha of descending LINEs
      for(var i = 0; i < lineArr.length; i++){
        ctx.globalAlpha = 1 - (i/(lineArr.length -1)); // 4 of the 5 will be visible
        //set font size and style, was 30 and *5
        //IMPORTANT need to match any changes in format settings
        ctx.font = 60 - (i * 5) + 'px Arial';
        ctx.fillText(lineArr[i].string, lineArr[i].x, lineArr[i].y);
      }
    },
    drop: function(pow){
      for(var i = 0; i < lineArr.length; i++){
        lineArr[i].y += pow;
      }
    },
    getX: function(idx){
      return lineArr[idx || 0].x;
    },
    getY: function(idx){
      return lineArr[idx || 0].y;
    },
    getKey: function(idx){
      return lineArr[idx || 0].key;
    },
    getSize: function(){
      return lineArr.length;
    }
  };
})();


function compare_HELPER(li, c){
  if(c !== li.string[0]){
    scoreKeeper.decrement();
    scoreKeeper.miss(); //deny bonus for flawless typing
    fighter.miss(); //move sprite map to miss animation
    if(li.x > 100) li.x -= 50; //avatar is pushed backwards
  } else {
    annihilate(li.string[0], li.x, li.y, "red"); //copy first char into global format_pool
    li.string = li.string.slice(1); //remove the first char from the LINE
    scoreKeeper.increment();
    fighter.adjustY(); //move sprite map to random animation
    li.x += 10; //typewriter-esque centering, avatar is pushed forward
  }

}



// text formatting

function format(c, x, y, tx, ty, tz, color){
  this.char = c;
  this.x = x;
  this.y = y;
  this.tx = tx;
  this.ty = ty;
  this.tz = tz;
  this.counter = 0;
  this.color = color;
}

format.prototype.wee = function(){
  this.x += (this.tx + this.counter) * ((speedometer.speed())
    * 2);
  this.y += this.ty * (speedometer.speed());
  ctx.font = this.tz > 0 ?
    (60 + (Math.pow(1 + (this.counter * 10), 2))) + 'px Arial' : //was 30 +...
    (60 - (Math.pow(1 + (this.counter * 3 ), 2))) + 'px Arial';
  ctx.fillStyle =
    'hsl(hue, 80%, 50%)'.replace('hue', (50 * this.counter));
  ctx.globalAlpha = this.tz > 0 ?
    1 - (this.counter/1.5) : 1 - ((this.counter/2)/1.5);
  ctx.fillText(this.char, this.x, this.y);
  this.counter += 0.02; //was 0.02
}


function annihilate(c, x, y, color){
  var rand = randomInt_HELPER(0, 180);
  var tz = rand % 2 > 0 ? -1 : 1;
  format_pool.push(new format(c, x, y, (Math.cos(rand)), (Math.sin(rand)), tz, color));
}


function formatGone(i){
  if(format_pool[i].counter > 3){ //adjust if font size is adjusted, was 1.5, or just adjust the counter increment
    format_pool.splice(i, 1);
  }
}


var speedometer = (function(){
  var x = 1;
  return{
    setSpeed: function(){
      x = ((format_pool.length / 30) * 4) + 1;
    },
    speed: function(){
      return x;
    }
  };
})();

