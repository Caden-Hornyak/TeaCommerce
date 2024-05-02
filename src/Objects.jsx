import React, {useEffect, useContext } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry } from 'three/src/geometries/TextGeometry.js';
import HelvetikerFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { SceneContext } from './Scene';

const Objects = ({ objects, setObjects, setAnimations }) => {

    const { scene } = useContext(SceneContext);

    useEffect(() => {
        if (scene && !objects) {
            const objectList = {};
            const loader = new GLTFLoader();
            
            for (let i = 0; i < 3; i++) {
                loader.load('/3d-models/Fall Forest.glb',
                    function (gltf) {
                        let forest = gltf.scene;
                        forest.rotation.y = Math.PI;
                        forest.position.set(i, .22, .1); 
                        objectList['forest'] = forest;
                        scene.add(forest);
                    }
                );
            }

            loader.load('/3d-models/Cup of tea.glb',
                function (gltf) {
                    let coffeeCup = gltf.scene
                    coffeeCup.scale.set(.02, .02, .02);
                    coffeeCup.position.set(.70, -.01, .1); 
                    objectList['coffeeCup'] = coffeeCup;
                    scene.add(coffeeCup);
                }
            );
        
            loader.load('/3d-models/Table Round Small.glb',
                function (gltf) {
                    let table = gltf.scene;
                    table.scale.set(0.18, 0.18, 0.18);
                    table.position.set(.8, -.22, .1); 
                    objectList['table'] = table;
                    scene.add(table);
                }
            );
        
            loader.load('/3d-models/Apartment 2.glb',
                function (gltf) {
                    let room = gltf.scene;
                    room.scale.set(2, 2, 2);
                    objectList['room'] = room;
                    scene.add(room);
                }
            );

            loader.load('/3d-models/animated_butterfly.glb',
                function (gltf) {
                    let butterfly = gltf.scene;
                    butterfly.scale.set(.2, .2, .2);
                    objectList['butterfly'] = butterfly;
                    scene.add(butterfly);

                    // butterfly animation
                    const mixer = new THREE.AnimationMixer(butterfly);
                    const clips = gltf.animations;

                    if (clips.length > 0) {
                        const action = mixer.clipAction(clips['0']);
                        action.play();
                    }
                    setAnimations(prevState => {
                        const newState = {};

                        for (let key in prevState) {
                            newState[key] = prevState[key];
                        }
                        newState['butterfly'] = mixer;
                        return newState;
                    });
                }
            );

            // roof plane
            var roofGeometry = new THREE.PlaneGeometry(4, 4);
            var roofMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(140, 140, 140)', side: THREE.DoubleSide });
            var square = new THREE.Mesh(roofGeometry, roofMaterial);
            square.rotation.x = Math.PI * .5;
            square.position.set(0, .525, 0); 
            scene.add(square);

            // site welcome text
            const fontLoader = new THREE.FontLoader();
            const font = fontLoader.parse(HelvetikerFont);
            const textGeometry = new TextGeometry( '    Welcome to \n Tea Commerce!', {
                font: font,

                size: 50,
                depth: 10,
                height: 10,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 5,
            } );

            const material = new THREE.MeshBasicMaterial({ color: 'white' });
            const textMesh = new THREE.Mesh(textGeometry, material);
            textMesh.position.set(-.15, .15, -.45);
            textMesh.rotation.y = Math.PI * 1.7;
            textMesh.scale.set(0.001, 0.001, 0.001);
            objectList['text'] = textMesh;
            scene.add(textMesh);

            setObjects(objectList);
        }



        
    }, [scene]);
    
  return null
}

export default Objects