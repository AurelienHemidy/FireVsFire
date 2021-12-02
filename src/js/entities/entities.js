import * as THREE from 'three';
import {Vector2} from 'three';

const getAllTextures = () => {
    const textureLoader = new THREE.TextureLoader();

    const sapinsTexture = textureLoader.load("/sapin.png", (texture) => {
        texture.center = new Vector2(0.5, 0.5);
        texture.rotation = 1.5708
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        texture.repeat.set(1.16, 1.01);
        tuileTypesList[0].texture = texture;
    });
    const deadLeaf = textureLoader.load("/branche.png", (texture) => {
        texture.center = new Vector2(0.5, 0.5);
        texture.rotation = 1.5708
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        texture.repeat.set(1.16, 1.01);
        tuileTypesList[1].texture = texture;
    });
    const sequoiasTexture = textureLoader.load("/sequoia.png", (texture) => {
        texture.center = new Vector2(0.5, 0.5);
        texture.rotation = 1.5708
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        texture.repeat.set(1.16, 1.01);
        tuileTypesList[2].texture = texture;
    });
    const riverTexture = textureLoader.load("/riviere.png", (texture) => {
        texture.center = new Vector2(0.5, 0.5);
        texture.rotation = 1.5708
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        texture.repeat.set(1.16, 1.01);
        tuileTypesList[3].texture = texture;
    });
    const housesTexture = textureLoader.load("/maison.png", (texture) => {
        texture.center = new Vector2(0.5, 0.5);
        texture.rotation = 1.5708
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        texture.repeat.set(1.16, 1.01);
        tuileTypesList[4].texture = texture;
    });
    const animalsTexture = textureLoader.load("/animaux.png", (texture) => {
        texture.center = new Vector2(0.5, 0.5);
        texture.rotation = 1.5708
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        texture.repeat.set(1.16, 1.01);
        tuileTypesList[5].texture = texture;
    });
    const seedTexture = textureLoader.load("/jeune_pousse.png", (texture) => {
        texture.center = new Vector2(0.5, 0.5);
        texture.rotation = 1.5708
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        texture.repeat.set(1.16, 1.01);
        nextEntities.seed.texture = texture;
    });
    const fieldTexture = textureLoader.load("/champs.png", (texture) => {
        texture.center = new Vector2(0.5, 0.5);
        texture.rotation = 1.5708
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        texture.repeat.set(1.16, 1.01);
        nextEntities.field.texture = texture;
    });
    const usineTexture = textureLoader.load("/usine.png", (texture) => {
        texture.center = new Vector2(0.5, 0.5);
        texture.rotation = 1.5708
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        texture.repeat.set(1.16, 1.01);
        nextEntities.factory.texture = texture;
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
        name: "river",
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
    }
]

export const nextEntities = {
    seed: {
        name: "jeunes pousses",
        sounds: {
            0: "",
            1: "",
            2: ""
        },
        texture: ""
    },
    field: {
        name: "champs",
        sounds: {
            0: "",
            1: "",
            2: ""
        },
        texture: ""
    },
    factory: {
        name: "usine",
        sounds: {
            0: "",
            1: "",
            2: ""
        },
        texture: ""
    }
}