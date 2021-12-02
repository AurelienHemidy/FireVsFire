import { SETTINGS } from '../settings/settings';
import { tuileTypesList, nextEntities } from "../js/entities/entities";
import gsap from 'gsap';
import bindAll from "../js/utils/bindAll";
import { countDown } from '../js/utils/countDown'

class Game {
    constructor(lands) {
        bindAll(
            this,
            'setCurrentLandNeighbours'
        )
        this.currentGameTime = 0;
        this.time = null;
        this.lands = lands;
        this.currentLand = null;
        this.currentLandNeighbour = null;
        this.currentLandNeighbours = null;
        this.currentLandNeighbourNeighbours = null;
        this.isSequoiasNearby = false;
        this.isSequoiasNearbyNeighbour = false;
        this.arrayCurrentLandNeighbourNeighbours = [];
        this.arrayCurrentLand = [];

        this.deadLeafTotalAtTheEnd = 0;
        this.sequoiasTotalAtTheEnd = 0;
        this.housesTotalAtTheEnd = 0;
        this.animalsTotalAtTheEnd = 0;
        this.usineTotalAtTheEnd = 0;
    }

    setCurrentGameTime(newTime) {
        this.currentGameTime = this.currentGameTime + newTime;
    }

    setCurrentLand(currentLand, fireTexture) {
        this.currentLand = currentLand;
        // console.log(this.currentLand)
        this.fireTexture = fireTexture;
        if(this.currentLand.type !== "river")
            this.currentLand.isBurning = true;
        //On check les conditions sur la tuile sur laquelle on a cliqué
        // console.log("currentLand" + this.currentLand)
        // console.log("currentLandNeighbours" + this.currentLandNeighbours)
        this.everyDayCheck(this.currentLand);
    }

    setCurrentLandNeighbour(neighbourLand) {
        this.currentLandNeighbour = neighbourLand;

        if(this.currentLandNeighbour.type !== "river")
            this.currentLandNeighbour.isBurning = true;

        setTimeout(() => {
            this.everyDayCheckNeighbour(this.currentLandNeighbour);
        }, 1000)
        
        // console.log("neighbour")
        // console.log(this.currentLandNeighbour)

        

        // console.log("currentLand" + this.currentLandNeighbour)
        // console.log("currentLandNeighbours" + this.currentLandNeighbourNeighbours)

        // this.everyDayCheck(this.currentLandNeighbour, this.currentLandNeighbourNeighbours);

        //Ensuite on check les 
        // setTimeout(() => {
        //     this.everyDayCheckNeighbour(this.currentLandNeighbour)
        // }, 1000)
    }

    setCurrentLandNeighbours(currentLandNeighbours) {
        this.currentLandNeighbours = currentLandNeighbours;

        let isSequoiaPresentArray = [];
        for (let currentLandNeighbour in this.currentLandNeighbours) {
            if (this.currentLandNeighbours.hasOwnProperty(currentLandNeighbour)) {
                isSequoiaPresentArray.push(this.currentLandNeighbours[currentLandNeighbour].type.name);
                this.arrayCurrentLand.push(this.currentLandNeighbours[currentLandNeighbour].type.name);
                // console.log(this.currentLandNeighbours[currentLandNeighbour].type.name)
            }
          }
        this.isSequoiasNearby = isSequoiaPresentArray.includes("sequoias");
        // console.log("adazf", isSequoiaPresentArray.includes("sequoias"))
        
        // console.log(this.isSequoiasNearby)
    }

    setCurrentLandNeighbourNeighbours(currentLandNeighbourNeighbours) {
        this.currentLandNeighbourNeighbours = currentLandNeighbourNeighbours;
        console.log(this.currentLandNeighbourNeighbours)

        let isSequoiaPresentArray = [];
        for (let currentLandNeighbour in this.currentLandNeighbourNeighbours) {
            if (this.currentLandNeighbourNeighbours.hasOwnProperty(currentLandNeighbour)) {
                isSequoiaPresentArray.push(this.currentLandNeighbourNeighbours[currentLandNeighbour].type.name)
                this.arrayCurrentLandNeighbourNeighbours.push(this.currentLandNeighbourNeighbours[currentLandNeighbour].type.name)
                // console.log(this.currentLandNeighbours[currentLandNeighbour].type.name)
            }
          }
        this.isSequoiasNearbyNeighbour = isSequoiaPresentArray.includes("sequoias");
        // console.log(this.currentLandNeighbourNeighbours)
        // console.log(this.currentLandNeighbour)
    }

    reset() {
        this.currentGameTime = 0;
    }

    startGame() {
        countDown("clock", 5, 0);
        // this.time = setInterval(() => {
            
        // }, 1000)
    }

    pauseGame() {
        clearInterval(this.time);
    }

    resetGame() {
        clearInterval(this.time);
        reset();
    }

    setNewTypeOfTile(land, newType) {
        console.log("type", newType)
    }

