import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import gsap from " https://cdn.jsdelivr.net/npm/gsap@3.10.4/index.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const loader = new GLTFLoader();

var coffeeCup;
var table;
var room;

loader.load('../3d-models/Cup of tea.glb',
    function (gltf) {
        coffeeCup = gltf.scene
        coffeeCup.scale.set(.02, .02, .02);
        coffeeCup.position.set(.70, -.01, .1); 
        scene.add(coffeeCup);
    }
);
console.log(helloworld);
loader.load('../3d-models/Table Round Small.glb',
    function (gltf) {
        table = gltf.scene
        table.scale.set(0.18, 0.18, 0.18);
        table.position.set(.8, -.22, .1); 
        scene.add(table);
    }
);

loader.load('../3d-models/Apartment 2.glb',
    function (gltf) {
        room = gltf.scene
        room.scale.set(2, 2, 2);
        scene.add(room);
    }
);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0, 0, .7); 
camera.near = 0.1;


var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color: white, Intensity: 1 (adjust as needed)
directionalLight.position.set(0, 5, 0); // Adjust the position to be outside the window
directionalLight.target.position.set(0, 0, 0); // Set the light's target to the center of the room
scene.add(directionalLight);
scene.add(directionalLight.target);

var controls = new OrbitControls(camera, renderer.domElement);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();



// ANIMATIONS ---------------------------------------------------


window.addEventListener('mousedown', function() {
    gsap.to(camera.position, {
        x: .68,
        y: .12,
        z: .1,
        duration: 1.5,
        onUpdate: function() {
            camera.lookAt(.70, -.01, .1)
        }
    });
    gsap.to(camera, {
        fov: 10,
        delay: 1,
        duration: 1.5,
        ease: "power1.inOut",
        onUpdate: function() {
            camera.updateProjectionMatrix();
        }
    });
});