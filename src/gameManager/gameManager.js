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
        if(this.currentLand.type !== "river")
            this.currentLand.isBurning = true;
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

    setNewTypeOfTile(land, newType) {
        land.type = newType;
    }

    everyDayCheck() {
        console.log("Checking the board");
        const landNeighboursArray = [];
        for (let currentLandNeighbour in this.currentLandNeighbours) {
            if (this.currentLandNeighbours.hasOwnProperty(currentLandNeighbour)) {
                landNeighboursArray.push(this.currentLandNeighbours[currentLandNeighbour])
            }
          }

        console.log(this.currentLand)
        if(this.currentLand.isBurning) {
            if(this.currentLand.type === "sapins") {
                //On récupère le pourcentage de chance que la tuile soit champs, jeune pousse ou animaux
                const nextTypeOfTile = SETTINGS.tuileTypes.sapins.whenBurnt();
                //On check si le résultat est jeune pousse
                if(nextTypeOfTile === "jeunes pousses") {
                    let isSequiosNearby = false;
                    //On regarde s'il y a au moins une tuile sequioa à côté
                    landNeighboursArray.map(elm => {
                        if(elm.type === "sequoias") isSequiosNearby = true;
                    })
                    if(isSequiosNearby) {
                        setTimeout(() => {
                            this.setNewTypeOfTile("sequoias");
                        }, 10000);
                    } else {
                        //S'il n'y a pas de sequioas à côté on calcul la proba avec moins de chance
                        const nextTypeOfTileIfNoSequoiaNearby = SETTINGS.tuileTypes.sapins.whenGrow();
                        setTimeout(() => {
                            this.setNewTypeOfTile(nextTypeOfTileIfNoSequoiaNearby);
                        }, 10000);
                    }  
                }

            } else if(this.currentLand.type === "deadLeaf") {
                const nextTypeOfTile = SETTINGS.tuileTypes.deadLeaf.whenBurnt();
                // this.setNewTypeOfTile(nextTypeOfTile);

                if(nextTypeOfTile === "jeunes pousses") {
                    const nextTypeOfTile = SETTINGS.tuileTypes.sapins.whenGrow();
                    setTimeout(() => {
                        this.setNewTypeOfTile(nextTypeOfTile);
                    }, 10000);
                }

            } else if(this.currentLand.type === "sequoias" || this.currentLand.type === "houses" || this.currentLand.type === "animals") {
                //résultat incendie sur sequioas, maisons ou animaux
                setTimeout(() => {
                    this.setNewTypeOfTile("field");
                }, 10000);
            } else if(this.currentLand.type === "field") {
                //Résultat incendie sur un champ
                const nextTypeOfTile = SETTINGS.tuileTypes.field.whenBurnt();

                if(nextTypeOfTile === "jeunes pousses") {
                    const nextTypeOfTile= SETTINGS.tuileTypes.sapins.whenGrow();
                    setTimeout(() => {
                        this.setNewTypeOfTile(nextTypeOfTile);
                    }, 10000);
                }
            }
        }

      
    }

    checkProportionsOnTheMap() {
        //On check combien de tuile de tel truc est la ou pas
    }

}

export default Game;