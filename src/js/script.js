import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap';
import {SETTINGS} from "../settings/settings";
import {Vector2} from 'three';
import Game from "../gameManager/gameManager";
import Land from "./land";
import {tuileTypesList} from './entities/entities';
import AudioManager from "../audioManager/audioManager";

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded',
    needleAngle: 0
}

const textureLoader = new THREE.TextureLoader();


/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xFFF9F8 );

const rotateZ = {
    rotate() {
        gsap.to(scene.getObjectById(13).rotation, {duration: .5, z: 6.28319, ease: "cubic-bezier(.24,.63,.12,1)"})
        setTimeout(() => {
            scene.getObjectById(13).rotation.z = 0;
        }, 0.7);
    }
}

gui.add(rotateZ, "rotate");

//Lights

const ambientLight = new THREE.AmbientLight("#ffffff", 10);
scene.add(ambientLight)

/**
 * Test cylinder
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: '#ff0000'})
)

//Construction of the Hex Grid

const numberOfGridCellOnOneLine = 10;

const cellsSize = 0.5;
let lands = [];
let landMeshes = [];
let selectedLand = null;

const textureTest1 = textureLoader.load("/sapin.png", (texture) => {
    texture.center = new Vector2(0.5, 0.5);
    texture.rotation = 1.5708;
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
})
const fireTexture = textureLoader.load("/feu.png", (texture) => {
    texture.center = new Vector2(0.5, 0.5);
    texture.rotation = 1.5708;
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    texture.repeat.set(1.16, 1.01);
})
const seedTexture = textureLoader.load("/jeune_pousse.png", (texture) => {
    texture.center = new Vector2(0.5, 0.5);
    texture.rotation = 1.5708
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    texture.repeat.set(1.16, 1.01);
});

const getRandomLand = () => {
    const randomNumber = Math.round(Math.random() * 4);
    const tuileType = SETTINGS.tuileTypes[tuileTypesList[randomNumber].name];
    if (tuileType.proportionOnTheMapAtStart >= tuileType.counter) {
        tuileType.counter++;
        // console.log(tuileType.counter)
        return tuileType[randomNumber];
    } else {
        getRandomLand();
    }
}

const types = ['sapins','deadLeaf','sequoias','houses','animals','river']

setTimeout(() => {
    for (let j = 0; j < 8; j++) {
        let offsetX = j % 2 === 1 ? cellsSize : 0;
        for (let i = 0; i < 15; i++) {
            let x = j % 2 === 1 ? 2 * i + 1 : 2 * i;
            let randomNumber

            if (SETTINGS.riverMapAtStart.some((element) => {
                if (element[0] === x && element[1] === j) {
                    return true
                }
            })) {
                randomNumber = 3
            } else {
                randomNumber = Math.round(Math.random() * 5)
                while (randomNumber === 3 || SETTINGS.tuileTypes[types[randomNumber]].counter === SETTINGS.tuileTypes[types[randomNumber]].qtyOnTheMapAtStart){
                    randomNumber = Math.round(Math.random() * 5)
                }
                SETTINGS.tuileTypes[types[randomNumber]].counter ++
            }

            const cylinder = new THREE.Mesh(
                new THREE.CylinderGeometry(cellsSize, cellsSize, .01, 6),
                new THREE.MeshBasicMaterial({color: '#ffffff', map: tuileTypesList[randomNumber].texture})
            );

            cylinder.position.x = i * (cellsSize * 2) + offsetX;
            cylinder.position.z = j * (cellsSize * 1.75);

            // const randomLand = getRandomLand();

            let land = new Land(
                cylinder,
                new Vector2(x, j),
                tuileTypesList[randomNumber],
                5,
                new Vector2(x - 1, j - 1),
                new Vector2(x + 1, j - 1),
                new Vector2(x - 2, j),
                new Vector2(x + 2, j),
                new Vector2(x - 1, j + 1),
                new Vector2(x + 1, j + 1),)

            // add land object to land object list
            lands.push(land)

            // add land mesh to land mesh list
            landMeshes.push(cylinder)

            scene.add(cylinder);
        }
    }
}, 1000);


const game = new Game(lands);


gui.add(game, "startGame");
gui.add(game, "pauseGame");
gui.add(game, "resetGame");
gui.add(game, "checkProportionsOnTheMap");
gui.add(game, "seeUsine");
gui.add(game, "useJoker");


//Rose des Vents

let windRoseTime = 500;
let currentWindDirection = 0;

const getWindRoseTime = () => {
    const newNumber = 2 + Math.random() * 3;
    // const newNumber = 5;

    windRoseTime = newNumber;
}

const getRandomNumberBetweenZeroAndFive = () => {
    const newNumber = Math.round(Math.random() * 5);

    return newNumber;
}

const setIntervalWindRose = setInterval(() => {
    const windRose = document.querySelector(".wind-needle");
    currentWindDirection = SETTINGS.windRoseAngles[getRandomNumberBetweenZeroAndFive()];

    windRose.style.transform = `rotate(${currentWindDirection}deg)`;

    // getWindRoseTime();
    // console.log(windRoseTime)
}, 3000);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
let currentIntersect = null
const rayOrigin = new THREE.Vector3(-3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()

/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1
})


//get land from uuid
const getLandByUUID = (uuid) => {
    let resLand
    lands.map(land => {
        if (uuid === land.mesh.uuid) {
            resLand = land
        }
    })
    return resLand
}

//get land from Lands list by coord
const getLandFromLandsByCoord = (coord) => {
    let resLand
    lands.forEach(land => {
        if (coord.x === land.coord.x && coord.y === land.coord.y) {
            resLand = land
            return land
        }
    })
    return resLand
}

//get all land's neighbour
const getLandNeighbours = (land) => {
    let neighbours = {}
    neighbours.upRight = getLandFromLandsByCoord(land.landUpRightCoord)
    neighbours.right = getLandFromLandsByCoord(land.landRightCoord)
    neighbours.downRight = getLandFromLandsByCoord(land.landDownRightCoord)
    neighbours.downLeft = getLandFromLandsByCoord(land.landDownLeftCoord)
    neighbours.left = getLandFromLandsByCoord(land.landLeftCoord)
    neighbours.upLeft = getLandFromLandsByCoord(land.landUpLeftCoord)
    return neighbours
}

//get land's neighbour from by CurrentWindDirection
const getLandNeighbourByCurrentWindDirection = (land) => {
    let neighbours, resLand
    neighbours = getLandNeighbours(land)
    if (land) {
        switch (currentWindDirection) {
            case 45:
                resLand = neighbours.upRight
                break
            case 90:
                resLand = neighbours.right
                break
            case 135:
                resLand = neighbours.downRight
                break
            case 225:
                resLand = neighbours.downLeft
                break
            case 270:
                resLand = neighbours.left
                break
            case 315:
                resLand = neighbours.upLeft
                break
            default:
                break
        }
    }
    return resLand
}

const clickOnLand = () => {
    let neighbour
    if (currentIntersect) {
        selectedLand = getLandByUUID(currentIntersect.object.uuid)
        if(selectedLand.type.name === "river" || selectedLand.type.name === "factory" || selectedLand.isBurnt === true)
            return
        // game.setCurrentLand(selectedLand);
        neighbour = getLandNeighbourByCurrentWindDirection(selectedLand)
        game.setCurrentLandNeighbourNeighbours(getLandNeighbours(neighbour));
        // console.log("click neighbour", getLandNeighbourByCurrentWindDirection(selectedLand))
        game.setCurrentLand(selectedLand, fireTexture);
        game.setCurrentLandNeighbour(neighbour, fireTexture);
        // console.log(neighbour)

        // selectedLand.mesh.material.color.setHex(0xff0000)

        game.setCurrentLandNeighbours(getLandNeighbours(selectedLand));

        // neighbour.mesh.material.color.setHex(0x5900ff)
        // console.log('neighbour')
        // console.log(neighbour)
    }
    neighbour = null
    // console.log('selectedLand')
    // console.log(selectedLand.coord)
}

// Once click on object, get the object
window.addEventListener('click', clickOnLand)


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 100)
// camera.position.z = 6
camera.position.set(7.25, 14.88, 3.65);
camera.rotation.set(-1.545, 0, 0);

gui.add(camera.position, 'z', -10, 10)
scene.add(camera)

/**
 * Sound
 */
const audioManager = new AudioManager(camera,scene);
audioManager.init()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//ORBIT CONTROLS
// const controls = new OrbitControls(camera, renderer.domElement);

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)

    // controls.update();

    // Cast a ray from the mouse and handle events
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(landMeshes)

    intersects.length ? currentIntersect = intersects[0] : currentIntersect = null

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()