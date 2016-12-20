//COLORS
var Colors = {
  red:0xf25346,
  white:0xd8d0d1,
  brown:0x59332e,
  brownDark:0x23190f,
  pink:0xF5986E,
  yellow:0xf4ce93,
  blue:0x68c3c0,
};

var scene,
    loader,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container,
    controls,
    lights = [],
    objs = {};


var HEIGHT, WIDTH,
    mousePos = { x: 0, y: 0 };


// --- SCENE

function setupScene() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xeeeeee, 100,550);
}


// --- CAMERA

function setupCamera() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 50;
  nearPlane = 0.1;
  farPlane = 10000;

  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  camera.position.x = -100;
  camera.position.z = 160;
  camera.position.y = 70;

  scene.add(camera);
}


// --- RENDERER

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMapType = THREE.PCFSoftShadowMap; // options are THREE.BasicShadowMap | THREE.PCFShadowMap | THREE.PCFSoftShadowMap

  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  handleWindowResize();
  window.addEventListener('resize', handleWindowResize, false);
}


// --- LIGHTS

var ambientLight, hemisphereLight, shadowLight;

function setupLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 0.9);
  ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);
  shadowLight = new THREE.DirectionalLight(0xeeeeff, 1);
  shadowLight.position.set(0, 20, 0);
  shadowLight.castShadow = true;
  shadowLight.shadowCameraVisible = true;
  shadowLight.shadowDarkness = 0.1;
  shadowLight.shadow.camera.left = -500;
  shadowLight.shadow.camera.right = 500;
  shadowLight.shadow.camera.top = 500;
  shadowLight.shadow.camera.bottom = -500;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadowCameraVisible = true;
  shadowLight.shadow.mapSize.width = 4096; // default is 512
  shadowLight.shadow.mapSize.height = 4096; // default is 512

  var ch = new THREE.CameraHelper(shadowLight.shadow.camera);

  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);
}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}


// --- OBJECTS

function setupObjects() {
  objsWater();
  objsFloor();
}

function objsWater() {
  // water
  loader = new THREE.JSONLoader();
  loader.load("./assets/3d/water.json", function (geometry, materials) {
    var material = new THREE.MeshLambertMaterial({color: 0x324a5d});
    objs.water = new THREE.Mesh(geometry, material);
    objs.water.scale.set(10, 10, 10);
    objs.water.name = 'water';
    objs.water.castShadow = true;
    objs.water.receiveShadow = true;
    scene.add(objs.water);
  });
}

function objsFloor() {
  var material = new THREE.MeshLambertMaterial({color: 0xeeeeff});
  objs.plane = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), material);
  objs.plane.material.side = THREE.DoubleSide;
  objs.plane.position.y = -11;
  objs.plane.rotation.x = -1.6;
  objs.plane.castShadow = false;
  objs.plane.receiveShadow = true;
  scene.add(objs.plane);
}



// --- LOOP

var deltaTime,
    newTime = new Date().getTime(),
    oldTime = new Date().getTime();

function loop() {
  newTime = new Date().getTime();
  deltaTime = newTime-oldTime;
  oldTime = newTime;

  if (objs.water) {
    // objs.water.scene.rotation.x += 0.01;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}


// --- INIT

function initScene() {

  setupScene();
  setupCamera();
  setupRenderer();
  setupLights();
  setupObjects();

  // controls
  controls = new THREE.OrbitControls(camera);

  loop();
}

window.addEventListener('load', initScene, false);

/* HELPERS */
function setMaterial(node, material) {
  node.material = material;
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      setMaterial(node.children[i], material);
    }
  }
}

