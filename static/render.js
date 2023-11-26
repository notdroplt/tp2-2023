import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module'
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);


const light = new THREE.SpotLight(0xffffff, 3);
light.position.x -= 1
light.position.y += 2
light.position.z += 3

light.castShadow = true;
scene.add(light)

const geometry = new THREE.IcosahedronGeometry(1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xFF0ff0 });
const sphere = new THREE.Mesh(geometry, material);

sphere.position.set(0, 0, 0)
scene.add(sphere);

const star_geometry = new THREE.IcosahedronGeometry(0.075)
const star = new THREE.Mesh(star_geometry)
let increment = 1.000000001
function generate_stars() {
    const gstar = new THREE.Mesh(star_geometry)
    gstar.position.z = -10 + Math.random() * 0.5 * increment
    gstar.position.x = (Math.random() - 0.5) * 80 * increment
    gstar.position.y = (Math.random() - 0.5) * 100 * increment

    scene.add(gstar)

    increment *= increment
}

(() => {
    for (let i = 0; i < 250; i++) {
        setTimeout(generate_stars, i)
    }
})()

star.position.z = -10
star.position.x = 4

scene.add(star)

export const fps = 15
export let fps_ratio = 1

export let cam = {
    acc: new THREE.Vector3(),
    vel: new THREE.Vector3(),
    angleacc: new THREE.Quaternion(),
    anglevel: new THREE.Quaternion(),
    angle: new THREE.Quaternion(),
    thing: new THREE.Euler()
}

export let start, previousts;

/**
 * 
 * @param {THREE.Quaternion} q1 first quaternion
 * @param {THREE.Quaternion} q2 second quaternion
 */
const addQuaternions = (q1, q2) => new THREE.Quaternion(q1.x + q2.x, q1.y + q2.y, q1.z + q2.z, q1.w + q2.w)

/**
 * 
 * @param {THREE.Quaternion} q 
 * @param {Number} s 
 */
const divideScalarQuaternion = (q, s) => new THREE.Quaternion(q.x / s, q.y / s, q.z / s, q.w / s)

const stats = new Stats()
document.body.appendChild(stats.dom)

// Animation loop
const animate = (timestamp) => {
    timestamp = timestamp || 0
    //requestAnimationFrame(animate);
    if (start === undefined) {
        start = timestamp;
        previousts = start
        return;
    }

    const elapsed = timestamp - start;
    const delta = timestamp - previousts
    previousts = timestamp


    sphere.rotation.z += 0.001
    sphere.rotation.y += 0.015

    if (cam.acc.lengthSq() > 0.3 && delta !== 0) {
        cam.acc.divideScalar(1.5 / delta)
        cam.vel.add(cam.acc.divideScalar(delta))
        camera.position.add(cam.vel.divideScalar(delta).applyEuler(camera.rotation))
    }

    if (cam.angleacc.lengthSq() > 1.5 && delta !== 0) {
        cam.angleacc = divideScalarQuaternion(cam.angleacc, 1.5 / delta)
        cam.anglevel = addQuaternions(cam.anglevel, divideScalarQuaternion(cam.angleacc, delta)).normalize()
        cam.angle = addQuaternions(cam.angle, divideScalarQuaternion(cam.anglevel, delta)).normalize()
        console.log({acc: cam.angleacc, vel: cam.anglevel, angle: cam.angle})
        camera.rotation.setFromQuaternion(cam.angle)
    }

    renderer.render(scene, camera);

    
    setTimeout(() => requestAnimationFrame(animate), 1000 / (fps * fps_ratio))

    stats.update()
};

animate()

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.onblur = () => { fps_ratio = 0.1 }

window.onfocus = () => { fps_ratio = 1 }

/**
 * Handles some keyboard eventss
 * @param {KeyboardEvent} ev event
 */
window.onkeydown = (ev) => {
    if (ev.target !== document.querySelector("body")) return

    switch (ev.key) {
        // linear transformations
        
        case 'a': cam.acc.x -= 10; break;
        case 'w': cam.acc.y += 10; break;
        case 'd': cam.acc.x += 10; break;
        case 'x': cam.acc.y -= 10; break;
        case 's': cam.acc.z -= 10; break;
        case 'f': cam.acc.z += 10; break;

        // angular transformations

        case 'h': cam.angleacc.x -= 1.3 ; break;
        case 'u': cam.angleacc.y += 1.3 ; break;
        case 'k': cam.angleacc.x += 1.3 ; break;
        case 'm': cam.angleacc.y += 1.3 ; break;
        case 'j': cam.angleacc.z += 1.3 ; break;
        case 'l': cam.angleacc.z -= 1.3 ; break;

    }

}


// Start the animation loop
animate();

