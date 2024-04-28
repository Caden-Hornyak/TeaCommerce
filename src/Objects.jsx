import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import ShopPage from './pages/ShopPage';

const Objects = ({ scene }) => {
    if (scene) {
        const loader = new GLTFLoader();
        
        loader.load('/3d-models/Cup of tea.glb',
            function (gltf) {
                let coffeeCup = gltf.scene
                coffeeCup.scale.set(.02, .02, .02);
                coffeeCup.position.set(.70, -.01, .1); 
                scene.add(coffeeCup);
            }
        );
    
        loader.load('/3d-models/Table Round Small.glb',
            function (gltf) {
                let table = gltf.scene;
                table.scale.set(0.18, 0.18, 0.18);
                table.position.set(.8, -.22, .1); 
                scene.add(table);
            }
        );
    
        loader.load('/3d-models/Apartment 2.glb',
            function (gltf) {
                let room = gltf.scene;
                room.scale.set(2, 2, 2);
                scene.add(room);
            }
        );

        loader.load('/3d-models/Fall Forest.glb',
            function (gltf) {
                let forest = gltf.scene;
                forest.rotation.y = Math.PI;
                forest.position.set(2.8, .2, .1); 
                scene.add(forest);
            }
        );
        

        // const htmlToPlane = (htmlElement) => {

        //     // Use CSS3DRenderer to render the HTML content onto a texture
        //     var cssRenderer = new CSS3DRenderer();
        //     cssRenderer.setSize(1, 1);
        //     cssRenderer.domElement.appendChild(htmlElement);
            
        //     // Create a texture from the rendered HTML content
        //     var texture = new THREE.Texture(cssRenderer.domElement);
        //     texture.needsUpdate = true;
            
        //     return texture;
        // };

        // ceiling
        var geometry = new THREE.PlaneGeometry(3, 3);
        var material = new THREE.MeshBasicMaterial({ color: 'rgb(140, 140, 140)', side: THREE.DoubleSide });
        var square = new THREE.Mesh(geometry, material);
        square.rotation.x = Math.PI * .5;
        square.position.set(0, .525, 0); 
        scene.add(square);


        // var geometry = new THREE.PlaneGeometry(1, 1);
        // var material = new THREE.MeshBasicMaterial({
        //     map: htmlToPlane(<ShopPage />),
        //     side: THREE.DoubleSide 
        // });
        // var mesh = new THREE.Mesh(geometry, material);
        // scene.add(mesh);
    }
    

  return null
}

export default Objects