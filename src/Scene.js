import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Objects from './Objects';
import Animations from './Animations';
import ShopPage from './pages/ShopPage';
import gsap from 'gsap';

const Scene = () => {

  const canvasRef = useRef(null);
  const renderer = useRef(null);
  const [camera, setCamera] = useState(null);
  const [scene, setScene] = useState(null);

  const shopPageRef = useRef(null);


  useEffect(() => {
    const resizeRenderer = () => {
      renderer.current.setSize(window.innerWidth, window.innerHeight)
    };
    if (scene && camera) {
      var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);


      camera.position.set(0, 0, .7); 
      camera.near = 0.1;

      renderer.current = new THREE.WebGLRenderer({ canvas: canvasRef.current })
      renderer.current.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.current.domElement );
      window.addEventListener('resize', resizeRenderer);
      
      var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color: white, Intensity: 1 (adjust as needed)
      directionalLight.position.set(0, 5, 0); // Adjust the position to be outside the window
      directionalLight.target.position.set(0, 0, 0); // Set the light's target to the center of the room
      scene.add(directionalLight);
      scene.add(directionalLight.target);

      var controls = new OrbitControls(camera, renderer.current.domElement);

      function animate() {
        requestAnimationFrame( animate );
        renderer.current.render( scene, camera );
      }
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeRenderer);
    };
  }, [scene, camera]);


  useEffect(() => {
    setScene(new THREE.Scene());
    setCamera(new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ));
  }, []);
  

  const teapageViewable = (viewableTo) => {
    if (viewableTo) {
      gsap.to(shopPageRef.current, { opacity: 1, duration: 1 });
    } else {
      gsap.to(shopPageRef.current, { opacity: 0, duration: 1 });
    }

  }
  return (
    <>
      <div style={{height: '500px', opacity: 0, position: 'absolute'}} ref={shopPageRef}>
        <ShopPage />
      </div>
      <Animations camera={camera} teapageViewable={teapageViewable}/>
      <Objects scene={scene} />
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%'}}/>
    </>
  );
}

export default Scene