import { SETTINGS } from '../settings/settings';

class Game {
    constructor() {
        this.currentGameTime = 0;
        this.time = null;
    }

    setCurrentGameTime(newTime) {
        this.currentGameTime = this.currentGameTime + newTime;
        console.log(this.currentGameTime)
    }

    reset() {
        this.currentGameTime = 0;
    }

    startGame() {
        this.time = setInterval(() => {
            this.everyDayCheck();
        }, SETTINGS.gameSettings.durationOfADay)
    }

    pauseGame() {
        clearInterval(this.time);
    }

    resetGame() {
        clearInterval(this.time);
        reset();
    }

    everyDayCheck() {
        console.log("Checking the board");
    }

}

export default Game;