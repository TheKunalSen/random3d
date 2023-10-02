import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import gsap from "./node_modules/gsap";

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 1;
camera.lookAt(2000,0,0);


const scene = new THREE.Scene();
const canvas = document.querySelector('#jihad');

const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({
  color: "#e300e3",
  // wireframe: true,
});



for(let i = 0; i <2000;i++) {
  const particles = new THREE.SphereGeometry(5, 12, 12); 
  const particalMaterial = new THREE.MeshBasicMaterial( {color: "#fff"} ); 
  const cube = new THREE.Mesh( particles, particalMaterial ); 

  const x = Math.floor(Math.random() * 600) - 300;
  const y = Math.floor(Math.random() * 650) - 350;
  const z = Math.floor(Math.random() * 190) - 90;
  cube.position.set(5,1,10)
 gsap.to(cube.position, {
x:x,
z:y,

y:z,
delay:2,
ease: 'easeIn',
scrub:3,
duration:17,

 })

 gsap.to(cube.scale,{
  z:0.7,
  delay:3,
  duration:4
 })
  cube.scale.set(0.05, 0.05, 0.05);
   scene.add( cube );
   // Event listener for mouse hover


 
  // if( (x <0.5 && x>-0.5)|| (y <0.5 && y>-0.5) || (z <0.5 && z>-0.5)) {

  // }
  // else {
 
  // }
  

}


camera.position.set(0,0,40)
const initialCameraPosition = new THREE.Vector3(0, 0, 5); // Set your initial camera position
const targetCameraPosition = new THREE.Vector3(0, 2, 5); // Set your target camera position
// 5-40
// Animate the camera position using GSAP
function updateCameraPosition() {
  camera.position.lerp(targetCameraPosition, 0.05);
}

const animationDuration = 7; // Duration in seconds


let jihad = true;
document.querySelector('button').addEventListener('click', () =>{
  if (jihad) {
    gsap.to(camera.position, {
     z:200,
 
  
      duration: animationDuration,
      // delay:2,
      ease: 'easeInOut',
      // onUpdate: updateCameraPosition,
      onComplete: () => {
        // Animation completed
      },
    });
    jihad = false;
  
//   gsap.to(  camera.fov, {
// fov: 100
//   })
}

  else {
    gsap.to(camera.position, {
     
      z: -500,
      ease: 'easeInOut',
      duration: animationDuration,
      // delay:2,
      // onUpdate: updateCameraPosition,
      onComplete: () => {
        // Animation completed
      },
    });
    jihad = true;
  }
})

const sphere = new THREE.Mesh(geometry, material);

// scene.add(sphere);
sphere.scale.set(5, 5, 5);

const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);


// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.enableZoom = true;
// controls.zoomSpeed = 1.9;

// controls.dispose();
const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0.1;
bloomPass.strength = 1;
bloomPass.radius = 0.9;

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.setSize(window.innerWidth, window.innerHeight);

function animation(time) {
  composer.render(scene, camera);
  // controls.update();

  // renderer.render( scene, camera );
}
