var session_time=25;
var break_time=5;
var cur_work_time = session_time;
var cur_break_time = break_time;
var minutes, seconds;
var pause_min, pause_sec;

var time_left=session_time;
var timer;
var clock;
var i=0;
var pause = true;
var completed = false;


//////////  Start clock timer
function startTimer(duration){
  var time = duration;
    clock = setInterval(function () {
        minutes = parseInt(time / 60, 10)
        seconds = parseInt(time % 60, 10);

      
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("time-left").innerHTML = minutes + ":" + seconds;

       if (--time < 0) {
           clearInterval(clock);
          playBeep();
          completed = true;
         console.log("timeout:"+i + " time:"+time);
         console.log("mins=" + minutes + " secs=" + seconds);
          if(i===0){
              time_left = break_time;
              document.getElementById("time-left").innerHTML = time_left +":00";

               startBreak();
           } else if (i===1){
              time_left = session_time;
              document.getElementById("time-left").innerHTML = time_left +":00";
               startWork();
           }
       }
    }, 1000);
}


function startWork(){
  console.log("Start Work:"+ time_left);
  document.getElementById("timer-label").innerHTML = "Start Working";
  
  var sTime;
  
  console.log("mins=" + minutes + " secs=" + seconds);
if (completed == true){
  sTime = minutes * 60 + seconds;
}
  else 
     sTime = time_left * 60;
  
  sTime--;
  console.log("stime=" + sTime);
  startTimer(sTime);
  i =0;
  completed = false;
}

function startBreak(){
  console.log("Start Break" + time_left);
  document.getElementById("timer-label").innerHTML = "Take a break";
  
  var bTime;
  
  if (completed == true)
     bTime = break_time * 60;
  else
     bTime = time_left * 60;
  
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
  console.log("pause="+pause);

  


  if ( txt == "Start") {
    
    pause = (!pause); console.log("Start pause=" + pause);
  document.getElementById("timer-label").innerHTML = "Start Working";
    document.getElementById("start_stop").innerHTML = "Pause";
    startWork();

    
  } else {
    pause = !pause;console.log("Else pause=" + pause);

    
    document.getElementById("timer-label").innerHTML = "Timer Paused";
    document.getElementById("start_stop").innerHTML = "Start";
    clearInterval(clock);
  }
  
});


document.getElementById("reset").addEventListener("click", ()=>{
  session_time = 25;
  break_time = 5;
  clearInterval(clock);
  pause = false;
  completed = false; 
  cur_work_time = session_time;
  cur_break_time = break_time;
  time_left = session_time;

  document.getElementById("timer-label").innerHTML = "Start Timer";
  document.getElementById("time-left").innerHTML = session_time+":00";
  document.getElementById("start_stop").innerHTML = "Start"; 

  document.getElementById("session-length").innerHTML = session_time;
  document.getElementById("break-length").innerHTML = break_time;
  
   var beep = document.getElementById("beep");
  beep.pause();
  beep.currentTime = 0;
  
});


/////////////  Session time adjust (inc/dec)
document.getElementById("session-increment").addEventListener("click", ()=>{
  console.log("sess inc: completed=" + completed + " pause="+pause); 
  console.log("sess time=" + session_time + "  time_left="+time_left);

  session_time++;
  if ( session_time > 60) session_time = 60;

  if (pause){
    document.getElementById("session-length").innerHTML = session_time ;
    document.getElementById("time-left").innerHTML = session_time+":00";

    if (!completed) time_left = session_time;

} else {
    if (!completed)
      time_left = session_time;
}
});


document.getElementById("session-decrement").addEventListener("click", ()=>{
  
  console.log("sess inc: completed=" + completed + " pause="+pause); 
  console.log("sess time=" + session_time + "  time_left="+time_left);
  session_time--;
  if ( session_time <= 0) session_time = 1;

  if (pause){
  document.getElementById("session-length").innerHTML = session_time ;
    document.getElementById("time-left").innerHTML = session_time+":00";
    if (!completed) time_left = session_time;
} else {
  if (!completed)
    time_left = session_time;
  }
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






