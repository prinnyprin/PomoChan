import './style.css';
import { ELEM, Clock, Buttons } from './ui';

/*SETUP*/
let main = ELEM.get("main");
ELEM.add(main, [Clock(), Buttons()]);

/*TIMER*/
export const Timer = (timeTotal, ui, secs) => {
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
    const setUI = () => {
        if(timeElapsed < 60){ui.innerHTML = actualTime; secs.innerHTML = timeElapsed;}
        else{
            let val = actualTime - Math.floor(timeElapsed/60);
            secs.innerHTML = timeElapsed - (Math.floor(timeElapsed/60)*60);
            (val < 10) ? ui.innerHTML = "0" + val : ui.innerHTML = val;
        }
    }
    return {timeTotal, startTimer, stopTimer};
}

/*EVENTS*/
let pomoBtn = ELEM.get("#pomo-btn");
let timeUI = ELEM.get("#time");
let secsUI = ELEM.get("#secs");
let timer = Timer(20*60, timeUI, secsUI);
let pomo = false;
let brek = false;

function setPomo(){
    if(!pomo){
        pomoBtn.innerHTML = "STOP";
        timeUI.innerHTML = "20";
        secsUI.innerHTML = "0";
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



