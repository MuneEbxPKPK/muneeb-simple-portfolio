import { scene, carBody, wheelBody1, wheelBody2, wheelBody3, wheelBody4 } from './script.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const loader = new GLTFLoader();
loader.load('models/tire.glb', (e) => {
    console.log("Tire Model loaded")
    const tireModel = e.scene
    const tire1 = SkeletonUtils.clone(tireModel)
    const tire2 = SkeletonUtils.clone(tireModel)
    const tire3 = SkeletonUtils.clone(tireModel)
    const tire4 = SkeletonUtils.clone(tireModel)
    scene.add(tire1)
    scene.add(tire2)
    scene.add(tire3)
    scene.add(tire4)
    function animateTire() {
        tire1.position.set(wheelBody1.position.x, wheelBody1.position.y, wheelBody1.position.z)
        tire1.quaternion.set(wheelBody1.quaternion.x, wheelBody1.quaternion.y, wheelBody1.quaternion.z, wheelBody1.quaternion.w)
        tire2.position.set(wheelBody2.position.x, wheelBody2.position.y, wheelBody2.position.z)
        tire2.quaternion.set(wheelBody2.quaternion.x, wheelBody2.quaternion.y, wheelBody2.quaternion.z, wheelBody2.quaternion.w)
        tire3.position.set(wheelBody3.position.x, wheelBody3.position.y, wheelBody3.position.z)
        tire3.quaternion.set(wheelBody3.quaternion.x, wheelBody3.quaternion.y, wheelBody3.quaternion.z, wheelBody3.quaternion.w)
        tire4.position.set(wheelBody4.position.x, wheelBody4.position.y, wheelBody4.position.z)
        tire4.quaternion.set(wheelBody4.quaternion.x, wheelBody4.quaternion.y, wheelBody4.quaternion.z, wheelBody4.quaternion.w)
        requestAnimationFrame(animateTire)
    } animateTire()
})

loader.load('models/car.glb/', (e) => {
    const car = e.scene
    scene.add(car)
    console.log(car.children)
    car.getObjectById(45).children[0].material.color.setHex(0xeb4034) //main body
    car.getObjectById(45).children[1].material.color.setHex(0xeb4034) // main body
    car.getObjectById(40).children[0].material.color.setHex(0x333) // side mirrors
    car.getObjectById(40).children[1].material.color.setHex(0x333) // side mirrors
    car.getObjectById(31).material.color.setHex(0x2bf4ff) // roof part
    car.getObjectById(30).material.color.setHex(0x2bf4ff) // roof part
    car.getObjectById(33).material.color.setHex(0x2bf4ff) // roof part
    car.getObjectById(61).material.color.setHex(0x000000) // seats
    car.getObjectById(23).material.color.setHex(0x000000) // seats back (upper)
    car.getObjectById(68).material.color.setHex(0x000000) // stearing
    car.getObjectById(42).material.color.setHex(0xf79d14) // area between tyre and main body


    car.scale.set(.87, .87, .87)
    function animateTire() {
        car.position.set(carBody.position.x, carBody.position.y + 0, carBody.position.z + 0)
        car.quaternion.set(carBody.quaternion.x, carBody.quaternion.y, carBody.quaternion.z, carBody.quaternion.w)
        requestAnimationFrame(animateTire);
    } animateTire();
})
// loader.load('././static/RoadStraight.glb/', (e) => {
//     const road = e.scene
//     for (i = 0; i < 10; i++){
//         const roadCopy = SkeletonUtils.clone(road)
//         roadCopy.position.set((i * 10)+5, -1, 0)
//         road.scale.set(2.5,2.5,2.5)
//         scene.add(roadCopy)
//     }
// })