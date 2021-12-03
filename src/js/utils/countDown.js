export const countDown = (element, minutes, seconds) => {
    let time = minutes * 60 + seconds;
    let interval = setInterval(function() {
        let el = document.querySelector(`.${element}`);
        if (time <= 0) {
            let text = "Fin";
            el.innerHTML = text;
            clearInterval(interval);
            return;
        }
        let minutes = Math.floor( time / 60 );
        if (minutes < 10) minutes = "0" + minutes;
        let seconds = time % 60;
        if (seconds < 10) seconds = "0" + seconds; 
        let text = minutes + ':' + seconds;
        el.innerHTML = text;
        // console.log(text)
        time--;
    }, 1000);
}
