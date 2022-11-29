import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/10.png");

/**
 *Scene
 */

const scene = new THREE.Scene();

/**
 * Fonts
 */
const fontLoader = new FontLoader();
const textGeometry = new TextGeometry();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
	const textGeometry = new TextGeometry("hey", {
		font: font,
		size: 1,
		height: 0.2,
		curveSegments: 5,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 4,
	});

	const textGeometryTwo = new TextGeometry("From Three.js", {
		font: font,
		size: 1,
		height: 0.2,
		curveSegments: 5,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 4,
	});

	/**
	 * Materials
	 */
	//add the bounding box
	textGeometry.computeBoundingBox();
	// Move the bounding box in the middle
	textGeometry.center();
	textGeometryTwo.center();
	//add the material
	const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
	const text = new THREE.Mesh(textGeometry, material);
	scene.add(text);
	const textTwo = new THREE.Mesh(textGeometryTwo, material);
	scene.add(textTwo);
	textTwo.position.y = -1.5;

	/**
	 * Donuts
	 */
	const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
	for (let i = 0; i < 60; i++) {
		const donut = new THREE.Mesh(donutGeometry, material);

		donut.position.x = (Math.random() - 0.5) * 10;
		donut.position.y = (Math.random() - 0.5) * 10;
		donut.position.z = (Math.random() - 0.5) * 10;

		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.y = Math.random() * Math.PI;

		const scale = Math.random();
		donut.scale.set(scale, scale, scale);
		scene.add(donut);
	}
});

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

/**
 * Axis Helper
 **/

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
// position and point the camera to the center of the scene
camera.position.x = -0.5;
camera.position.y = -1;
camera.position.z = 8;
camera.lookAt(scene.position);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
