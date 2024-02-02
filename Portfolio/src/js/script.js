import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as CANNON from 'https://esm.run/cannon-es'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .1, 10000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xffd770);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const dl_light = new THREE.DirectionalLight(0xFFFFFF, 10);
scene.add(dl_light);
dl_light.position.set(100, 100, 100);
const dl_light2 = new THREE.DirectionalLight(0xFFFFFF, 10);
scene.add(dl_light2);
dl_light2.position.set(-100, -100, -100);



const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.8, 0)
});
const groundPhyMat = new CANNON.Material('groundPhyMat');
const cannonGround = new CANNON.Body({
    shape: new CANNON.Plane(),
    type: CANNON.Body.STATIC,
    position: new CANNON.Vec3(0, 0, 0),
    material: groundPhyMat
});
cannonGround.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(cannonGround);

const carPhyMat = new CANNON.Material('carPhyMat');
const carBody = new CANNON.Body({
    mass: 100,
    shape: new CANNON.Box(new CANNON.Vec3(5, 2, 2)),
    position: new CANNON.Vec3(0, 5, 0),
    material: carPhyMat
});
const vehicle = new CANNON.RigidVehicle({
    chassisBody: carBody
});

const contactMat = new CANNON.ContactMaterial(
    groundPhyMat,
    carPhyMat,
    {
        friction: 1,
        restitution: .5,
        linearDamping: 1,
        angularDamping: .500
    }
    );
    world.addContactMaterial(contactMat);
    
const wheelMaterial = new CANNON.Material('wheelMaterial')
const WheelContact = new CANNON.ContactMaterial(
    groundPhyMat,
    wheelMaterial,
    {
        restitution: .5,
        friction: 500
    }
    )
    world.addContactMaterial(WheelContact);
    
    const suspensionOptions = {
        radius: 0.5,
        directionLocal: new CANNON.Vec3(0, -1, 0),
        suspensionStiffness: 30, // Adjust the stiffness
        suspensionRestLength: 0.3,
        frictionSlip: 5,
        dampingRelaxation: 200, // Adjust the damping
        dampingCompression: 4,
        maxSuspensionForce: 100000,
        rollInfluence: 0.01,
        axleLocal: new CANNON.Vec3(-1, 0, 0),
        chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
        maxSuspensionTravel: 0.3,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true,
    };
    
const mass = 10
const axisWidth = 7
const wheelShape = new CANNON.Sphere(1.5)
const down = new CANNON.Vec3(0, -1, 0)
const centerOfMassAdjust = new CANNON.Vec3(0, 0, 0)

const wheelBody1 = new CANNON.Body({ mass, material: wheelMaterial })
wheelBody1.addShape(wheelShape)
vehicle.addWheel({
    body:wheelBody1,
    ...suspensionOptions,
    position: new CANNON.Vec3(-5, -2, axisWidth / 2).vadd(centerOfMassAdjust),
    axis: new CANNON.Vec3(0, 0, 1),
    direction: down
})
const wheelBody2 = new CANNON.Body({ mass, material: wheelMaterial })
wheelBody2.addShape(wheelShape)
vehicle.addWheel({
    body:wheelBody2,
    ...suspensionOptions,
    position: new CANNON.Vec3(-5, -2, -axisWidth / 2).vadd(centerOfMassAdjust),
    axis: new CANNON.Vec3(0, 0, -1),
    direction: down,
})

const wheelBody3 = new CANNON.Body({ mass, material: wheelMaterial })
wheelBody3.addShape(wheelShape)
vehicle.addWheel({
    body:wheelBody3,
    ...suspensionOptions,
    position: new CANNON.Vec3(5, -2, axisWidth / 2).vadd(centerOfMassAdjust),
    axis: new CANNON.Vec3(0, 0, 1),
    direction: down,
})

const wheelBody4 = new CANNON.Body({ mass, material: wheelMaterial })
wheelBody4.addShape(wheelShape);
vehicle.addWheel({
    body:wheelBody4,
    ...suspensionOptions,
    position: new CANNON.Vec3(5, -2, -axisWidth / 2).vadd(centerOfMassAdjust),
    axis: new CANNON.Vec3(0, 0, -1),
    direction: down,
})
vehicle.addToWorld(world);


var speed = vehicle.getWheelSpeed(2)
var tireSpeed;
var lastKey = 's';
var turn = 0;
document.addEventListener('keydown', (event) => {
    const force = 20
    tireSpeed = vehicle.getWheelSpeed(2)
    if (speed > 20 || speed < 0) {
        speed = 20
    }
    switch (event.key) {
        case ' ':
            if (tireSpeed >= 0 && tireSpeed <= .23) {
                break
            }
            if (lastKey === 'w') {
                vehicle.applyWheelForce(-force * speed, 2)
                vehicle.applyWheelForce(force * speed, 3)
                break
            }
            else if (lastKey === 's') {
                vehicle.applyWheelForce(force * speed, 2)
                vehicle.applyWheelForce(-force * speed, 3)
                break
            }
            break
            case 'w':
                case 'ArrowUp':
                    lastKey = 'w'
                    speed += 1
                    vehicle.applyWheelForce(force * speed, 2)
                    vehicle.applyWheelForce(-force * speed, 3)
                    break
                    case 's':
                        case 'ArrowDown':
            lastKey = 's'
            speed -= 1
            vehicle.applyWheelForce(-force * speed, 2)
            vehicle.applyWheelForce(force * speed, 3)
            break
            case 'a':
                case 'ArrowLeft':
                    lastKey = 'w'
            turn = turn == -1 ? 0 : 1;
            vehicle.applyWheelForce(force * speed * .25, 2)
            vehicle.applyWheelForce(-force * speed * .25, 3)
            break
        case 'd':
        case 'ArrowRight':
            lastKey = 'w'
            turn = turn == 1 ? 0 : -1;
            vehicle.applyWheelForce(force * speed * .25, 2)
            vehicle.applyWheelForce(-force * speed * .25, 3)
            break
    }
    vehicle.setSteeringValue((0.100 * turn), 0)
    vehicle.setSteeringValue((0.100 * turn), 1)
})

// const debuggeR = new cannonEsDebugger( scene , world )
renderer.render(scene, camera);
const control = new OrbitControls(camera, renderer.domElement);
control.addEventListener('change', () => { renderer.render(scene, camera) });
control.update();
let vehiclePos = carBody.position
const cannonTime = 1 / 60;
// camera.position.set(50, 50, 50);
function animate() {
	// debuggeR.update();
    camera.position.set(vehiclePos.x - 80, vehiclePos.y + 50, vehiclePos.z - 80);
    control.target = new THREE.Vector3(vehiclePos.x, vehiclePos.y , vehiclePos.z )
    control.update();
    world.step(cannonTime);
    world.fixedStep()
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
} animate()

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})

export { scene, carBody, wheelBody1, wheelBody2, wheelBody3, wheelBody4 }