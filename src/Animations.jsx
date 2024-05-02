import React, {useEffect, useContext, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { SceneContext } from './Scene';

const Animations = ({ objects, animations, teapageViewable }) => {
  const { camera, scene, renderer } = useContext(SceneContext);
  const cameraMode = useRef(null);

  if (camera) {
    window.addEventListener('keydown', e => {

      if (e.key !== 'ArrowUp' || e.repeat || cameraMode.current !== null) return;
      cameraMode.current = 'up';

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
        },
        onComplete: function() {
          teapageViewable(true);
          cameraMode.current = null;
        }
      });
    });

    window.addEventListener('keydown', e => {
      if (e.key !== 'ArrowDown' || e.repeat || cameraMode.current !== null) return;
      cameraMode.current = 'down';

      teapageViewable(false);
      gsap.to(camera.position, {
        x: -.7,
        y: .2,
        z: .2,
        delay: .25,
        ease: "power1.in",
        duration: 1.5,
        onUpdate: function() {
          camera.lookAt(.70, -.01, .1)
        }
      });
      gsap.to(camera, {
        fov: 70,
        duration: 1.5,
        ease: "power1.outIn",
        onUpdate: function() {
          camera.updateProjectionMatrix();
        },
        onComplete: function() {
          cameraMode.current = null;
        }
      });
    });
  }

  useEffect(() => {

    if (renderer && objects && Object.keys(animations).length > 0) {
      
      const clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame( animate );

        // text animation
        const t = clock.getElapsedTime();
        objects['text'].rotation.x = Math.cos(t / 2) / 20 + 0.25;
        objects['text'].rotation.y = (Math.PI * 1.7) + Math.sin(t / 4) / 20;
        objects['text'].rotation.z = .3 + Math.sin(t / 8) / 40;
        objects['text'].position.y = .18 + ((Math.sin(t / 2)) / 33);

        animations['butterfly'].update(0.01);

        renderer.render( scene, camera );
      }
      animate();
    }
      
    }, [renderer, objects, animations]);

  return null;
}

export default Animations