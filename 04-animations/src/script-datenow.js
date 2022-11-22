import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

  //Get the time 
  let time = Date.now()
   

//Animations 
const tick = () => {
    //get the current time
    const currentTime = Date.now();
    //get the delta time 
    const deltaTime = currentTime - time;
    //updating the time for the next tick
    time = currentTime;

    //console.log(deltaTime);

//update the objects
mesh.rotation.y +=0.001 * deltaTime;

//Render
 renderer.render(scene, camera)
 window.requestAnimationFrame(tick);
}

tick();

