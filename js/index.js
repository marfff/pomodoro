class Timer {
  constructor() {
    this.timeLeft = 25;
    this.clock = document.getElementById("time");
    this.time = document.getElementById("time");
    this.time.innerHTML = this.timeLeft + ":00";
    this.timepom = 25;
    this.timeshort = 5;
    this.timelong = 10;

    this.selectors = document.querySelectorAll("li");
    this.action = document.getElementById("action");
    this.circle1 = document.getElementById("circle");
    this.buttonshort = document.getElementById("buttonshort");
    this.buttonlong = document.getElementById("buttonlong");
    this.buttonpomo = document.getElementById("buttonpomo");

    this.paused = false;
    this.audio1 = document.getElementById("sound1");
    this.modal = document.querySelector(".modal");
  }

  //MAIN TIMER / start() method
  //main timer countdown receving timeLeft/passed in timer setting.
  //clears the interval
  //manipulates the leading zeros if minutes or seconds are less then 10 working in milliseconds.
  //setInterval set to 1000 milliseconds

  start(timeLeft) {
    clearInterval(this.myInterval); // reset
    this.action.innerHTML = "PAUSE";
    this.timeLeft = timeLeft * 60;
    this.startingtime = this.timeLeft;

    //had issues with scope/undefined varaibles - so made a variable called scope.
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

      //stop timer at 00 and if display is 00 fires mp3 'alarm' with audio1.play()
      if (scope.timeLeft == 0) {
        clearInterval(scope.myInterval);
        scope.clock.innerText = "00:00";
        scope.audio1.play();
        return;
      }

      //continues if not paused
      //evaluates coloured ring to show correctly for starting 'settime''=100%, using //timeLeft and startingtime variable.
      //strokeDashoffset on the svg as a proportion of 1024 'displays' the ring of time left'
      if (!scope.paused) {
        scope.clock.innerText = `${minutes}:${seconds}`;
        scope.circle1.style.strokeDashoffset =
          scope.timeLeft / (scope.startingtime / 1024);
        clearInterval(this.myInterval);
      }

      //if paused changes action indicator to read 'resume' and stops timer further running with clearInterval() and 'displays' the held time with strokeDashoffset on the svg.
      while (scope.paused) {
        scope.clock.innerText = `${minutes}:${seconds}`;
        scope.circle1.style.strokeDashoffset =
          scope.timeLeft / (scope.startingtime / 1024);
        scope.action.innerHTML = "RESUME";

        clearInterval(scope.myInterval);
        return;
      }
      //deducts 1 second from timeLeft.
      scope.timeLeft = scope.timeLeft - 1;
    }, 1000);
  }

  //pause method toggles the this.paused to true.
  pause() {
    this.paused = true;
  }

  //changes this.paused to false and runs this.start with timeLeft passed in.
  resume() {
    this.paused = false;
    this.start(this.timeLeft / 60);
  }

  overSettings() {
    // alert("TOGGLEhere");
    this.modal.classList.toggle("modal");
  }

  //*see below for NAV LINKS  function passing to this 'settings' method.
  //switch statement - slide selector clears active class and reassigns it to pressed main time selected as 'settime' -pomodoro, short or long.//'passing in' inner html word of button.

  //if class is 'active ie color overlayed finds the relevant text of the li

  settings() {
    this.selectors.forEach((item) => {
      if (item.classList == "active") {
        let selectedwords = item.innerHTML;
        let settime;

        switch (selectedwords) {
          case "pomodoro":
            settime = timepom;
            break;
          case "short break":
            settime = timeshort;
            break;
          case "long break":
            settime = timelong;
            break;
        }

        //runs start() passing in 'settime'.
        countdownTimer.start(settime);
      }
    });
  }
}
//Instantiation of 'the main timer 'function' class.
const countdownTimer = new Timer();

//switch case decision using string of passed in 'action' to determin relevant method call.//default 25 minutes for pomodor and methods on countdownTimer.
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
//*see above for 'settings' method
//intially making navbuttons obtain the li elements as in the slide sector main group times.
//navBg is  which  color/switch is active.
//adds an event listener to each li using its index
//moves the color overlay dependant on maths and index to cover the relevant needed button///changes property - style.marginLeft to correct position to place overlay.
//for Each li removes 'any' highlighted and adds an activetag to the 'clicked' button.
//runs method settings.

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

