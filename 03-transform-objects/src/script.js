import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//Position 
// mesh.position.x = 0.7;
// mesh.position.y = -0.6; 
// mesh.position.z = 1;
mesh.position.set(0.7, -0.6, 1);

//create a group
const group = new THREE.Group()
group.position.y = -0.5;
group.scale.y = -3;
group.rotation.y = 0.5;
scene.add(group)

//create the cubes 
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'orange'}) 
)
cube1.position.x = 3
group.add(cube1);


const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'yellow'}) 
    
)
cube2.position.x = -1;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'tomato'}) 
)
cube2.position.x = 1.5;
group.add(cube3);






//Scaling
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);

//Rotation 
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;


//Axis Helper
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);



// mesh.position.normalize();
// console.log(mesh.position.length());

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3;
scene.add(camera);

camera.lookAt(mesh.position)

// console.log(mesh.position.distanceTo(camera.position));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)