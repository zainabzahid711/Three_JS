import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'


/**
 * Base
 */
// Debug
const gui = new lil.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture1 = textureLoader.load('/textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')


//                           Fonts
const fontLoader = new FontLoader()
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json ',
  (font) => {
    const textGeometry = new TextGeometry(
      'Zainab Zahid',
      {
        font: font,
        size: 0.5,
        height: 0.2,    //  depth
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
      }
    )
    const params = {
      spin: () => {
        gsap.to(text.rotation, { duration: 2, x: text.rotation.x + 15 })
      }
    }


    textGeometry.center()  // to make text geomatery in center with threejs 
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 })
    material.wireframe = false


    const text = new THREE.Mesh(textGeometry, material)
    text.scale.x = 2
    text.scale.y = 2
    text.scale.z = 3

    gui
      .add(material, 'wireframe')
    gui
      .add(text, 'visible').name('Hide Name')
    gui
      .addColor(material, 'color')
    gui
      .add(params, 'spin')

    scene.add(text)

  }
)

// objects
const donutGeometery = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture1 })
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64)
const sphereMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 })
const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100)
const planeMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 })

let donut = []
let plane = []
for (let i = 0; i < 80; i++) {
  //                  donuts
  donut[i] = new THREE.Mesh(donutGeometery, donutMaterial)

  donut[i].position.x = (Math.random() - 0.5) * 20
  donut[i].position.y = (Math.random() - 0.5) * 20
  donut[i].position.z = (Math.random() - 0.5) * 20

  donut[i].rotation.x = Math.random() * Math.PI
  donut[i].rotation.y = Math.random() * Math.PI

  const scale = Math.random()
  donut[i].scale.x = scale
  donut[i].scale.y = scale
  donut[i].scale.z = scale

  scene.add(donut[i])

  //                   sphere

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

  sphere.position.x = (Math.random() - 0.5) * 25
  sphere.position.y = (Math.random() - 0.5) * 25
  sphere.position.z = (Math.random() - 0.5) * 15

  sphere.rotation.x = Math.random() * Math.PI
  sphere.rotation.y = Math.random() * Math.PI

  const scale2 = Math.random()
  sphere.scale.x = scale2
  sphere.scale.y = scale2
  sphere.scale.z = scale2

  scene.add(sphere)


  // plane 
  plane[i] = new THREE.Mesh(planeGeometry, planeMaterial)

  plane[i].position.x = (Math.random() - 0.5) * 20
  plane[i].position.y = (Math.random() - 0.5) * 20
  plane[i].position.z = (Math.random() - 0.5) * 15

  plane[i].rotation.x = Math.random() * Math.PI
  plane[i].rotation.y = Math.random() * Math.PI

  const scale3 = Math.random()
  plane[i].scale.x = scale3
  plane[i].scale.y = scale3
  plane[i].scale.z = scale3

  scene.add(plane[i])
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 6
scene.add(camera)



// Controls    // camera control system
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



window.addEventListener('dblclick', () => {

  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  }
  else {
    document.exitFullscreen()
  }
})



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  for (let i = 0; i < donut.length; i++) {

    donut[i].rotation.x = 0.3 * elapsedTime
    plane[i].rotation.x = 0.3 * elapsedTime

    donut[i].rotation.y = 0.2 * elapsedTime
    plane[i].rotation.y = 0.2 * elapsedTime
  }


  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()