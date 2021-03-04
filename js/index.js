class Timer {

    constructor() {
        this.type = "pomodoro";
        this.timeLeft = 25;
        this.clock = document.getElementById("time");
        this.action = document.getElementById("action");
        this.circle1 = document.getElementById("circle");
        this.buttonshort = document.getElementById("buttonshort");
        this.buttonlong = document.getElementById("buttonlong");
        this.buttonpomo = document.getElementById("buttonpomo")
        this.time = document.getElementById("time")
        // this.audio1=document.getElementById("sound1")
        this.time.innerHTML = this.timeLeft + ":00";
        this.selectors = document.querySelectorAll("li");
        this.timer = 25;
        this.paused = false;
        this.interval = 1000;
        this.timetoContinue = 19;
        this.timesetter = 25;
        this.myInterval = null;

    }
    reset() {
    }

    settings() {
        this.selectors.forEach((item, index) => {
            // console.log(item.innerHTML)
            // console.log(item.classList)

            if (item.classList == "active") {
                let selectedwords = item.innerHTML
                let settime = 25
                // console.log(selectedwords)

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
                countdownTimer.start(settime)

            }
            // console.log(settime)
        })
        // console.log(this.settime)
    }

    resume() {
        console.log("RESUME", this.timeLeft)
        this.paused = false;
        this.start(this.timeLeft / 60)
    }

    start(timeLeft) {
        clearInterval(this.myInterval); // reset
        console.log("TIMELEFTatstart", timeLeft)
        this.action.innerHTML = "PAUSE"
        this.timeLeft = timeLeft * 60 ;
        this.startingtime = this.timeLeft;
        let scope = this;
        this.myInterval = setInterval(function () {
            let seconds = Math.floor(scope.timeLeft % 60);
            let minutes = Math.floor(scope.timeLeft / 60);
            if (seconds < 10) { seconds = "0" + seconds }
            if (minutes < 10) { minutes = "0" + minutes }
            if (scope.timeLeft == 0) {
                console.log("HERE",scope.timeLeft)
                clearInterval(scope.myInterval);
                scope.clock.innerText = "00:00";
                console.log("AUDIOSTOP");
                return
            }
            console.log(scope.paused);
            if (!scope.paused) {
                console.log("NOT PAUSED")
                // else { return };
                scope.clock.innerText = `${minutes}:${seconds}`;
                scope.circle1.style.strokeDashoffset = scope.timeLeft / (scope.startingtime / 1024);
                clearInterval(this.myInterval);
            }

            while (scope.paused) {
                console.log("IS PAUSED")
                scope.clock.innerText = `${minutes}:${seconds}`;
                scope.circle1.style.strokeDashoffset = scope.timeLeft / (scope.startingtime / 1024);
                // let timo = scope.timeLeft;
                scope.action.innerHTML = "RESUME";

                clearInterval(scope.myInterval);
                // action(scope.action.innerHTML, timo);
                return
            }

            console.log("outside-pause")
            scope.timeLeft = scope.timeLeft - 1
            // console.log("IN START TIME LEFT", scope.timeLeft)
        }, 1);

    }

    pause() {
        console.log(this.timeLeft)
        let scope1=this
        this.paused = true;

    }

    
    }
    
    


const countdownTimer = new Timer();
// countdownTimer.reset();
function action(str) {
    let apple=this.timeLeft
    // alert("fired")
    switch (str.toLowerCase()) {
        case "start":
            // alert("great")
            countdownTimer.start(25)
            break;
        case "pause":
            countdownTimer.pause()
            break;
        case "resume":
            // console.log("THISTIMELEFT",this.timeLeft)
            countdownTimer.resume()
                break;
        default:
            countdownTimer.stop();
            break;
    }
}

// this.selector()
// countdownTimer.start()


//NAV LINKS//

const navbuttons = document.querySelectorAll("li");
let navBg = document.getElementById("bgindicator");
navbuttons.forEach((item, index) => {
    navbuttons.item(index).addEventListener("click", (ev) => {
        let movement = index * 118 + 25
        navBg.style.marginLeft = `${movement}px`;
        navbuttons.forEach(link => link.classList.remove("active"))
        ev.target.classList.add("active")
        countdownTimer.settings()

    })
}
);

// let audio1 = document.getElementById("sound1")
// audio1.play();

// selector() {
//     this.breakselect.forEach(item => {
//         item.addEventListener('click', event => {
//             console.log(event.target)
//         }
//         )
//     })


// class Timer {
//     constructor() {
//         this.clock = document.getElementById("time");
//         this.actionElement = document.getElementById("action");
//         this.timer = 25;
//         this.text = this.timer <= 9 ? "0" + this.timer : this.timer;


//     }

//     reset() {
//         this.stop()
//         this.timer = 25;
//         this.actionElement.innerText = "START";
//         this.clock.innerText = this.text = ":00";
//     }
//     start() {
//         function format(time) {
//             return timeFormat < 10 ? 0 + timeFormat : timeFormat;
//         }
//         this.actionElement.innerText = "START";

//         let time = this.timer * 60;
//         let minutes = 0;
//         let seconds = 0;

//         this.interval = setInterval(() => {
//             minutes = Math.floor(time / 60);
//             seconds = Math.floor(time % 60);

//             let minutesText = format(minutes)
//             let secondsText = format(seconds)
//             this.clock.innerText = minutesText + ":" + secondsText;

//             if (--time <= 0) {
//                 this.timer = 0;
//                 clearInterval(this.interval);
//             }

//         }, 1000);
//         thisactionElement.innerText = "PAUSE";
//     }
//     stop() {
//         clearInterval(this.interval);
//         this.actionElement.innerText = "START";
//     }
// }