    everyDayCheck(land) {
        console.log("Checking the board");
        if(land.type.name === "river" || land.type.name === "factory")
            return

        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
        setTimeout(() => {
            land.mesh.rotation.z = 0;
            }, 0.7);
        land.mesh.material.map = this.fireTexture;
        

        if(land.isBurning) {
            if(land.type.name === "sapins") {
                //On récupère le pourcentage de chance que la tuile soit champs, jeune pousse ou animaux
                const nextTypeOfTile = SETTINGS.tuileTypes.sapins.whenBurnt();
                //On check si le résultat est jeune pousse
                if(nextTypeOfTile === "jeunes pousses") {
                    setTimeout(() =>{
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.seed;
                        // console.log(land.type)
                        land.mesh.material.map = nextEntities.seed.texture;
                    }, 750)
                    console.log("JEUNES POUSSES")
                    if(this.isSequoiasNearby === true) {
                        setTimeout(() => {
                            //S'il y a un sequoia à proximité
                            // this.setNewTypeOfTile("sequoias");
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                            // this.isSequoiasNearby = false;
                        }, 2000);
                    } else {
                        //S'il n'y a pas de sequioas à côté on calcul la proba avec moins de chance
                        const nextTypeOfTileIfNoSequoiaNearby = SETTINGS.tuileTypes.sapins.whenGrow();
                        setTimeout(() => {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            console.log("Il y aura " + nextTypeOfTileIfNoSequoiaNearby)
                            land.type = tuileTypesList[0];
                            console.log(land.type)
                            land.mesh.material.map = tuileTypesList[0].texture;
                            //this.setNewTypeOfTile(nextTypeOfTileIfNoSequoiaNearby);
                        }, 2000);
                    }  
                } else {
                    console.log("ANIMAUX")
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = tuileTypesList[5];
                        console.log(land.type)
                        land.mesh.material.map = tuileTypesList[5].texture;
                    }, 2000)
                }

            } 
            else if(land.type.name === "deadLeaf") {
                const nextTypeOfTile = SETTINGS.tuileTypes.deadLeaf.whenBurnt();

                if(nextTypeOfTile === "jeunes pousses") {
                    const nextTypeOfTile = SETTINGS.tuileTypes.sapins.whenGrow();
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.seed;
                        land.mesh.material.map = nextEntities.seed.texture;
                    }, 750);

