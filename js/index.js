class Timer {
  constructor() {
    this.type = "pomodoro";
    this.timeLeft = 25;
    this.clock = document.getElementById("time");
    this.action = document.getElementById("action");
    this.circle1 = document.getElementById("circle");
    this.buttonshort = document.getElementById("buttonshort");
    this.buttonlong = document.getElementById("buttonlong");
    this.buttonpomo = document.getElementById("buttonpomo");
    this.time = document.getElementById("time");
    this.time.innerHTML = this.timeLeft + ":00";
    this.selectors = document.querySelectorAll("li");
    this.timer = 25;
    this.paused = false;
    this.interval = 1000;
    this.timetoContinue = 19;
    this.timesetter = 25;
    this.myInterval = null;
    this.audio1 = document.getElementById("sound1");
    this.modal = document.querySelector(".modal");
  }
  reset() {}

  settings() {
    this.selectors.forEach((item) => {
      if (item.classList == "active") {
        let selectedwords = item.innerHTML;
        let settime = 25;

        switch (selectedwords) {
          case "pomodoro":
            settime = 25;
            break;
          case "short break":
            settime = 5;
            break;
          case "long break":
            settime = 10;
            break;
        }
        countdownTimer.start(settime);
      }
    });
  }

  resume() {
    this.paused = false;
    this.start(this.timeLeft / 60);
  }

  start(timeLeft) {
    clearInterval(this.myInterval); // reset
    this.action.innerHTML = "PAUSE";
    this.timeLeft = timeLeft * 60;
    this.startingtime = this.timeLeft;
    let scope = this;
    this.myInterval = setInterval(function () {
      let seconds = Math.floor(scope.timeLeft % 60);
      let minutes = Math.floor(scope.timeLeft / 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (scope.timeLeft == 0) {
        clearInterval(scope.myInterval);
        scope.clock.innerText = "00:00";
        scope.audio1.play();
        return;
      }
      if (!scope.paused) {
        scope.clock.innerText = `${minutes}:${seconds}`;
        scope.circle1.style.strokeDashoffset =
          scope.timeLeft / (scope.startingtime / 1024);
        clearInterval(this.myInterval);
      }

      while (scope.paused) {
        scope.clock.innerText = `${minutes}:${seconds}`;
        scope.circle1.style.strokeDashoffset =
          scope.timeLeft / (scope.startingtime / 1024);
        scope.action.innerHTML = "RESUME";

        clearInterval(scope.myInterval);
        return;
      }

      scope.timeLeft = scope.timeLeft - 1;
    }, 1000);
  }

  pause() {
    this.paused = true;
  }

  overSettings() {
    // alert("TOGGLEhere");
    console.log("TOGGLING");
    this.modal.classList.toggle("modal");
  }
}

const countdownTimer = new Timer();

function action(str) {
  switch (str.toLowerCase()) {
    case "start":
      countdownTimer.start(25);
      break;
    case "pause":
      countdownTimer.pause();
      break;
    case "resume":
      countdownTimer.resume();
      break;
    default:
      countdownTimer.stop();
      break;
  }
}

//NAV LINKS//

const navbuttons = document.querySelectorAll("li");
let navBg = document.getElementById("bgindicator");
navbuttons.forEach((item, index) => {
  navbuttons.item(index).addEventListener("click", (ev) => {
    let movement = index * 118 + 25;
    navBg.style.marginLeft = `${movement}px`;
    navbuttons.forEach((link) => link.classList.remove("active"));
    ev.target.classList.add("active");
    countdownTimer.settings();
  });
});

//MAIN SETTINGS//

const mainSettings = document
  .getElementById("settings1")
  .addEventListener("click", (ev) => {
    countdownTimer.overSettings();
  });

const mainSettings2 = document
  .getElementById("closer")
  .addEventListener("click", (ev) => {
    countdownTimer.overSettings();
  });
//SETTINGS TIME SPINNER

// const input1 = document.getElementById("minspom");
// const input2 = document.getElementById("minsshort");
// const input3 = document.getElementById("minslong");

document.querySelectorAll(".uparrow, .downarrow").forEach((arrow) => {
  arrow.addEventListener("click", (ev) => ev.preventDefault());
});
// let inc = () => document.getElementById("minspom").stepUp(1);
let inc = (input) => document.getElementById(input).stepUp(1);
let dec = (input) => document.getElementById(input).stepDown(1);
// document.getElementById("minspom").stepUp(2);

// const inc = (pomodoro) => {
//   let inputValue1 = input1.value;
//   console.log(inputValue1);
//   console.log(pomodoro);
//   input1.value++;
// };

// const dec = () => {
//   console.log(input1.value);
//   input1.value--;
// };

// const inc = (input) => getElementById("minspom").stepUp(1);

// const dec = (input) => getElementById(input).stepDown(1);

// number selectors input
