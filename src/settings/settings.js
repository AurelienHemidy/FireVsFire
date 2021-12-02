import {Vector2} from "three";

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
            counter: 0,
            proportionOnTheMapAtStart: 26,
            whenBurnt: () => getSapinsBurnt(),
            whenGrow: () => getSeedGrow()
        },
        deadLeaf: {
            canBurn: true,
            counter: 0,
            proportionOnTheMapAtStart: 30,
            whenBurnt: () => getDeadLeafBurnt()
        },
        sequoias: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 14,
            whenBurnt: () => getSequioasBurnt()
        },
        houses: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 10,
            whenBurnt: () => getSequioasBurnt()
        },
        animals: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 8,
            whenBurnt: () => getSequioasBurnt()
        },
        river: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 12
        },
        field: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 0,
            whenBurnt: () => getFieldBurnt()
        },
        seed: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 0
        },
        factory: {
            name: "Electric & Cie",
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 0,
        }
    },

    riverMapAtStart: [
        new Vector2(6, 0), new Vector2(24, 0),
        new Vector2(5, 1), new Vector2(25, 1),
        new Vector2(6, 2),
        new Vector2(7, 3),
        new Vector2(6, 4),new Vector2(8, 4), new Vector2(20, 4),
        new Vector2(19, 5),new Vector2(21, 5),
        new Vector2(20, 6),
        new Vector2(19, 7),
    ],

    jokers: {
        canadair: {
            quantity: 3,
            useCanadair() {
                if (this.quantity < 1)
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
    if (randomNumber === 0 || randomNumber === 1 || randomNumber === 2) {
        return 'jeunes pousses';
    } else {
        return 'animaux';
    }
}
const getDeadLeafBurnt = () => {
    //Get the potential Result of a burnt Sapin
    const randomNumber = Math.round(Math.random() * 3);
    if (randomNumber === 0 || randomNumber === 1 || randomNumber === 2) {
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
    if (randomNumber === 0 || randomNumber === 1) {
        return 'jeunes pousses';
    } else {
        return 'champs pavots';
    }
}

const getSeedGrow = () => {
    //Get the potential Result of a growing seed
    const randomNumber = Math.round(Math.random() * 3);
    if (randomNumber === 0 || randomNumber === 1 || randomNumber === 2) {
        return 'sapins';
    } else {
        return 'sequoias';
    }
}