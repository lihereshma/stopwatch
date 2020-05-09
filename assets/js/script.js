let display = document.querySelector(".time");
let button = document.querySelector(".start");
let reset = document.querySelector(".reset");
let laps = document.querySelector(".lap");
let lapsDisplay = document.querySelector(".result");
let lapInfo = document.querySelector(".lap_info");

button.addEventListener('click', clickStartStop);
reset.addEventListener('click', clickReset);
laps.addEventListener('click', clickLaps);

let ms = 0, seconds = 0, minutes = 0, hours = 0, num = 0;;
let running = false, interval = null;

// Function to display time on stopwatch
function time() {
	ms++;
	if(ms == 100) {
		ms = 0;
		seconds++;
		if(seconds > 59) {
			seconds = 0;
			minutes++;
			if(minutes > 59) {
				minutes = 0;
				hours++;
			}
		}
	}

	const frontZero = (x, y) => {
	  return y = x < 10 ? `0${x}`:`${x}`;
	}

	let displayms = 0, displaySeconds = 0, displayMinutes = 0, displayHours = 0;
	let finalms = frontZero(ms, displayms);
	let finalSeconds = frontZero(seconds, displaySeconds);
	let finalMinutes = frontZero(minutes, displayMinutes);
	let finalHours = frontZero(hours, displayHours);
	display.innerHTML = `${finalHours}:${finalMinutes}:${finalSeconds}:${finalms}`;
}

// Function when start/stop button is clicked
function clickStartStop() {
	if(running === false) {
    interval = window.setInterval(time, 1);
    button.classList.remove('start');
		button.classList.toggle('stop');
		running = true;
	} else {
    window.clearInterval(interval);
    button.classList.remove('stop');
		button.classList.toggle('start');
		running = false;
	}
}

// Function when the reset button is clicked
function clickReset() {
	ms = seconds = hours = minutes = num = 0;
	display.innerHTML = "00:00:00:00";
	if(running == true)	{
		window.clearInterval(interval);
		running = false;
  }

  if(button.className === 'stop') {
    button.classList.remove('stop');
    button.classList.toggle('start');
  } else if(button.className === 'start'){
    button.classList.remove('start');
    button.classList.toggle('start');
  }
  
	lapsDisplay.innerHTML = "";
	lapsDisplay.classList.remove('result');
}

// Function to create element
function create(element, className, data, appendElement) {
	let temp = document.createElement(element);
	temp.classList.toggle(className);
	temp.innerHTML = data;
	appendElement.appendChild(temp);
	return temp;
}

// Function when the laps button is clicked
function clickLaps() {
	num++;
	let row = create('li', 'liRow', null, lapInfo);	
	let number = create('span', 'lap_number', `lap ${num}`, row);
	let lapTime = create('span', 'record', display.innerHTML, row);
	lapsDisplay.appendChild(lapInfo);
}