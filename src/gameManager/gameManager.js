import { SETTINGS, getFactoryBurnt, getTwoFieldBurnt } from '../settings/settings';
import { tuileTypesList, nextEntities } from "../js/entities/entities";
import gsap from 'gsap';
import bindAll from "../js/utils/bindAll";

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
        this.jokerUsed = false;

        this.canadairItems = document.querySelectorAll(".canadair-item");


        this.deadLeafTotalAtTheEnd = 0;
        this.sequoiasTotalAtTheEnd = 0;
        this.housesTotalAtTheEnd = 0;
        this.animalsTotalAtTheEnd = 0;
        this.usineTotalAtTheEnd = 0;

        this.useJoker();
        setTimeout(() => {
            this.checkProportionsOnTheMap();
        }, 1500)
    }

    setCurrentGameTime(newTime) {
        this.currentGameTime = this.currentGameTime + newTime;
    }

    seeUsine() {
        console.log(this.lands.filter(elm => elm.type.name === "usine"))
        for (const property in this.currentLandNeighbourNeighbours) {
            console.log(this.currentLandNeighbourNeighbours[property]);
          }
    }

    useJoker() {

        this.canadairItems.forEach((canadairItem => {
            canadairItem.addEventListener('click', () => {
                gsap.to(canadairItem, { y: 10, opacity: 0, duration: .3, ease: "cubic-bezier(.24,.63,.12,1)"})
                this.jokerUsed = true;
            });
        }));
        // const canUseJoker = SETTINGS.jokers.canadair.useCanadair();
        // this.jokerUsed = canUseJoker;
    }

    setCurrentLand(currentLand, fireTexture) {
        this.currentLand = currentLand;
        // console.log(this.currentLand)
        this.fireTexture = fireTexture;
        if(this.currentLand.type !== "river")
            this.currentLand.isBurning = true;
        this.everyDayCheck(this.currentLand);
    }

    setCurrentLandNeighbour(neighbourLand) {
        this.currentLandNeighbour = neighbourLand;

        if(this.currentLandNeighbour.type !== "river")
            this.currentLandNeighbour.isBurning = true;

        setTimeout(() => {
            this.everyDayCheckNeighbour(this.currentLandNeighbour);
        }, 1000)
    }

    setCurrentLandNeighbours(currentLandNeighbours) {
        this.currentLandNeighbours = currentLandNeighbours;

        let isSequoiaPresentArray = [];
        this.arrayCurrentLand.length = 0;
        for (let currentLandNeighbour in this.currentLandNeighbours) {
            if (this.currentLandNeighbours.hasOwnProperty(currentLandNeighbour)) {
                isSequoiaPresentArray.push(this.currentLandNeighbours[currentLandNeighbour].type.name);
                this.arrayCurrentLand.push(this.currentLandNeighbours[currentLandNeighbour].type.name);
                // console.log(this.currentLandNeighbours[currentLandNeighbour].type.name)
            }
          }
        this.isSequoiasNearby = isSequoiaPresentArray.includes("sequoias");
    }

    setCurrentLandNeighbourNeighbours(currentLandNeighbourNeighbours) {
        this.currentLandNeighbourNeighbours = currentLandNeighbourNeighbours;
        console.log(this.currentLandNeighbourNeighbours)

        let isSequoiaPresentArray = [];
        this.arrayCurrentLandNeighbourNeighbours.length = 0;
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
                    //SI JEUNE POUSSE
                    setTimeout(() =>{
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.seed;
                        land.mesh.material.map = nextEntities.seed.texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                    }, 750)
                    console.log("JEUNES POUSSES")
                    if(this.isSequoiasNearby === true) {
                        setTimeout(() => {
                            //S'il y a un sequoia à proximité
                            //SEQUOIA
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                            SETTINGS.tuileTypes[land.type.name].sound.play()
                        }, 2000);
                    } else {
                        //S'il n'y a pas de sequioas à côté on calcul la proba avec moins de chance
                        const nextTypeOfTileIfNoSequoiaNearby = SETTINGS.tuileTypes.sapins.whenGrow();

                        if(nextTypeOfTileIfNoSequoiaNearby === "sapins") {
                            //SI SAPINS
                            setTimeout(() => {
                                gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                setTimeout(() => {
                                    land.mesh.rotation.z = 0;
                                }, 0.7);
                                land.type = tuileTypesList[0];
                                land.mesh.material.map = tuileTypesList[0].texture;
                                SETTINGS.tuileTypes[land.type.name].sound.play()
                            }, 2000);
                        } else {
                            //SI SEQUIOAS
                            setTimeout(() => {
                                gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                setTimeout(() => {
                                    land.mesh.rotation.z = 0;
                                }, 0.7);
                                land.type = tuileTypesList[2];
                                land.mesh.material.map = tuileTypesList[2].texture;
                                SETTINGS.tuileTypes[land.type.name].sound.play()
                            }, 2000);
                        }
                    }  
                } else if(nextTypeOfTile === "animaux") {
                    //SI ANIMAUX
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = tuileTypesList[5];
                        console.log(land.type)
                        land.mesh.material.map = tuileTypesList[5].texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                    }, 2000)
                } else if(nextTypeOfTile === "champs") {
                    //SI CHAMPS
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.field;
                        console.log(land.type)
                        land.mesh.material.map = nextEntities.field.texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                        //CHECK SI IL Y A UN VOISIN CHAMP
                        if(this.arrayCurrentLand.includes("champs")) {
                            const nextTypeOfTile = getTwoFieldBurnt();
                                setTimeout(() => {
                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                    setTimeout(() => {
                                        land.mesh.rotation.z = 0;
                                    }, 0.7);
                                    land.type = nextEntities.factory;
                                    land.mesh.material.map = nextEntities.factory.texture;
                                    SETTINGS.tuileTypes[land.type.name].sound.play()
                                    //INCENDIE SUR TOUTES LES CASES AUTOUR
                                    for (const property in this.currentLandNeighbours) {
                                        if(this.currentLandNeighbours[property].type.name !== 'river') {
                                            this.currentLandNeighbours[property].mesh.material.map =  this.fireTexture;
                                        }  
                                    }
                                    setTimeout(() => {
                                        //SI UN JOKER N'EST PAS UTILISE, LES CASES BRULE ET L'USINE DEVIENT NOIRE
                                        if(this.jokerUsed) {
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                //Remettre les bonnes tuiles
                                                const nextTypeOfTile = getFactoryBurnt();
                                                if(nextTypeOfTile === "deadLeaf" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbours[property].type = tuileTypesList[1];
                                                    this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[1].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "houses" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbours[property].type = tuileTypesList[4];
                                                    this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[4].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "animals" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbours[property].type = tuileTypesList[5];
                                                    this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[5].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                                }
                                            }
                                            this.jokerUsed = false;
                                            land.mesh.material.transparent = true;
                                            land.mesh.material.opacity = .5;
                                            land.isBurnt = true;
                                        } else {
                                            land.mesh.material.color.setHex(0x000000);
                                            land.isBurnt = true;
                                            for (const property in this.currentLandNeighbours) {
                                                this.currentLandNeighbours[property].mesh.material.transparent = true;
                                                this.currentLandNeighbours[property].mesh.material.opacity = .5;
                                                this.currentLandNeighbours[property].isBurnt = true;
                                            }
                                        }
                                    }, 5000);
                                }, 1000)
                        }
                    }, 2000)
                }

            } 
            else if(land.type.name === "deadLeaf") {
                const nextTypeOfTile = SETTINGS.tuileTypes.deadLeaf.whenBurnt();

                if(nextTypeOfTile === "jeunes pousses") {
                    //SI JEUNE POUSSE
                    const nextTypeOfTile = SETTINGS.tuileTypes.sapins.whenGrow();
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.seed;
                        land.mesh.material.map = nextEntities.seed.texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                    }, 750);

                    setTimeout(() => {
                        if(nextTypeOfTile === "sapins") {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[0];
                            land.mesh.material.map = tuileTypesList[0].texture;
                            SETTINGS.tuileTypes[land.type.name].sound.play()
                        } else {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                            SETTINGS.tuileTypes[land.type.name].sound.play()
                        }
                    }, 2000)
                } else if(nextTypeOfTile === "animaux") {
                    //SI ANIMAUX
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = tuileTypesList[5];
                        land.mesh.material.map = tuileTypesList[5].texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                    }, 750)
                } else if(nextTypeOfTile === "champs" ) {
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.field;
                        land.mesh.material.map = nextEntities.field.texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                        //CHECK SI IL Y A UN VOISIN CHAMP
                        if(this.arrayCurrentLand.includes("champs")) {
                            const nextTypeOfTile = getTwoFieldBurnt();
                                setTimeout(() => {
                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                    setTimeout(() => {
                                        land.mesh.rotation.z = 0;
                                    }, 0.7);
                                    land.type = nextEntities.factory;
                                    land.mesh.material.map = nextEntities.factory.texture;
                                    SETTINGS.tuileTypes[land.type.name].sound.play()
                                    //INCENDIE SUR TOUTES LES CASES AUTOUR
                                    for (const property in this.currentLandNeighbours) {
                                        if(this.currentLandNeighbours[property].type.name !== 'river') {
                                            this.currentLandNeighbours[property].mesh.material.map =  this.fireTexture;
                                        }  
                                    }
                                    setTimeout(() => {
                                        //SI UN JOKER N'EST PAS UTILISE, LES CASES BRULE ET L'USINE DEVIENT NOIRE
                                        if(this.jokerUsed) {
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                //Remettre les bonnes tuiles
                                                const nextTypeOfTile = getFactoryBurnt();
                                                if(nextTypeOfTile === "deadLeaf" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbours[property].type = tuileTypesList[1];
                                                    this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[1].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "houses" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbours[property].type = tuileTypesList[4];
                                                    this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[4].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "animals" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbours[property].type = tuileTypesList[5];
                                                    this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[5].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                                }
                                            }
                                            this.jokerUsed = false;
                                            land.mesh.material.transparent = true;
                                            land.mesh.material.opacity = .5;
                                            land.isBurnt = true;
                                        } else {
                                            land.mesh.material.color.setHex(0x000000);
                                            land.isBurnt = true;
                                            for (const property in this.currentLandNeighbours) {
                                                this.currentLandNeighbours[property].mesh.material.transparent = true;
                                                this.currentLandNeighbours[property].mesh.material.opacity = .5;
                                                this.currentLandNeighbours[property].isBurnt = true;
                                            }
                                        }
                                    }, 5000);
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
                    SETTINGS.tuileTypes[land.type.name].sound.play()
                    //CHECK SI IL Y A UN VOISIN CHAMP
                    if(this.arrayCurrentLand.includes("champs")) {
                        const nextTypeOfTile = getTwoFieldBurnt();
                            setTimeout(() => {
                                gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                setTimeout(() => {
                                    land.mesh.rotation.z = 0;
                                }, 0.7);
                                land.type = nextEntities.factory;
                                land.mesh.material.map = nextEntities.factory.texture;
                                SETTINGS.tuileTypes[land.type.name].sound.play()
                                //INCENDIE SUR TOUTES LES CASES AUTOUR
                                for (const property in this.currentLandNeighbours) {
                                    if(this.currentLandNeighbours[property].type.name !== 'river') {
                                        this.currentLandNeighbours[property].mesh.material.map =  this.fireTexture;
                                    }  
                                }
                                setTimeout(() => {
                                    //SI UN JOKER N'EST PAS UTILISE, LES CASES BRULE ET L'USINE DEVIENT NOIRE
                                    if(this.jokerUsed) {
                                        for (const property in this.currentLandNeighbourNeighbours) {
                                            //Remettre les bonnes tuiles
                                            const nextTypeOfTile = getFactoryBurnt();
                                            if(nextTypeOfTile === "deadLeaf" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                setTimeout(() => {
                                                    this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                }, 0.7);
                                                this.currentLandNeighbours[property].type = tuileTypesList[1];
                                                this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[1].texture;
                                                SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                            } else if(nextTypeOfTile === "houses" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                setTimeout(() => {
                                                    this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                }, 0.7);
                                                this.currentLandNeighbours[property].type = tuileTypesList[4];
                                                this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[4].texture;
                                                SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                            } else if(nextTypeOfTile === "animals" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                setTimeout(() => {
                                                    this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                }, 0.7);
                                                this.currentLandNeighbours[property].type = tuileTypesList[5];
                                                this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[5].texture
                                                SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                            }
                                        }
                                        this.jokerUsed = false;
                                        land.mesh.material.transparent = true;
                                        land.mesh.material.opacity = .5;
                                        land.isBurnt = true;
                                    } else {
                                        land.mesh.material.color.setHex(0x000000);
                                        land.isBurnt = true;
                                        for (const property in this.currentLandNeighbours) {
                                            this.currentLandNeighbours[property].mesh.material.transparent = true;
                                            this.currentLandNeighbours[property].mesh.material.opacity = .5;
                                            this.currentLandNeighbours[property].isBurnt = true;
                                        }
                                    }
                                }, 5000);
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
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                    }, 750);
                    setTimeout(() => {
                        if(nextTypeOfTile === "sapins") {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[0];
                            land.mesh.material.map = tuileTypesList[0].texture;
                            SETTINGS.tuileTypes[land.type.name].sound.play()
                        } else {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                            SETTINGS.tuileTypes[land.type.name].sound.play()
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
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                        //CHECK SI IL Y A UN VOISIN CHAMP
                        if(this.arrayCurrentLand.includes("champs")) {
                            const nextTypeOfTile = getTwoFieldBurnt();
                                setTimeout(() => {
                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                    setTimeout(() => {
                                        land.mesh.rotation.z = 0;
                                    }, 0.7);
                                    land.type = nextEntities.factory;
                                    land.mesh.material.map = nextEntities.factory.texture;
                                    SETTINGS.tuileTypes[land.type.name].sound.play()
                                    //INCENDIE SUR TOUTES LES CASES AUTOUR
                                    for (const property in this.currentLandNeighbours) {
                                        if(this.currentLandNeighbours[property].type.name !== 'river') {
                                            this.currentLandNeighbours[property].mesh.material.map =  this.fireTexture;
                                        }  
                                    }
                                    setTimeout(() => {
                                        //SI UN JOKER N'EST PAS UTILISE, LES CASES BRULE ET L'USINE DEVIENT NOIRE
                                        if(this.jokerUsed) {
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                //Remettre les bonnes tuiles
                                                const nextTypeOfTile = getFactoryBurnt();
                                                if(nextTypeOfTile === "deadLeaf" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbours[property].type = tuileTypesList[1];
                                                    this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[1].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "houses" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbours[property].type = tuileTypesList[4];
                                                    this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[4].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "animals" && this.currentLandNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbours[property].type = tuileTypesList[5];
                                                    this.currentLandNeighbours[property].mesh.material.map = tuileTypesList[5].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbours[property].type.name].sound.play()
                                                }
                                            }
                                            this.jokerUsed = false;
                                            land.mesh.material.transparent = true;
                                            land.mesh.material.opacity = .5;
                                            land.isBurnt = true;
                                        } else {
                                            land.mesh.material.color.setHex(0x000000);
                                            land.isBurnt = true;
                                            for (const property in this.currentLandNeighbours) {
                                                this.currentLandNeighbours[property].mesh.material.transparent = true;
                                                this.currentLandNeighbours[property].mesh.material.opacity = .5;
                                                this.currentLandNeighbours[property].isBurnt = true;
                                            }
                                        }
                                    }, 5000);
                                }, 1000)

                           
                        }
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
                    //SI JEUNE POUSSE
                    setTimeout(() =>{
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.seed;
                        land.mesh.material.map = nextEntities.seed.texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                    }, 750)
                    console.log("JEUNES POUSSES")
                    if(this.isSequoiasNearby === true) {
                        setTimeout(() => {
                            //S'il y a un sequoia à proximité
                            //SEQUOIA
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                            SETTINGS.tuileTypes[land.type.name].sound.play()
                        }, 2000);
                    } else {
                        //S'il n'y a pas de sequioas à côté on calcul la proba avec moins de chance
                        const nextTypeOfTileIfNoSequoiaNearby = SETTINGS.tuileTypes.sapins.whenGrow();

                        if(nextTypeOfTileIfNoSequoiaNearby === "sapins") {
                            //SI SAPINS
                            setTimeout(() => {
                                gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                setTimeout(() => {
                                    land.mesh.rotation.z = 0;
                                }, 0.7);
                                land.type = tuileTypesList[0];
                                land.mesh.material.map = tuileTypesList[0].texture;
                                SETTINGS.tuileTypes[land.type.name].sound.play()
                            }, 2000);
                        } else {
                            //SI SEQUIOAS
                            setTimeout(() => {
                                gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                setTimeout(() => {
                                    land.mesh.rotation.z = 0;
                                }, 0.7);
                                land.type = tuileTypesList[2];
                                land.mesh.material.map = tuileTypesList[2].texture;
                                SETTINGS.tuileTypes[land.type.name].sound.play()
                            }, 2000);
                        }
                    }  
                } else if(nextTypeOfTile === "animaux") {
                    //SI ANIMAUX
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = tuileTypesList[5];
                        console.log(land.type)
                        land.mesh.material.map = tuileTypesList[5].texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                    }, 2000)
                } else if(nextTypeOfTile === "champs") {
                    //SI CHAMPS
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.field;
                        console.log(land.type)
                        land.mesh.material.map = nextEntities.field.texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                        //CHECK SI IL Y A UN VOISIN CHAMP
                        if(this.arrayCurrentLandNeighbourNeighbours.includes("champs") || this.currentLand.type.name === "champs") {
                            const nextTypeOfTile = getTwoFieldBurnt();
                                setTimeout(() => {
                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                    setTimeout(() => {
                                        land.mesh.rotation.z = 0;
                                    }, 0.7);
                                    land.type = nextEntities.factory;
                                    land.mesh.material.map = nextEntities.factory.texture;
                                    SETTINGS.tuileTypes[land.type.name].sound.play()
                                    console.log("THELAND", land)
                                    //INCENDIE SUR TOUTES LES CASES AUTOUR
                                    const arrayTexturesOfBurntTiles = [];
                                    for (const property in this.currentLandNeighbourNeighbours) {
                                        if(this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                            arrayTexturesOfBurntTiles.push(this.currentLandNeighbourNeighbours[property].mesh.material.map);
                                            this.currentLandNeighbourNeighbours[property].mesh.material.map =  this.fireTexture;
                                        }
                                    }
                                    setTimeout(() => {
                                        //SI UN JOKER N'EST PAS UTILISE, LES CASES BRULE ET L'USINE DEVIENT NOIRE
                                        if(this.jokerUsed) {
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                //Remettre les bonnes tuiles
                                                const nextTypeOfTile = getFactoryBurnt();
                                                if(nextTypeOfTile === "deadLeaf" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        land.mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[1];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[1].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "houses" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbourNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbourNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[4];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[4].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "animals" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbourNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbourNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[5];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[5].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                }
                                            }
                                            land.mesh.material.transparent = true;
                                            land.mesh.material.opacity = .3;
                                            land.isBurnt = true;
                                            this.jokerUsed = false;
                                        } else {
                                            land.mesh.material.color.setHex(0x000000);
                                            land.isBurnt = true;
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                this.currentLandNeighbourNeighbours[property].mesh.material.transparent = true;
                                                this.currentLandNeighbourNeighbours[property].mesh.material.opacity = .5;
                                                this.currentLandNeighbourNeighbours[property].isBurnt = true;
                                            }
                                        }
                                        
                                    }, 5000);
                                }, 1000)
                        }
                    }, 2000)
                }
            } 
            else if(land.type.name === "deadLeaf") {
                const nextTypeOfTile = SETTINGS.tuileTypes.deadLeaf.whenBurnt();

                if(nextTypeOfTile === "jeunes pousses") {
                    //SI JEUNE POUSSE
                    const nextTypeOfTile = SETTINGS.tuileTypes.sapins.whenGrow();
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.seed;
                        land.mesh.material.map = nextEntities.seed.texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                    }, 750);

                    setTimeout(() => {
                        if(nextTypeOfTile === "sapins") {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[0];
                            land.mesh.material.map = tuileTypesList[0].texture;
                            SETTINGS.tuileTypes[land.type.name].sound.play()
                        } else {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                            SETTINGS.tuileTypes[land.type.name].sound.play()
                        }
                    }, 2000)
                } else if(nextTypeOfTile === "animaux") {
                    //SI ANIMAUX
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = tuileTypesList[5];
                        land.mesh.material.map = tuileTypesList[5].texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                    }, 750)
                } else if(nextTypeOfTile === "champs") {
                    setTimeout(() => {
                        gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                        land.type = nextEntities.field;
                        land.mesh.material.map = nextEntities.field.texture;
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                        //SI UN CHAMP DANS LES VOISINS
                        console.log(this.arrayCurrentLandNeighbourNeighbours)
                        if(this.arrayCurrentLandNeighbourNeighbours.includes("champs") || this.currentLand.type.name === "champs") {
                            const nextTypeOfTile = getTwoFieldBurnt();
                                setTimeout(() => {
                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                    setTimeout(() => {
                                        land.mesh.rotation.z = 0;
                                    }, 0.7);
                                    land.type = nextEntities.factory;
                                    land.mesh.material.map = nextEntities.factory.texture;
                                    SETTINGS.tuileTypes[land.type.name].sound.play()
                                    console.log("THELAND", land)
                                    //INCENDIE SUR TOUTES LES CASES AUTOUR
                                    const arrayTexturesOfBurntTiles = [];
                                    for (const property in this.currentLandNeighbourNeighbours) {
                                        if(this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                            arrayTexturesOfBurntTiles.push(this.currentLandNeighbourNeighbours[property].mesh.material.map);
                                            this.currentLandNeighbourNeighbours[property].mesh.material.map =  this.fireTexture;
                                        }
                                    }
                                    setTimeout(() => {
                                        //SI UN JOKER N'EST PAS UTILISE, LES CASES BRULE ET L'USINE DEVIENT NOIRE
                                        if(this.jokerUsed) {
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                //Remettre les bonnes tuiles
                                                const nextTypeOfTile = getFactoryBurnt();
                                                if(nextTypeOfTile === "deadLeaf" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        land.mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[1];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[1].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "houses" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbourNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbourNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[4];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[4].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "animals" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbourNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbourNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[5];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[5].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                }
                                            }
                                            land.mesh.material.transparent = true;
                                            land.mesh.material.opacity = .3;
                                            land.isBurnt = true;
                                            this.jokerUsed = false;
                                        } else {
                                            land.mesh.material.color.setHex(0x000000);
                                            land.isBurnt = true;
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                this.currentLandNeighbourNeighbours[property].mesh.material.transparent = true;
                                                this.currentLandNeighbourNeighbours[property].mesh.material.opacity = .5;
                                                this.currentLandNeighbourNeighbours[property].isBurnt = true;
                                            }
                                        }
                                        
                                    }, 5000);
                                }, 1000)
                        }
                    }, 750)
                }
            } else if(land.type.name === "sequoias" || land.type.name === "houses" || land.type.name === "animaux") {
                //résultat incendie sur sequioas, maisons ou animaux
                setTimeout(() => {
                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                        setTimeout(() => {
                            land.mesh.rotation.z = 0;
                        }, 0.7);
                    land.type = nextEntities.field;
                    land.mesh.material.map = nextEntities.field.texture;
                        //CHECK SI IL YA UN VOISIN CHAMP
                        console.log(this.arrayCurrentLandNeighbourNeighbours);
                        if(this.arrayCurrentLandNeighbourNeighbours.includes("champs") || this.currentLand.type.name === "champs") {
                            const nextTypeOfTile = getTwoFieldBurnt();
                                setTimeout(() => {
                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                    setTimeout(() => {
                                        land.mesh.rotation.z = 0;
                                    }, 0.7);
                                    land.type = nextEntities.factory;
                                    land.mesh.material.map = nextEntities.factory.texture;
                                    SETTINGS.tuileTypes[land.type.name].sound.play()
                                    console.log("THELAND", land)
                                    //INCENDIE SUR TOUTES LES CASES AUTOUR
                                    const arrayTexturesOfBurntTiles = [];
                                    for (const property in this.currentLandNeighbourNeighbours) {
                                        if(this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                            arrayTexturesOfBurntTiles.push(this.currentLandNeighbourNeighbours[property].mesh.material.map);
                                            this.currentLandNeighbourNeighbours[property].mesh.material.map =  this.fireTexture;
                                        }
                                    }
                                    setTimeout(() => {
                                        //SI UN JOKER N'EST PAS UTILISE, LES CASES BRULE ET L'USINE DEVIENT NOIRE
                                        if(this.jokerUsed) {
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                //Remettre les bonnes tuiles
                                                const nextTypeOfTile = getFactoryBurnt();
                                                if(nextTypeOfTile === "deadLeaf" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        land.mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[1];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[1].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "houses" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbourNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbourNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[4];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[4].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "animals" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbourNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbourNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[5];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[5].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                }
                                            }
                                            land.mesh.material.transparent = true;
                                            land.mesh.material.opacity = .3;
                                            land.isBurnt = true;
                                            this.jokerUsed = false;
                                        } else {
                                            land.mesh.material.color.setHex(0x000000);
                                            land.isBurnt = true;
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                this.currentLandNeighbourNeighbours[property].mesh.material.transparent = true;
                                                this.currentLandNeighbourNeighbours[property].mesh.material.opacity = .5;
                                                this.currentLandNeighbourNeighbours[property].isBurnt = true;
                                            }
                                        }
                                        
                                    }, 5000);
                                }, 1000);
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
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                    }, 750);
                    setTimeout(() => {
                        if(nextTypeOfTile === "sapins") {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[0];
                            land.mesh.material.map = tuileTypesList[0].texture;
                            SETTINGS.tuileTypes[land.type.name].sound.play()
                        } else {
                            gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                            setTimeout(() => {
                                land.mesh.rotation.z = 0;
                            }, 0.7);
                            land.type = tuileTypesList[2];
                            land.mesh.material.map = tuileTypesList[2].texture;
                            SETTINGS.tuileTypes[land.type.name].sound.play()
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
                        SETTINGS.tuileTypes[land.type.name].sound.play()
                        //CHECK SI IL Y A UN VOISIN CHAMP
                        console.log(this.arrayCurrentLandNeighbourNeighbours);
                        if(this.arrayCurrentLandNeighbourNeighbours.includes("champs") || this.currentLand.type.name === "champs") {
                            const nextTypeOfTile = getTwoFieldBurnt();
                                setTimeout(() => {
                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                    setTimeout(() => {
                                        land.mesh.rotation.z = 0;
                                    }, 0.7);
                                    land.type = nextEntities.factory;
                                    land.mesh.material.map = nextEntities.factory.texture;
                                    console.log("THELAND", land)
                                    //INCENDIE SUR TOUTES LES CASES AUTOUR
                                    const arrayTexturesOfBurntTiles = [];
                                    for (const property in this.currentLandNeighbourNeighbours) {
                                        if(this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                            arrayTexturesOfBurntTiles.push(this.currentLandNeighbourNeighbours[property].mesh.material.map);
                                            this.currentLandNeighbourNeighbours[property].mesh.material.map =  this.fireTexture;
                                        }
                                    }
                                    setTimeout(() => {
                                        //SI UN JOKER N'EST PAS UTILISE, LES CASES BRULE ET L'USINE DEVIENT NOIRE
                                        if(this.jokerUsed) {
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                //Remettre les bonnes tuiles
                                                const nextTypeOfTile = getFactoryBurnt();
                                                if(nextTypeOfTile === "deadLeaf" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(land.mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        land.mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[1];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[1].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "houses" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbourNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbourNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[4];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[4].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                } else if(nextTypeOfTile === "animals" && this.currentLandNeighbourNeighbours[property].type.name !== 'river') {
                                                    gsap.to(this.currentLandNeighbourNeighbours[property].mesh.rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
                                                    setTimeout(() => {
                                                        this.currentLandNeighbourNeighbours[property].mesh.rotation.z = 0;
                                                    }, 0.7);
                                                    this.currentLandNeighbourNeighbours[property].type = tuileTypesList[5];
                                                    this.currentLandNeighbourNeighbours[property].mesh.material.map = tuileTypesList[5].texture;
                                                    SETTINGS.tuileTypes[this.currentLandNeighbourNeighbours[property].type.name].sound.play()
                                                }
                                            }
                                            land.mesh.material.transparent = true;
                                            land.mesh.material.opacity = .3;
                                            land.isBurnt = true;
                                            this.jokerUsed = false;
                                        } else {
                                            land.mesh.material.color.setHex(0x000000);
                                            land.isBurnt = true;
                                            for (const property in this.currentLandNeighbourNeighbours) {
                                                this.currentLandNeighbourNeighbours[property].mesh.material.transparent = true;
                                                this.currentLandNeighbourNeighbours[property].mesh.material.opacity = .5;
                                                this.currentLandNeighbourNeighbours[property].isBurnt = true;
                                            }
                                        }
                                        
                                    }, 5000);
                                }, 1000);
                        }
                    }, 750);
                }
            }
        }      
    }

    checkProportionsOnTheMap() {
        //On check combien de tuile de tel truc est la ou pas
        this.deadLeafTotalAtTheEnd = 0;
        this.sequoiasTotalAtTheEnd = 0;
        this.housesTotalAtTheEnd = 0;
        this.animalsTotalAtTheEnd = 0;
        this.usineTotalAtTheEnd = 0;
 
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
            // if(land.isBurning || land.isBurnt) {
            //     console.log(land)
            // }
        });



        const fireItem = document.querySelector(".fire")
        const sequoiaItem = document.querySelector(".sequoia")
        const houseItem = document.querySelector(".houses")
        const animalItem = document.querySelector(".animals")
        const factoryItem = document.querySelector(".factory")

        fireItem.style.color = this.deadLeafTotalAtTheEnd < 1 ? "#19816F" : "#F86172";
        sequoiaItem.style.color = this.sequoiasTotalAtTheEnd <= 30 ? "#19816F" : "#F86172";
        houseItem.style.color = this.housesTotalAtTheEnd <= 10 ? "#19816F" : "#F86172";
        animalItem.style.color = this.animalsTotalAtTheEnd <= 30 ? "#19816F" : "#F86172";
        factoryItem.style.color = this.usineTotalAtTheEnd <= 30 ? "#19816F" : "#F86172";

        fireItem.innerHTML = this.deadLeafTotalAtTheEnd;
        sequoiaItem.innerHTML = this.sequoiasTotalAtTheEnd;
        houseItem.innerHTML = this.housesTotalAtTheEnd;
        animalItem.innerHTML = this.animalsTotalAtTheEnd;
        factoryItem.innerHTML = this.usineTotalAtTheEnd;
    

        // console.log(this.deadLeafTotalAtTheEnd, this.sequoiasTotalAtTheEnd, this.housesTotalAtTheEnd, this.animalsTotalAtTheEnd, this.usineTotalAtTheEnd)
    }

}

export default Game;