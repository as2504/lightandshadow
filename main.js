const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
plane.receiveShadow = true;
scene.add(plane);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Add hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.5);
scene.add(hemisphereLight);

// Add a spotlight
const spotLight = new THREE.SpotLight(0xffd700, 1);
spotLight.position.set(0, 10, 5);
spotLight.castShadow = true;
spotLight.angle = 0.3;
spotLight.penumbra = 0.2;
spotLight.decay = 2;
spotLight.distance = 50;
scene.add(spotLight);

// Add a visual representation for the light
const lightGizmo = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 8),
    new THREE.MeshBasicMaterial({ color: 0xffd700 })
);
lightGizmo.position.copy(spotLight.position);
scene.add(lightGizmo);

camera.position.set(0, 5, 15);

let currentObject = null;

function createObject(type) {
    if (currentObject) {
        scene.remove(currentObject);
    }

    let geometry;
    switch (type) {
        case 'cube':
            geometry = new THREE.BoxGeometry(2, 2, 2);
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(1.5, 32, 32);
            break;
        case 'cone':
            geometry = new THREE.ConeGeometry(1.5, 3, 32);
            break;
        case 'torus':
            geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
            break;
        default:
            geometry = new THREE.BoxGeometry(2, 2, 2);
    }

    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.5, metalness: 0.5 });
    currentObject = new THREE.Mesh(geometry, material);
    currentObject.castShadow = true;
    currentObject.position.y = -0.5;
    scene.add(currentObject);
}

const objectButtons = document.querySelectorAll('#object-selector button');
objectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const objectType = button.getAttribute('data-object');
        createObject(objectType);
        objectButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

createObject('cube');
document.querySelector('[data-object="cube"]').classList.add('active');

const intensitySlider = document.getElementById('intensity-slider');
intensitySlider.addEventListener('input', (event) => {
    spotLight.intensity = event.target.value;
});

const colorSwatches = document.querySelectorAll('.color-swatch');
colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        const color = parseInt(swatch.getAttribute('data-color'));
        spotLight.color.setHex(color);
        lightGizmo.material.color.setHex(color);
        colorSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
    });
});

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function updateLightPosition(x, y) {
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(plane);

    if (intersects.length > 0) {
        const point = intersects[0].point;
        spotLight.position.set(point.x, 10, point.z);
        lightGizmo.position.copy(spotLight.position);
    }
}

window.addEventListener('mousemove', (event) => {
    updateLightPosition(event.clientX, event.clientY);
});

window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        updateLightPosition(event.touches[0].clientX, event.touches[0].clientY);
    }
});

function animate() {
    requestAnimationFrame(animate);

    if (currentObject) {
        currentObject.rotation.x += 0.005;
        currentObject.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
