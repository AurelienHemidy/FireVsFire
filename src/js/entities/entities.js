import * as THREE from 'three';
import {Vector2} from 'three';

const getAllTextures = () => {
    const textureLoader = new THREE.TextureLoader();

    const sapinsTexture = textureLoader.load("/sapin.png", (texture) => {
        texture.center = new Vector2(0.5, 0.5);
        texture.rotation = 1.5708
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        tuileTypesList[0].texture = texture;
    });

}

getAllTextures();

export const tuileTypesList = [
    {
        name: "sapins",
        sounds: {
            0: "",
            1: "",
            2: ""
        },
        texture: ""
    },
    {
        name: "deadLeaf",
        sounds: {
            0: "",
            1: "",
            2: ""
        },
        texture: ""
    },
    {
        name: "sequoias",
        sounds: {
            0: "",
            1: "",
            2: ""
        },
        texture: ""
    },
    {
        name: "houses",
        sounds: {
            0: "",
            1: "",
            2: ""
        },
        texture: ""
    },
    {
        name: "animals",
        sounds: {
            0: "",
            1: "",
            2: ""
        },
        texture: ""
    },
    {
        name: "field",
        sounds: {
            0: "",
            1: "",
            2: ""
        },
        texture: ""
    },
]