import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'lil-gui'
import gsap from 'gsap';

import { SETTINGS } from "../settings/settings";
import { InterleavedBuffer, Vector2 } from 'three';

import Game from "../gameManager/gameManager";

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded',
    needleAngle: 0
}

const textureLoader = new THREE.TextureLoader(); 

gui.add(parameters, 'needleAngle', 0, 360).onChange((e) => {
    // document.querySelector(".wind-needle").style.transform = `translate(-50%, -50%) rotate(${e}deg)`;
    console.log(SETTINGS.tuileTypes.sapins.whenBurnt())
})

const game = new Game();

game.startGame();



gui.add(game, "startGame");
gui.add(game, "pauseGame");
gui.add(game, "resetGame");


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const rotateZ = {
    rotate() {
        gsap.to(scene.getObjectById(13).rotation, {duration: .5, z: 6.28319, ease:"cubic-bezier(.24,.63,.12,1)"})
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
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

//Construction of the Hex Grid

const numberOfGridCellOnOneLine = 10;

const cellsSize = 0.5;

const textureArray = [];

const textureTest1 = textureLoader.load("/sapin.png", (texture) => {
    // texture.wrapS = 1002;
    // texture.wrapT = 1000;

    // cylinder.material.map = texture;
    console.log(texture);
})
const textureTest2 = textureLoader.load("/feu_500.png", (texture) => {
    // texture.wrapS = 1002;
    // texture.wrapT = 1000;

    // texture.flipY = false
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.repeat.x = - 1;
    texture.center = new Vector2(0.5, 0.5);
    texture.rotation = 1.5708
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter

    // cylinder.material.map = texture;
    console.log(texture);
})

for(let j = 0; j < numberOfGridCellOnOneLine; j++) {
    let offsetX = j % 2 === 1 ? cellsSize : 0;

    for(let i = 0; i < numberOfGridCellOnOneLine; i++) { 
        const cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry( cellsSize, cellsSize, .05, 6 ),
            new THREE.MeshBasicMaterial({ color: '#ffffff', map: textureTest2 })
        );

        cylinder.position.x = i * (cellsSize * 2) + offsetX;
        cylinder.position.z = j * (cellsSize * 1.75);
    
        scene.add(cylinder);
    }
}

const getGridCellsNeighbours = () => {

}

// setTimeout(() => {
//     gsap.to(scene.getObjectById(13).rotation, {duration: .5, z: 6.28319, ease:"cubic-bezier(.24,.63,.12,1)"});
// }, 5000);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

//Rose des Vents

let windRoseTime = 500;
let currentWindDirection = 0;

const getWindRoseTime = () => {
    const newNumber = 2 + Math.random() * 5;
    
    windRoseTime = newNumber;
}

const getRandomNumberBetweenZeroAndFive = () => {
    const newNumber = Math.round(Math.random() * 5);

    return newNumber;
} 

const setIntervalWindRose = setInterval(() => {
    const windRose = document.querySelector(".wind-needle");
    currentWindDirection = SETTINGS.windRoseAngles[getRandomNumberBetweenZeroAndFive()];

    windRose.style.transform = `translate(-50%, -50%) rotate(${currentWindDirection}deg)`;

    getWindRoseTime();
}, windRoseTime);



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
// camera.position.y = 4
// camera.rotation.x = -1.5708 / 1.2
// camera.position.x = 1

gui.add(camera.position, 'z', -10, 10)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls( camera, renderer.domElement );

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)

    controls.update();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()