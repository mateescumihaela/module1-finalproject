function screenCheck(){
    //if screen size is under 800px, display error message
    if(window.innerWidth < 800 || document.documentElement.clientWidth < 800 || document.body.clientWidth < 800 || document.width < 800 || screen.width < 800 || window.width < 800){
     let cover = document.createElement('div');
     cover.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: white;';
     cover.innerHTML = 'oops -Please revisit with a keyboard and/or a larger screen.';
     document.body.appendChild(cover);
     return true;
    }
    return false;
   }
   
   
   function welcome_HELPER(){
    cleanSlate();
    ctx.textAlign = 'center';
    ctx.fillText("Welcome", 400, 200);
    ctx.fillText("(press any key to begin)", 400, 580);
   }
   
   
   function cleanSlate(){
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.font = '30px Arial';
     ctx.fillStyle = 'rgb(0, 255, 43)';
     ctx.globalAlpha = 1;
   }
   
   
   function randomInt_HELPER(min, max){
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }