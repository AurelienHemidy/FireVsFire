import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Land from "./land";
import {Vector2} from "three";
// import * as dat from 'lil-gui'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded',
    needleAngle: 0
}

const windRoseAngles = {
    0: 45,
    1: 90,
    2: 135,
    3: 225,
    4: 270,
    5: 315
}

const textureLoader = new THREE.TextureLoader();

const textureTest1 = textureLoader.load("/sapin.png", (texture) => {
    console.log(texture)
})

gui.add(parameters, 'needleAngle', 0, 360).onChange((e) => {
    document.querySelector(".wind-needle").style.transform = `translate(-50%, -50%) rotate(${e}deg)`;
})



/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

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

const numberOfGridCellOnOneLine = 25;

const cellsSize = 0.5;
let lands = [];
let landMeshes = [];
for(let j = 0; j < numberOfGridCell; j++) {
    let offsetX = j % 2 === 1 ? cellsSize : 0;

    for(let i = 0; i < numberOfGridCell; i++) {
        const cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(cellsSize, cellsSize, .1, 6),
            new THREE.MeshBasicMaterial({color: '#293133'})
        );

        cylinder.position.x = i * (cellsSize * 2) + offsetX;
        cylinder.position.z = j * (cellsSize * 1.75);

        let land = new Land(
            cylinder,
            new Vector2(i,j),
            'tree',
            5,
            new Vector2(i,j-1),
            new Vector2(i+1,j-1),
            new Vector2(i-1,j),
            new Vector2(i+1,j),
            new Vector2(i,j+1),
            new Vector2(i+1,j+1),)

        // add land object to land object list
        lands.push(land)

        // add land mesh to land mesh list
        landMeshes.push(cylinder)

        scene.add(cylinder);
    }
}

const getGridCellsNeighbours = () => {

}

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//Rose des Vents

let windRoseTime = 500;
let currentWindDirection = 0;

const getWindRoseTime = () => {
    const newNumber = 1.5 + Math.random() * 4;

    windRoseTime = newNumber;
}

const getRandomNumberBetweenZeroAndFive = () => {
    const newNumber = Math.round(Math.random() * 5);

    return newNumber;
}

const setIntervalWindRose = setInterval(() => {
    const windRose = document.querySelector(".wind-needle");
    currentWindDirection = windRoseAngles[getRandomNumberBetweenZeroAndFive()];

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
const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()

/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

// Once click on object, get the object
window.addEventListener('click', () =>
{

    if(currentIntersect)
    {
        console.log(currentIntersect.object)
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, renderer.domElement);

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)

    controls.update();

    // Cast a ray from the mouse and handle events
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(landMeshes)

    if(intersects.length)
    {
        if(!currentIntersect)
        {
            console.log('mouse enter')
        }

        currentIntersect = intersects[0]
    }
    else
    {
        if(currentIntersect)
        {
            console.log('mouse leave')
        }

        currentIntersect = null
    }

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()