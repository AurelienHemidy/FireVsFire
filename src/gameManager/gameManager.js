import { SETTINGS } from '../settings/settings';

class Game {
    constructor(lands) {
        this.currentGameTime = 0;
        this.time = null;
        this.lands = lands;
        this.currentLand = null;
        this.currentLandNeighbours = null;
    }

    setCurrentGameTime(newTime) {
        this.currentGameTime = this.currentGameTime + newTime;
        console.log(this.currentGameTime)
    }

    setCurrentLand(currentLand) {
        this.currentLand = currentLand;
    }

    setCurrentLandNeighbours(currentLandNeighbours) {
        this.currentLandNeighbours = currentLandNeighbours;
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
        // if(this.currentLand.canBurn)
        // console.log(this.currentLand)
        // console.log(this.currentLandNeighbours)
        //Si il brule
        //Alors on check son 

        //Check si sequioas

        //

        for (let currentLandNeighbour in this.currentLandNeighbours) {
            if (this.currentLandNeighbours.hasOwnProperty(currentLandNeighbour)) {
                console.log(this.currentLandNeighbours[currentLandNeighbour])
            }
          }
    }

    checkProportionsOnTheMap() {
        //On check combien de tuile de tel truc est la ou pas
    }

}

export default Game;