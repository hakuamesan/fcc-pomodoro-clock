let session_time = 25;
let break_time = 5;
let minutes, seconds;

let time_left = session_time;
let timer;
let clock;
let isWork = true;
let pause = false;
let completed = true;

let debug = false;

//////////  Start clock timer
function startTimer(duration) {
		var time = duration;

		if (debug){

				if (time < 0) console.log("Negative time!!!");
				if (time === 0) console.log("time is zero!");
				console.log("track timer: " + time);
		}

		clock = setInterval(function() {
				minutes = parseInt(time / 60, 10)
				seconds = parseInt(time % 60, 10);
				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;


				document.getElementById("time-left").innerHTML = minutes + ":" + seconds;

				completed = false;

				if (--time < -1) {
						playBeep(true);
						clearInterval(clock);

						completed = true;

						if (isWork) {
								time_left = break_time;
								time_left = time_left < 10 ? "0" + time_left : time_left;
								document.getElementById("time-left").innerHTML = time_left + ":00";
								isWork = false;
								startBreak();
						} else {
								time_left = session_time;
								time_left = time_left < 10 ? "0" + time_left : time_left;
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

		if (debug){

				console.log("Start Work: " + time_left);
				console.log("Start mins=" + minutes + " secs=" + seconds);
				console.log("Start completed=" + completed);
		}

		if (completed == true) 
				sTime = time_left * 60;
		else
				sTime = minutes * 60 + seconds;

		sTime--;
		if (debug) console.log("stime=" + sTime);

		isWork = true;
		startTimer(sTime);
}

function startBreak() {
		document.getElementById("timer-label").innerHTML = "Take a break";

		if (debug){

				console.log("Start Break: " + time_left);
				console.log("Break mins=" + minutes + " secs=" + seconds);
				console.log("Break completed=" + completed);
		}

		var bTime;

		if (completed == true)
				bTime = time_left * 60;
		else
				bTime = break_time * 60;

		bTime--;
		if (debug) console.log("bTime = " + bTime);

		completed = false;
		isWork = false;
		startTimer(bTime);
}

///// Sound: True: play  False: stop
function playBeep(sound) {
		var beep = document.getElementById("beep");
		if (sound) {
				beep.play();
				if (debug) console.log("play beep");
		} else {
				beep.pause();
				beep.currentTime = 0;
		}
}

/////////////  Update main timer display
//  isWork: True: Session False: Break
function updateTimer() {
		if (debug) console.log("UpdateTime: isWork:" + isWork);

		if (isWork == true) { /////// Update work/session time
				if (debug) console.log("updating work time");
				if (pause) {
						if (completed) {
								time_left = session_time;
								time_left = time_left < 10 ? "0" + time_left : time_left;
								document.getElementById("time-left").innerHTML = time_left + ":00";

						}
				} else {
						if (completed)
								time_left = session_time;
						time_left = time_left < 10 ? "0" + time_left : time_left;
						document.getElementById("time-left").innerHTML = time_left + ":00";
				}
		} else { //////// update Break time
				if (debug) console.log("updating break time");
				if (pause) {

						//  document.getElementById("time-left").innerHTML = break_time + ":00";

				}

		}
}



/////////////  Main timer
document.getElementById("start_stop").addEventListener("click", () => {

		let txt = document.getElementById("start_stop").innerHTML;
		if (debug) console.log("pause=" + pause);

		if (txt == "Start") {

				pause = false;
				if (debug) console.log("Start pause=" + pause);
				document.getElementById("timer-label").innerHTML = "Start Working";
				document.getElementById("start_stop").innerHTML = "Pause";
				startWork();


		} else {
				pause = true;
				if (debug) console.log("Else pause=" + pause);

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

		document.getElementById("session-length").innerHTML = session_time + " mins";
		document.getElementById("break-length").innerHTML = break_time;

});


/////////////  Session time adjust (inc/dec) ///////////////////////////
document.getElementById("session-increment").addEventListener("click", () => {
		if (debug){
				console.log("sess inc: completed=" + completed + " pause=" + pause);
				console.log("sess time=" + session_time + "  time_left=" + time_left);
		}

		session_time++;
		if (session_time > 60) session_time = 60;
		document.getElementById("session-length").innerHTML = session_time + " mins";

		updateTimer();
});


document.getElementById("session-decrement").addEventListener("click", () => {
		if (debug){
				console.log("sess dec: completed=" + completed + " pause=" + pause);
				console.log("sess time=" + session_time + "  time_left=" + time_left);
		}

		session_time--;
		if (session_time <= 0) session_time = 1;
		document.getElementById("session-length").innerHTML = session_time + " mins";

		updateTimer();
});

/////////////  Break time adjust (inc/dec) ///////////////////////////
document.getElementById("break-increment").addEventListener("click", () => {
		break_time++;
		if (break_time > 60) break_time = 60;
		document.getElementById("break-length").innerHTML = break_time + " mins";

		updateTimer();
});


document.getElementById("break-decrement").addEventListener("click", () => {
		break_time--;
		if (break_time <= 0) break_time = 1;
		document.getElementById("break-length").innerHTML = break_time + " mins";

		updateTimer();
});
