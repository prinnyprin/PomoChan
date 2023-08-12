import './style.css';
import { ELEM, Clock, Buttons, Progress } from './ui';

/*SETUP*/
let main = ELEM.get("main");
ELEM.add(main, [Clock(), Progress(), Buttons()]);

/*TIMER*/
export const Timer = (timeTotal, ui, bars) => {
    var timeElapsed = 0;
    var actualTime = timeTotal / 60;
    console.log(actualTime);
    var timer;
    const startTimer= () =>{
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
            bars[i].style.backgroundColor = "rgb(160, 98, 119)";
        }
    }
    const setUI = () => {
        if(timeElapsed < 60){ui.innerHTML = actualTime; setSecs(false);}
        else{
            let val = actualTime - Math.floor(timeElapsed/60);
            (val < 10) ? ui.innerHTML = "0" + val : ui.innerHTML = val;
            setSecs(true);
        }
    }
    return {timeTotal, startTimer, stopTimer, setSecs};
}

/*EVENTS*/
let pomoBtn = ELEM.get("#pomo-btn");
let timeUI = ELEM.get("#time");
let progressBars = ELEM.getAll(".progress-bar");
let timer = Timer(20*60, timeUI, progressBars);
let pomo = false;
let brek = false;

function setPomo(){
    if(!pomo){
        pomoBtn.innerHTML = "STOP";
        timeUI.innerHTML = "20";
        timer.setSecs(true);
        timer.startTimer();
        pomo = true;
    }
    else{
        pomoBtn.innerHTML = "POMO";
        timer.stopTimer();
        pomo = false;
    }
}

pomoBtn.addEventListener("click", ()=>{
    setPomo();
});



