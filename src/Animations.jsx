import React, {useEffect} from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

const Animations = ({ scene, renderer, camera, objects, animations, teapageViewable }) => {
    if (camera) {
        // window.addEventListener('click', function() {
        //     gsap.to(camera.position, {
        //         x: .68,
        //         y: .12,
        //         z: .1,
        //         duration: 1.5,
        //         onUpdate: function() {
        //             camera.lookAt(.70, -.01, .1)
        //         }
        //     });
        //     gsap.to(camera, {
        //         fov: 10,
        //         delay: 1,
        //         duration: 1.5,
        //         ease: "power1.inOut",
        //         onUpdate: function() {
        //             camera.updateProjectionMatrix();
        //         },
        //         onComplete: function() {
        //             teapageViewable(true);
        //         }
        //     });
        // });
    }
    console.log(renderer)
    useEffect(() => {
        console.log(renderer, objects, Object.keys(animations).length > 0)
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