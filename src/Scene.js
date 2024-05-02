import React, { useRef, useEffect, useState, createContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import Objects from './Objects';
import Animations from './Animations';
import MainPage from './pages/MainPage';
import gsap from 'gsap';

const SceneContext = createContext();

const Scene = () => {

  const canvasRef = useRef(null);

  const [camera, setCamera] = useState(null);
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  
  const [teapageOpen, setTeapageOpen] = useState(false);
  const [objects, setObjects]= useState(null);
  const [animations, setAnimations] = useState({});

  const shopPageRef = useRef(null);


  useEffect(() => {
    const resizeRenderer = () => {
      setRenderer(prevState => {
        prevState.setSize(window.innerWidth, window.innerHeight)
        return prevState;
      });
    };
    
    if (scene && camera && !renderer) {
      var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);


      camera.position.set(-.7, .20, .2); 
      camera.rotation.y = Math.PI * 1.7;
      camera.fov = 70;

      setRenderer(() => {
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        window.addEventListener('resize', resizeRenderer);

        // POV controls
        const controls = new OrbitControls(camera, renderer.domElement);
        // renderer.domElement.addEventListener('click', () => {
        //   controls.lock();
        // });
        // scene.add(controls.getObject());

        return renderer;
      });
      
      var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 5, 0); 
      directionalLight.target.position.set(0, 0, 0);
      scene.add(directionalLight);
      scene.add(directionalLight.target);
      
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
      setTeapageOpen(true);
      gsap.to(shopPageRef.current, { opacity: 1, duration: 1 });
    } else {
      setTeapageOpen(false);
      gsap.to(shopPageRef.current, { opacity: 0, duration: 1 });
    }
  }

  return (
    <SceneContext.Provider value={{ camera, scene, renderer }}>
      <div style={{opacity: 0, position: 'absolute', width: '100%', height: '100%'}} ref={shopPageRef}>
        {teapageOpen && <MainPage />}
      </div>
      <Animations objects={objects} animations={animations} teapageViewable={teapageViewable}/>

      <Objects objects={objects} setObjects={setObjects} setAnimations={setAnimations}/>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%'}}/>
    </SceneContext.Provider>
  );
}

export { Scene, SceneContext };