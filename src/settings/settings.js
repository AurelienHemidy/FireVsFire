export const SETTINGS = {
    gameSettings: {
        durationOfAGame: 180000,
        durationOfADay: 2000,
    },

    windRoseAngles: {
        0: 45,
        1: 90,
        2: 135,
        3: 225,
        4: 270,
        5: 315
    },

    tuileTypes: {
        sapins: {
            canBurn: true,
            proportionOnTheMapAtStart: 26,
            whenBurnt: () => getSapinsBurnt()
        },
        deadLeaf: {
            canBurn: true,
            proportionOnTheMapAtStart: 30,
            whenBurnt: () => getDeadLeafBurnt()
        },
        sequioas: {
            canBurn: false,
            proportionOnTheMapAtStart: 14,
            whenBurnt: () => getSequioasBurnt()
        },
        houses: {
            canBurn: false,
            proportionOnTheMapAtStart: 10,
            whenBurnt: () => getSequioasBurnt()
        },
        animals: {
            canBurn: false,
            proportionOnTheMapAtStart: 8,
            whenBurnt: () => getSequioasBurnt()
        },
        river: {
            canBurn: false,
            proportionOnTheMapAtStart: 12
        },
        field: {
            canBurn: false,
            proportionOnTheMapAtStart: 0,
            whenBurnt: () => getFieldBurnt()
        },
        seed: {
            canBurn: false,
            proportionOnTheMapAtStart: 0
        },
        factory: {
            name: "Electric & Cie",
            canBurn: false,
            proportionOnTheMapAtStart: 0,
        }
    },


    jokers: {
        canadair: {
            quantity: 3,
            useCanadair() {
                if(this.quantity < 1)
                    return console.log("There's no canadair anymore")
                
                this.quantity--;
                console.log(this.quantity);
            }
        }
    }
}

const getSapinsBurnt = () => {
    //Get the potential Result of a burnt Sapin
    const randomNumber = Math.round(Math.random() * 3);
    if(randomNumber === 0 || randomNumber === 1 || randomNumber === 2) {
        return 'jeunes pousses';
    } else {
        return 'animaux';
    }
}
const getDeadLeafBurnt = () => {
    //Get the potential Result of a burnt Sapin
    const randomNumber = Math.round(Math.random() * 3);
    if(randomNumber === 0 || randomNumber === 1 || randomNumber === 2) {
        return 'animaux';
    } else {
        return 'jeunes pousses';
    }
}

const getSequiosBurnt = () => {
    return "champs pavots";
}

const getFieldBurnt = () => {
    //Get the potential Result of a burnt Sapin
    const randomNumber = Math.round(Math.random() * 3);
    if(randomNumber === 0 || randomNumber === 1) {
        return 'jeunes pousses';
    } else {
        return 'champs pavots';
    }
}