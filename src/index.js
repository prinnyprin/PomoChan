import './style.css';
import { ELEM, Clock, Buttons, Progress, Alarm } from './ui';

/*SETUP*/
let main = ELEM.get("main");
ELEM.add(main, [Clock(), Progress(), Buttons(), Alarm()]);
let alarmBox = ELEM.get("#alarm");

/*TIMER*/
export const Timer = (timeTotal, ui, bars) => {
    var timeElapsed = 0;
    var actualTime = timeTotal / 60;
    var done = false;
    var audio = new Audio("ContenderTrackTribe.mp3");
    var timer;
    const startTimer= () =>{
        done = false;
        timer = setInterval(()=>{
            if(timeElapsed === timeTotal-1){
                stopTimer();
            }
            ++timeElapsed;
            setUI();
        }, 1000);
    }
    const stopTimer = () => {
        clearInterval(timer);
    }
    const setSecs = (reset) => {
        if(!reset){
            if(timeElapsed < 60){bars[timeElapsed-1].style.backgroundColor = "rgb(160, 98, 119)";}
        }
        else{
            let i = timeElapsed - (Math.floor(timeElapsed/60)*60);
            if(i == 0){
                bars.forEach(bar =>{
                    bar.style.backgroundColor = "transparent";
                })
            }
            if(!done){bars[i].style.backgroundColor = "rgb(160, 98, 119)";}
        }
    }
    const setUI = () => {
        if(timeElapsed < 60){ui.innerHTML = actualTime; setSecs(false);}
        else{
            let val = actualTime - Math.floor(timeElapsed/60);
            ui.innerHTML = val;
            if(val == 0){alarm(true);}
            setSecs(true);
        }
    }
    function alarm(on){
        if(on){
            done = true;
            stopTimer();
            alarmBox.style.display = "flex";
            audio.play();
        }
        else{
            audio.pause();
            audio.currentTime = 0;
        }
    }
    return {timeTotal, startTimer, stopTimer, setSecs, actualTime, alarm};
}

/*EVENTS*/
let pomoBtn = ELEM.getAll(".pomo-btn");
let timeUI = ELEM.get("#time");
let progressBars = ELEM.getAll(".progress-bar");
let timer = Timer(1*60, timeUI, progressBars);
let pomo = false;
let brek = false;



function setPomo(){
    if(!pomo){
        timer.setSecs(true);
        timer.startTimer();
        pomoBtn[0].innerHTML = "STOP";
        pomo = true;
    }
    else{
        pomoBtn[0].innerHTML = "POMO";
        timer.stopTimer();
        pomo = false;
    }
}

pomoBtn[0].addEventListener("click", ()=>{
    setPomo();
});

pomoBtn[1].addEventListener("click", ()=>{
    alarmBox.style.display = "none";
    timer.alarm(false);
    setPomo();
});
