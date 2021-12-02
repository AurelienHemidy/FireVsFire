import {Vector2} from "three";
import * as THREE from "three";
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
            qtyOnTheMapAtStart: 31,
            sound: '',
            whenBurnt: () => getSapinsBurnt(),
            whenGrow: () => getSeedGrow()
        },
        deadLeaf: {
            canBurn: true,
            counter: 0,
            proportionOnTheMapAtStart: 30,
            qtyOnTheMapAtStart: 36,
            sound: '',
            whenBurnt: () => getDeadLeafBurnt()
        },
        sequoias: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 14,
            qtyOnTheMapAtStart: 17,
            sound: '',
            whenBurnt: () => getSequioasBurnt()
        },
        river: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 12,
            qtyOnTheMapAtStart: 14,
            sound: '',
        },
        houses: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 10,
            qtyOnTheMapAtStart: 12,
            sound: '',
            whenBurnt: () => getSequioasBurnt()
        },
        animals: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 8,
            qtyOnTheMapAtStart: 10,
            sound: '',
            whenBurnt: () => getSequioasBurnt()
        },
        field: {
            canBurn: false,
            counter: 0,
            proportionOnTheMapAtStart: 0,
            sound: '',
            whenBurnt: () => getFieldBurnt()
        },
        seed: {
            canBurn: false,
            counter: 0,
            sound: '',
            proportionOnTheMapAtStart: 0
        },
        factory: {
            name: "Electric & Cie",
            canBurn: false,
            counter: 0,
            sound: '',
            proportionOnTheMapAtStart: 0,
        }
    },

    riverMapAtStart: [
        [6, 0], [24, 0],
        [5, 1], [25, 1],
        [6, 2],
        [7, 3],
        [6, 4],[8, 4], [20, 4],
        [19, 5],[21, 5],
        [20, 6],
        [19, 7],
    ],

    jokers: {
        canadair: {
            quantity: 3,
            useCanadair() {
                if (this.quantity < 1){
                    return false
                } else {
                    this.quantity--;
                    console.log(this.quantity);
                    return true;
                }    
            }
        }
    }
}


const playSound = (typeOfTile) =>{

}

const getSapinsBurnt = () => {
    //Get the potential Result of a burnt Sapin
    const randomNumber = Math.round(Math.random() * 3);
    if (randomNumber === 0) {
        return 'champs'
    } else if(randomNumber === 1) {
        return 'animaux';
    } else {
        return 'jeunes pousses';
    }
}
const getDeadLeafBurnt = () => {
    //Get the potential Result of a burnt Sapin
    const randomNumber = Math.round(Math.random() * 3);
    if (randomNumber === 0) {
        return 'jeunes pousses'
    } else if(randomNumber === 1) {
        return 'animaux';
    } else {
        return 'champs';
    }
}

const getSequiosBurnt = () => {
    return "champs";
}

const getFieldBurnt = () => {
    //Get the potential Result of a burnt Sapin
    const randomNumber = Math.round(Math.random() * 3);
    if (randomNumber === 0 || randomNumber === 1) {
        return 'jeunes pousses';
    } else {
        return 'champs';
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

export const getFactoryBurnt = () => {
    const randomNumber = Math.round(Math.random() * 3);
    if (randomNumber === 0 || randomNumber === 1) {
        return 'deadLeaf';
    } else if(randomNumber === 2) {
        return 'houses';
    } else {
        return 'animaux';
    }
}