                    setTimeout(() => {
                        if(nextTypeOfTile === "sapins") {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[0];
                            land.mesh.material.map = tuileTypesList[0].texture;
                        } else {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                        }
                    }, 2000)
                } else if(nextTypeOfTile === "animaux") {
                    //Si ce n'est pas un jeune pousse qui renait des branches mortes
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = tuileTypesList[5];
                        land.mesh.material.map = tuileTypesList[5].texture;
                    }, 750)
                } else if(nextTypeOfTile === "champs") {
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.field;
                        land.mesh.material.map = nextEntities.field.texture;
                    }, 750)
                }
            } else if(land.type.name === "sequoias" || land.type.name === "houses" || land.type.name === "animals") {
                //résultat incendie sur sequioas, maisons ou animaux
                setTimeout(() => {
                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                    land.type = nextEntities.field;
                    land.mesh.material.map = nextEntities.field.texture;
                }, 750);
            } else if(land.type.name === "champs") {
                console.log("champs")
                //Résultat incendie sur un champ
                const nextTypeOfTile = SETTINGS.tuileTypes.field.whenBurnt();

                if(nextTypeOfTile === "jeunes pousses") {
                    const nextTypeOfTile= SETTINGS.tuileTypes.sapins.whenGrow();
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.seed;
                        land.mesh.material.map = nextEntities.seed.texture;
                    }, 750);
                    setTimeout(() => {
                        if(nextTypeOfTile === "sapins") {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[0];
                            land.mesh.material.map = tuileTypesList[0].texture;
                        } else {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                        }
                    }, 2000);
                } else if(nextTypeOfTile === "champs") {
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.field;
                        land.mesh.material.map = nextEntities.field.texture;
                    }, 750);
                }
            }
        }

        // setTimeout(() => {
        //     land.mesh.material.map = this.fireTexture;
        // }, 1000)

      
    }

    everyDayCheckNeighbour(land) {
        console.log("Checking the board for the neighbour");
        console.log(land)
        if(land.type.name === "river" || land.type.name === "factory" || land === undefined)
            return

        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
        setTimeout(() => {
            land.mesh.rotation.z = 0;
            }, 0.7);
        land.mesh.material.map = this.fireTexture;
        

        if(land.isBurning) {
            if(land.type.name === "sapins") {
                //On récupère le pourcentage de chance que la tuile soit champs, jeune pousse ou animaux
                const nextTypeOfTile = SETTINGS.tuileTypes.sapins.whenBurnt();
                //On check si le résultat est jeune pousse
                if(nextTypeOfTile === "jeunes pousses") {
                    setTimeout(() =>{
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.seed;
                        // console.log(land.type)
                        land.mesh.material.map = nextEntities.seed.texture;
                    }, 750)
                    console.log("JEUNES POUSSES")
                    if(this.isSequoiasNearbyNeighbour === true) {
                        setTimeout(() => {
                            //S'il y a un sequoia à proximité
                            // this.setNewTypeOfTile("sequoias");
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                            // this.isSequoiasNearby = false;
                        }, 2000);
                    } else {
                        //S'il n'y a pas de sequioas à côté on calcul la proba avec moins de chance
                        const nextTypeOfTileIfNoSequoiaNearby = SETTINGS.tuileTypes.sapins.whenGrow();
                        setTimeout(() => {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            console.log("Il y aura " + nextTypeOfTileIfNoSequoiaNearby)
                            land.type = tuileTypesList[0];
                            console.log("land", land.type)
                            land.mesh.material.map = tuileTypesList[0].texture;
                            //this.setNewTypeOfTile(nextTypeOfTileIfNoSequoiaNearby);
                        }, 2000);
                    }  
                } else {
                    console.log("ANIMAUX")
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = tuileTypesList[5];
                        console.log(land.type)
                        land.mesh.material.map = tuileTypesList[5].texture;
                    }, 2000)
                }

            } 
            else if(land.type.name === "deadLeaf") {
                const nextTypeOfTile = SETTINGS.tuileTypes.deadLeaf.whenBurnt();

                if(nextTypeOfTile === "jeunes pousses") {
                    const nextTypeOfTile = SETTINGS.tuileTypes.sapins.whenGrow();
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.seed;
                        land.mesh.material.map = nextEntities.seed.texture;
                    }, 750);

                    setTimeout(() => {
                        if(nextTypeOfTile === "sapins") {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[0];
                            land.mesh.material.map = tuileTypesList[0].texture;
                        } else {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                        }
                    }, 2000)
                } else if(nextTypeOfTile === "animaux") {
                    //Si ce n'est pas un jeune pousse qui renait des branches mortes
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = tuileTypesList[5];
                        land.mesh.material.map = tuileTypesList[5].texture;
                    }, 750)
                } else if(nextTypeOfTile === "champs") {
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.field;
                        land.mesh.material.map = nextEntities.field.texture;
                        //Check dans les voisins si il y a un autre champ alors usine
                        console.log(this.arrayCurrentLandNeighbourNeighbours)
                        if(this.arrayCurrentLandNeighbourNeighbours.includes("champs")) {
                            setTimeout(() => {
                                gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                setTimeout(() => {
                                    land.mesh.rotation.z = 0;
                                }, 0.7);
                                land.type = nextEntities.factory;
                                land.mesh.material.map = nextEntities.factory.texture;
                            }, 1000)
                        }
                    }, 750)
                }
            } else if(land.type.name === "sequoias" || land.type.name === "houses" || land.type.name === "animals") {
                //résultat incendie sur sequioas, maisons ou animaux
                setTimeout(() => {
                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                    land.type = nextEntities.field;
                    land.mesh.material.map = nextEntities.field.texture;
                    if(this.arrayCurrentLandNeighbourNeighbours.includes("champs")) {
                        setTimeout(() => {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = nextEntities.factory;
                            land.mesh.material.map = nextEntities.factory.texture;
                        }, 1000)
                    }
                    
                }, 750);
            } else if(land.type.name === "champs") {
                console.log("champs")
                //Résultat incendie sur un champ
                const nextTypeOfTile = SETTINGS.tuileTypes.field.whenBurnt();

                if(nextTypeOfTile === "jeunes pousses") {
                    const nextTypeOfTile= SETTINGS.tuileTypes.sapins.whenGrow();
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.seed;
                        land.mesh.material.map = nextEntities.seed.texture;
                    }, 750);
                    setTimeout(() => {
                        if(nextTypeOfTile === "sapins") {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[0];
                            land.mesh.material.map = tuileTypesList[0].texture;
                        } else {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                        }
                    }, 2000);
                } else if(nextTypeOfTile === "champs") {
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.field;
                        land.mesh.material.map = nextEntities.field.texture;
                    }, 750);
                }
            }
        }      
    }

    checkProportionsOnTheMap() {
        //On check combien de tuile de tel truc est la ou pas
 
        this.lands.map(land => {
            switch(land.type.name) {
                case "deadLeaf": this.deadLeafTotalAtTheEnd++;
                    break;
                case "sequoias": this.sequoiasTotalAtTheEnd++;
                    break;
                case "houses": this.housesTotalAtTheEnd++;
                    break;
                case "animals": this.animalsTotalAtTheEnd++;
                    break;
                case "usine": this.usineTotalAtTheEnd++;
                    break;
            }
        });

        console.log(this.deadLeafTotalAtTheEnd, this.sequoiasTotalAtTheEnd, this.housesTotalAtTheEnd, this.animalsTotalAtTheEnd, this.usineTotalAtTheEnd)
    }

}

export default Game;