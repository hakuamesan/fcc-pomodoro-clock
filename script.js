var session_time = 25;
var break_time = 5;
var cur_work_time = session_time;
var cur_break_time = break_time;
var minutes, seconds;
var pause_min, pause_sec;

var time_left = session_time;
var timer;
var clock;
var isWork = true;
var pause = false;
var completed = true;


//////////  Start clock timer
function startTimer(duration) {
    var time = duration;
    if (time < 0) console.log("Negative time!!!");
    if (time === 0) console.log("time is zero!");
    console.log("track timer: " + time);

    clock = setInterval(function() {
        minutes = parseInt(time / 60, 10)
        seconds = parseInt(time % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (time == 0) console.log("show zero");
        console.log("nope:time="+time + " mins="+minutes + " secs="+seconds);

  
        document.getElementById("time-left").innerHTML = minutes + ":" + seconds;

        completed = false;

        if (--time < 0) {
            console.log("showing zero");
            document.getElementById("time-left").innerHTML = "00:00";
            clearInterval(clock);
            playBeep(true);

            completed = true;

            console.log("SetTimer isWork:" + isWork);
            console.log("time=" + time + " mins=" + minutes + " secs=" + seconds);
            if (isWork) {
                time_left = break_time;
                document.getElementById("time-left").innerHTML = time_left + ":00";
                isWork = false;
                startBreak();
            } else {
                time_left = session_time;
                document.getElementById("time-left").innerHTML = time_left + ":00";
                isWork = true;
                startWork();
            }
        }
    }, 1000);
}


function startWork() {
    document.getElementById("timer-label").innerHTML = "Start Working";

    var sTime;

    console.log("Start Work: " + time_left);
    console.log("Start mins=" + minutes + " secs=" + seconds);
    console.log("Start completed=" + completed);

    if (completed == true) {
        sTime = time_left * 60;
    } else
        sTime = minutes * 60 + seconds;

    sTime--;
    console.log("stime=" + sTime);

    isWork = true;
    startTimer(sTime);
}

function startBreak() {
    document.getElementById("timer-label").innerHTML = "Take a break";

    console.log("Start Break: " + time_left);
    console.log("Break mins=" + minutes + " secs=" + seconds);
    console.log("Break completed=" + completed);

    var bTime;

    if (completed == true)
        bTime = time_left * 60;
    else
        bTime = break_time * 60;

    bTime--;
    console.log("bTime = " + bTime);

    completed = false;
    isWork = false;
    startTimer(bTime);
}

///// Sound: True: play  False: stop
function playBeep(sound) {
    var beep = document.getElementById("beep");
    if (sound) {
        beep.play();
        console.log("play beep");
    } else {
        beep.pause();
        beep.currentTime = 0;
    }
}

/////////////  Update main timer display
//  isWork: True: Session False: Break
function updateTimer() {
    console.log("UpdateTime: isWork:" + isWork);

    if (isWork == true) { /////// Update work/session time
        console.log("updating work time");
        if (pause) {
            if (completed) {
                time_left = session_time;
                document.getElementById("time-left").innerHTML = time_left + ":00";

            }
        } else {
            if (completed)
                time_left = session_time;
            document.getElementById("time-left").innerHTML = time_left + ":00";
        }
    } else { //////// update Break time
        console.log("updating break time");
        if (pause) {

            //  document.getElementById("time-left").innerHTML = break_time + ":00";

        }

    }
}



/////////////  Main timer
document.getElementById("start_stop").addEventListener("click", () => {

    let txt = document.getElementById("start_stop").innerHTML;
    console.log("pause=" + pause);

    if (txt == "Start") {

        pause = false;
        console.log("Start pause=" + pause);
        document.getElementById("timer-label").innerHTML = "Start Working";
        document.getElementById("start_stop").innerHTML = "Pause";
        startWork();


    } else {
        pause = true;
        console.log("Else pause=" + pause);

        clearInterval(clock);

        document.getElementById("timer-label").innerHTML = "Timer Paused";
        document.getElementById("start_stop").innerHTML = "Start";
    }

});


document.getElementById("reset").addEventListener("click", () => {
    clearInterval(clock);
    playBeep(false);

    session_time = 25;
    break_time = 5;
    pause = false;
    completed = true;
    time_left = session_time;
    isWork = true;

    document.getElementById("timer-label").innerHTML = "Start Timer";
    document.getElementById("time-left").innerHTML = time_left + ":00";
    document.getElementById("start_stop").innerHTML = "Start";

    document.getElementById("session-length").innerHTML = session_time;
    document.getElementById("break-length").innerHTML = break_time;

});


/////////////  Session time adjust (inc/dec) ///////////////////////////
document.getElementById("session-increment").addEventListener("click", () => {
    console.log("sess inc: completed=" + completed + " pause=" + pause);
    console.log("sess time=" + session_time + "  time_left=" + time_left);

    session_time++;
    if (session_time > 60) session_time = 60;
    document.getElementById("session-length").innerHTML = session_time;

    updateTimer();
});


document.getElementById("session-decrement").addEventListener("click", () => {

    console.log("sess dec: completed=" + completed + " pause=" + pause);
    console.log("sess time=" + session_time + "  time_left=" + time_left);

    session_time--;
    if (session_time <= 0) session_time = 1;
    document.getElementById("session-length").innerHTML = session_time;

    updateTimer();
});

/////////////  Break time adjust (inc/dec) ///////////////////////////
document.getElementById("break-increment").addEventListener("click", () => {
    break_time++;
    if (break_time > 60) break_time = 60;
    document.getElementById("break-length").innerHTML = break_time;

    updateTimer();
});


document.getElementById("break-decrement").addEventListener("click", () => {
    break_time--;
    if (break_time <= 0) break_time = 1;
    document.getElementById("break-length").innerHTML = break_time;

    updateTimer();
});
