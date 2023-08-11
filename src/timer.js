export const Timer = (timeTotal) => {
    var timeElapsed = 0;
    var timer;
    const startTimer= () =>{
        timer = setInterval(()=>{
            if(timeElapsed === timeTotal-1){
                stopTimer();
            }
            ++timeElapsed;
            console.log(timeElapsed);
        }, 1000);
    }
    const stopTimer = () => {
        clearInterval(timer);
    }
    return {timeTotal, startTimer, stopTimer};
}