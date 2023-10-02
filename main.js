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
  10000
);
camera.position.z = 1;
camera.lookAt(0,2000,0);
camera.position.set(0,-200,0)

const scene = new THREE.Scene();
const canvas = document.querySelector('#jihad');

const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({
  color: "#e300e3",
  // wireframe: true,
});

let mats= [];
let part_num = 5000;
for(let i = 0; i <part_num;i+=1) {
  const particles = new THREE.SphereGeometry(5, 5, 5); 
  const particalMaterial = new THREE.MeshBasicMaterial( {color: "#fff"} ); 
  var cube = new THREE.Mesh( particles, particalMaterial ); 
mats.push(cube);

// const angle = Math.random() * Math.PI * 2;
  
//   // Generate a random radius between 0 and a certain maximum radius (e.g., 100 units)
//   const maxRadius = 100;
//   const radius = Math.random() * maxRadius;
  
//   // Convert polar coordinates to Cartesian coordinates
//   const x = radius * Math.cos(angle);
//   const y = radius * Math.sin(angle);
  
//   // Set a constant z-coordinate if you want a flat disk
//   const z = 0;


// const theta = Math.random() * Math.PI * 2;  // Azimuth angle (0 to 2π)
// const phi = Math.acos(2 * Math.random() - 1);  // Inclination angle (0 to π)
// const radius = 100;  // Adjust the radius as needed

// // Generate random points on the hollow sphere

// const x = radius * Math.sin(phi) * Math.cos(theta);
// const y = radius * Math.sin(phi) * Math.sin(theta);
// const z = radius * Math.cos(phi);


  // const x = Math.floor(Math.random() * 600) - 300;
  // const y = Math.floor(Math.random() * 250) - 150;
  // const z = Math.floor(Math.random() * 190) - 90;
//   const radius = Math.random() * 100; // Adjust the radius as needed
// const theta = Math.random() * Math.PI * 2; // Random angle around the vertical axis
// const phi = Math.random() * Math.PI; // Random angle from the top (zenith) to the bottom (nadir) of the sphere
// const x = radius * Math.sin(phi) * Math.cos(theta);
// const y = radius * Math.sin(phi) * Math.sin(theta);
// const z = radius * Math.cos(phi);

const a = 100;
const t = Math.random() * 2 * Math.PI;
    
// Calculate 'x' and 'y' based on the Lemniscate equations
const x = (a * Math.cos(t)) / (1 + Math.sin(t) ** 2);
const y = (a * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) ** 2);

// Generate random values for 'z' within your desired range
const z = Math.floor(Math.random() * 190) - 90;
  cube.position.set(5,1,10)
 gsap.to(cube.position, {
x:x,
z:y,

y:z,
delay:2,
ease: 'easeInOut',
scrub:3,
duration:17,

 })



  cube.scale.set(0.05, 0.05, 0.05);
   scene.add( cube );
   // Event listener for mouse hover


 
  // if( (x <0.5 && x>-0.5)|| (y <0.5 && y>-0.5) || (z <0.5 && z>-0.5)) {

  // }
  // else {
 
  // }
  

}
console.log(mats)




const initialCameraPosition = new THREE.Vector3(0, 0, 5); // Set your initial camera position
const targetCameraPosition = new THREE.Vector3(0, 2, 5); // Set your target camera position
// 5-40
// Animate the camera position using GSAP
function updateCameraPosition() {
  camera.position.lerp(targetCameraPosition, 0.05);
}

const animationDuration = 5; // Duration in seconds


let jihad = true;
document.querySelector('button').addEventListener('click', () =>{
  if (jihad) {
    gsap.to(camera.position, {
     y:200,
 
  
      duration: animationDuration,
      // delay:5,
      ease: 'easeInOut',
      // onUpdate: updateCameraPosition,
      onComplete: () => {
        // Animation completed
      },
    });
     gsap.to(camera, {
        fov: 200,
        duration: 10, // Animation duration in seconds
        onUpdate: function () {
            camera.updateProjectionMatrix(); // Update the camera's projection matrix
        },
    });

    mats.forEach((mat) =>{
      gsap.to(mat.scale,{
        y:2,
       delay:-1,
        duration:10,
        ease: 'easeInOut',
       });
    })
   
    jihad = false;
  
//   gsap.to(  camera.fov, {
// fov: 100
//   })
}

  else {
    gsap.to(camera.position, {
     
      y: -500,
      ease: 'easeInOut',
      duration: animationDuration,
      // delay:2,
      // onUpdate: updateCameraPosition,
      onComplete: () => {
        // Animation completed
      },
    });
        gsap.to(camera, {
        fov: 10,
        duration: 10, // Animation duration in seconds
        onUpdate: function () {
            camera.updateProjectionMatrix(); // Update the camera's projection matrix
        },
    });
    mats.forEach((mat) =>{
      gsap.to(mat.scale,{
        y:0,
       delay:-1,
        duration:10,
        ease: 'easeInOut',
       });
    })
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