//adding event listener to main 'settings / modal page'
const mainSettings = document
  .getElementById("settings1")
  .addEventListener("click", (ev) => {
    countdownTimer.overSettings();
  });

//adding event listener to X closer on main 'settings / modal page'
const mainSettings2 = document
  .getElementById("closer")
  .addEventListener("click", (ev) => {
    countdownTimer.overSettings();
  });

//settings time spinner
//adding an event listener when clicked to each up and down arrow
//prevent default to stop page refreshing on click
document.querySelectorAll(".uparrow, .downarrow").forEach((arrow) => {
  arrow.addEventListener("click", (ev) => ev.preventDefault());
  let timepom = minspom.value;
});

//adding one or decermenting one to the displayed value
let inc = (input) => document.getElementById(input).stepUp(1);
let dec = (input) => document.getElementById(input).stepDown(1);

//form submission and 'sending' back to settings switch statement set values and runs (start) method.
const submit = (event) => {
  event.preventDefault();
  this.timepom = minspom.value;
  this.timeshort = minsshort.value;
  this.timelong = minslong.value;
};
form.addEventListener("submit", submit);

//COLOR SELECTOR
//onclick changes adds tick/checkmark (and removes as needed) to relevant event listened orange theme element
//sends back using style.setPropery to dynamiccolor variable for use in 'setting' color theme
document.getElementById("colblock1").addEventListener("click", (ev) => {
  console.log("redclicked");
  colblock1.innerHTML = "✓";
  colblock2.innerHTML = "";
  colblock3.innerHTML = "";
  document.documentElement.style.setProperty("--dynamiccolor", "#F87070");
});

//onclick changes adds tick/checkmark to relevant event listened green theme element
//sends back using style.setPropery to dynamiccolor
document.getElementById("colblock2").addEventListener("click", (ev) => {
  console.log("greenclicked");
  colblock2.innerHTML = "✓";
  colblock1.innerHTML = "";
  colblock3.innerHTML = "";
  document.documentElement.style.setProperty("--dynamiccolor", "#70F3F8");
});

//onclick changes adds tick/checkmark to relevant event listened purple theme element
//sends back using style.setPropery to dynamiccolor using css
document.getElementById("colblock3").addEventListener("click", (ev) => {
  console.log("purpleclicked");
  colblock3.innerHTML = "✓";
  colblock1.innerHTML = "";
  colblock2.innerHTML = "";
  document.documentElement.style.setProperty("--dynamiccolor", "#D881F8");
});

//FONT SELECTOR

//onclick changes adds backround to black / font to white to relevant event listened font change 'element selector'.
//sends back using style.setPropery to dynamiccolor variable for use in 'setting' color theme of main page using css

document.getElementById("fontblock1").addEventListener("click", (ev) => {
  console.log("font1clicked");
  fontblock1.style.backgroundColor = "black";
  fontblock2.style.backgroundColor = "white";
  fontblock3.style.backgroundColor = "white";
  fontblock1.style.color = "white";
  fontblock2.style.color = "gray";
  fontblock3.style.color = "gray";
  document.documentElement.style.setProperty("--dynamicfont", "Kumbh Sans");
});

document.getElementById("fontblock2").addEventListener("click", (ev) => {
  console.log("font2clicked");
  fontblock2.style.backgroundColor = "black";
  fontblock1.style.backgroundColor = "white";
  fontblock3.style.backgroundColor = "white";
  fontblock2.style.color = "white";
  fontblock1.style.color = "gray";
  fontblock3.style.color = "gray";
  document.documentElement.style.setProperty("--dynamicfont", "Roboto");
});

document.getElementById("fontblock3").addEventListener("click", (ev) => {
  console.log("font3clicked");
  fontblock3.style.backgroundColor = "black";
  fontblock1.style.backgroundColor = "white";
  fontblock2.style.backgroundColor = "white";
  fontblock3.style.color = "white";
  fontblock1.style.color = "gray";
  fontblock2.style.color = "gray";
  document.documentElement.style.setProperty("--dynamicfont", "Space Mono");
});

//unused// code

// this.type = "pomodoro";
// this.timer = 25;
// this.interval = 1000;
// this.timetoContinue = 19;
// this.timesetter = 25;
// this.myInterval = null;
