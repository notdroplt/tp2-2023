import * as THREE from 'three';

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
        setTimeout(generate_stars, i )
    }
})()

star.position.z = -10
star.position.x = 4

scene.add(star)

const fps = 12
let fps_ratio = 1
let cam = {
    acc: new THREE.Vector3(0, 0, 0),
    vel: new THREE.Vector3(0, 0, 0),
}

let start, previousts;


// Animation loop
const animate = (timestamp) => {
    //requestAnimationFrame(animate);
    if (start === undefined) {
        start = timestamp;
        previousts = start
    }
    const elapsed = timestamp - start;
    const delta = timestamp - previousts 
    previousts = timestamp

    
    sphere.rotation.z += 0.001
    sphere.rotation.y += 0.015
    
    if (cam.acc.lengthSq() > 0.3 && delta !== 0) {
        cam.acc.divideScalar(1.5 / delta)
        cam.vel.add(cam.acc.divideScalar(delta))
        camera.position.add(cam.vel.divideScalar(delta))
    }
    
    renderer.render(scene, camera);
    
    setTimeout(() => {
        requestAnimationFrame(animate)
    }, 1000 / (fps * fps_ratio))
};

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.onblur = () => {
    fps_ratio = 0.1
}

window.onfocus = () => {
    fps_ratio = 1
}

/**
 * Handles some keyboard eventss
 * @param {KeyboardEvent} ev event
 */
window.onkeydown = (ev) => {
    if (ev.key == "ArrowLeft") 
        cam.acc.x -= 10
    else if (ev.key == "ArrowUp")
        cam.acc.y += 10
    else if (ev.key == "ArrowRight")
        cam.acc.x += 10
    else if (ev.key == "ArrowDown")
        cam.acc.y -= 10
}


// Start the animation loop
animate();