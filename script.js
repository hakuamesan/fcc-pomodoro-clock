var session_time=25;
var break_time=5;
var cur_work_time = session_time;
var cur_break_time = break_time;
var minutes, seconds;
var pause_min, pause_sec;

var time_left=session_time;
var timer;
var clock;
var i;
var pause = false;

//////////  Start clock timer
function startTimer(duration){
  var time = duration;
    clock = setInterval(function () {
        minutes = parseInt(time / 60, 10)
        seconds = parseInt(time % 60, 10);

      
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("time-left").innerHTML = minutes + ":" + seconds;

       if (--time <= 0) {
           clearInterval(clock);
          playBeep();
         console.log("timeout:"+i + " time:"+time);
           if(i===0){
               startBreak();
           } else if (i===1){
               startWork();
           }
       }
    }, 1000);
}


function startWork(){
  console.log("Start Work:"+i);
  document.getElementById("timer-label").innerHTML = "Start Working";
  
  var sTime;
  
if (pause == true)
   sTime = cur_work_time * 60;
  else 
     sTime = session_time * 60;
  
  sTime--;
  console.log("stime=" + sTime);
  startTimer(sTime);
  i =0;
}

function startBreak(){
  console.log("Start Break"+i);
  document.getElementById("timer-label").innerHTML = "Take a break";
  
  var bTime;
  
  if (pause == true)
     bTime = break_time * 60;
  else
     bTime = cur_break_time * 60;
  
  bTime--;
  startTimer(bTime);
  i =1;
}


function playBeep(){
  var beep = document.getElementById("beep");
  beep.play();
}

/////////////  Main timer
document.getElementById("start_stop").addEventListener("click", ()=>{
  
  let txt = document.getElementById("start_stop").innerHTML;
  
  if ( txt == "Start") {
    
  document.getElementById("timer-label").innerHTML = "Start Working";
    document.getElementById("start_stop").innerHTML = "Pause";
    startWork();
    pause = (!pause);

    
  } else {
    pause = !pause;
    
    document.getElementById("timer-label").innerHTML = "Timer Paused";
    document.getElementById("start_stop").innerHTML = "Start";
    cur_work_time = session_time;
    cur_break_time = break_time;
    clearInterval(clock);
  }
  
});


document.getElementById("reset").addEventListener("click", ()=>{
  session_time = 25;
  break_time = 5;
  clearInterval(clock);
  pause = false;
  
  cur_work_time = session_time;
  cur_break_time = break_time;
  
  document.getElementById("timer-label").innerHTML = "Press Start to begin work";
  document.getElementById("time-left").innerHTML = session_time+":00";
  

  document.getElementById("session-length").innerHTML = session_time;
  document.getElementById("break-length").innerHTML = break_time;
  
   var beep = document.getElementById("beep");
  beep.pause();
  beep.currentTime = 0;
  
});


/////////////  Session time adjust (inc/dec)
document.getElementById("session-increment").addEventListener("click", ()=>{
  session_time++;
  if ( session_time > 60) session_time = 60;
  document.getElementById("session-length").innerHTML = session_time ;
  
  if (!pause)
    document.getElementById("time-left").innerHTML = session_time+":00";
});


document.getElementById("session-decrement").addEventListener("click", ()=>{
    session_time--;
if ( session_time <= 0) session_time = 1;
  document.getElementById("session-length").innerHTML = session_time ;
  
  if (!pause)
    document.getElementById("time-left").innerHTML = session_time+":00";
});

/////////////  Break time adjust (inc/dec)
document.getElementById("break-increment").addEventListener("click", ()=>{
  break_time++;
  if ( break_time > 60) break_time = 60;
  document.getElementById("break-length").innerHTML = break_time;
});


document.getElementById("break-decrement").addEventListener("click", ()=>{
  break_time--;
  if ( break_time <= 0) break_time = 1;
  
  document.getElementById("break-length").innerHTML = break_time ;
});






