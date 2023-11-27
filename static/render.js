import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
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
let counter = 0
function generate_stars() {
    if (counter > 10000) return
    counter ++;
    const gstar = new THREE.Mesh(star_geometry)
    gstar.position.z = (Math.random() - 0.5) * 100
    gstar.position.x = (Math.random() - 0.5) * 100
    gstar.position.y = (Math.random() - 0.5) * 100

    gstar.position.normalize().multiplyScalar(90)

    scene.add(gstar)
    setTimeout(generate_stars, 1)
}

generate_stars()

const fps = 15
let fps_ratio = 1

let cam = {
    acc: new THREE.Vector3(),
    vel: new THREE.Vector3(),
    angleacc: new THREE.Vector3(),
    anglevel: new THREE.Vector3(),
}

let start, previousts;

const stats = new Stats()
document.body.appendChild(stats.dom)

let keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    x: false,
    u: false,
    h: false,
    j: false,
    k: false,
    l: false,
    m: false,
};

const move_speed = 20;
const rot_speed = Math.PI / 45;

const handle_keys = () => {
    if (keys.w) cam.acc.z -= move_speed;
    if (keys.s) cam.acc.z += move_speed;
    if (keys.a) cam.acc.x -= move_speed;
    if (keys.d) cam.acc.x += move_speed;
    if (keys.x) cam.acc.y -= move_speed;

    if (keys.u) camera.rotation.x -= rot_speed;
    if (keys.h) camera.rotation.y -= rot_speed;
    if (keys.j) camera.rotation.z -= rot_speed;
    if (keys.k) camera.rotation.x += rot_speed;
    if (keys.l) camera.rotation.y += rot_speed;
    if (keys.m) camera.rotation.z += rot_speed;
}

// Animation loop
const animate = (timestamp) => {
    timestamp = timestamp || 0

    handle_keys()
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

    if (cam.angleacc.lengthSq() > Math.PI / 20 && delta !== 0) {
        cam.angleacc.divideScalar(1.95 / delta);
        cam.anglevel.add(cam.acc.divideScalar(delta))
        camera.rotateX(cam.anglevel.x);
        camera.rotateY(cam.anglevel.y);
        camera.rotateZ(cam.anglevel.z);
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


document.onkeydown = ev => { keys[ev.key] = true }
document.onkeyup = ev => { keys[ev.key] = false }

// Start the animation loop
animate();

document.game = {
    renderer, camera, scene
}

