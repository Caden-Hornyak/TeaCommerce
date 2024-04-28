import React from 'react'
import gsap from 'gsap';

const Animations = ({ camera, teapageViewable }) => {
    if (camera) {
        window.addEventListener('click', function() {
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
                }
            });
        });
    }

  return null;
}

export default Animations