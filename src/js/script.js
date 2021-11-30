import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as dat from 'lil-gui'

/**
 * Debug
 */
// const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

// gui
//     .addColor(parameters, 'materialColor')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Lights

const ambientLight = new THREE.AmbientLight("#ffffff", 3);
scene.add(ambientLight)

/**
 * Test cylinder
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry( 1, 1, .1, 6 ),
    new THREE.MeshBasicMaterial({ color: '#ffff00' })
)
scene.add(cylinder)

const numberOfGridCell = 100;

for(let i = 0; i < numberOfGridCell; i++) {
    
}

//Construction of the Hex Grid

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