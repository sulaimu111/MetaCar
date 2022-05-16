// import { GLTFLoader } from '/javascripts/GLTFLoader.js';
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let scene, renderer, camera, plane
let cameraControl, statusUI, gui
let ambientLight, pointLight, spotLight, directionalLight
let sphereLightMesh
let rotateAngle = 0
let creeperObj, gltfObj, gltf
let rotateHeadOffset = 0, walkOffset = 0, scaleHeadOffset = 0
let startRotateHead = false
let startWalking = false
let startScaleBody = false
let tween, tween2, tweenBack
let invert = 1
let startTracking = false
let spanWord = 0
let spanWord_target1 = 0
let spanWord_target2 = 0
let offset = {x:0, z:0, rotateY:0}
let target = {x:20, z:0, rotateY:0} 
let pp = {x:0, z:0, y:0}
let pt = {x:0, z:0, y:0}
let flag_tween1 = false
let flag_tween2 = false
let flag_tween3 = false
let flag_tween4 = false
let flag_spanWord = true
let metacarObj
let a = 0
let flag_turn
let original_direction = 1, direction = 0, angle = 0
// let map
let pos = 0
let b = [1,-1,1,1,-1]
let shift_map
let meta_posx, meta_posz
let roundDecimal = function (val, precision) {
  return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
}
let roundUp = function( num, decimal ) { return Math.ceil( ( num + Number.EPSILON ) * Math.pow( 10, decimal ) ) / Math.pow( 10, decimal ); }
let flag_record1 = true;
let flag_record2 = true;
let flag_record3 = true;
let flag_record4 = true;
let flag_record5 = true;
let flag_record6 = true;
let road_path = [];
let road_path_sec = [];
let turn_path = [];
let turn_path2 = [];
let turn_right = [
  [[1,0],[0,-1]],
  [[0,-1],[-1,0]],
  [[-1,0],[0,1]],
  [[0,1],[1,0]]
]
let turn_left = [
  [[1,0],[0,1]],
  [[0,1],[-1,0]],
  [[-1,0],[0,-1]],
  [[0,-1],[1,0]]
]
let turn_direction, turn_direction2, meta_rotationy, flag_forward=true
let move_count = 0
let flag_stop = false
let l, m
let first_search_target = true
let search_target = true
let sec_search_target = false
let flag_sec1 = false
let flag_sec2 = true
let adjustment = 0.5
let flag_turn_around = false
let flag_step1 = true
let flag_step2 = false
let flag_step3 = false
let map_library =[[4, 1, 1, 1],
                  [0, 0, 0, 1],
                  [0, 0, 0, 1],
                  [1, 1, 1, 1],
                  [0, 0, 0, 2],
                  [0, 0, 0, 1],
                  [1, 1, 1, 1],
                  [0, 0, 0, 1],
                  [0, 0, 0, 1]];

let map_school = [[0, 0, 1, 0, 0, 4, 0, 0, 1],
                  [0, 0, 1, 0, 0, 1, 0, 0, 1],
                  [0, 0, 1, 0, 0, 1, 0, 0, 1],
                  [1, 1, 1, 1, 2, 1, 1, 1, 1]];

let map_park = [[1, 1, 1, 1, 2, 1, 1, 1, 1],
                [0, 0, 1, 0, 0, 1, 0, 0, 1],
                [0, 0, 1, 0, 0, 1, 0, 0, 1],
                [0, 0, 1, 0, 0, 1, 0, 0, 4]];

let map_park2 =[[1, 1, 1, 1, 4, 1, 1, 1, 1],
                [0, 0, 1, 0, 1, 0, 0, 0, 1],
                [0, 0, 1, 0, 1, 0, 0, 0, 1],
                [0, 0, 1, 0, 1, 0, 0, 0, 2]];

let flag_library = false
let flag_school = false
let flag_park = false
let flag_place = true

let object_library = "A"
let object_school
let object_park = 1
let flag_sec3 = true, flag_sec4 = true
let direction_record = 0

// Cannon.js
let world
let groundBody
let sphereBody
let boxC1aBody,boxC1bBody
let carBody
let gripperABody, gripperA2Body, gripperBBody, gripperB2Body
let sphere
let box
let gripperA, gripperA2, gripperA3, gripperA4, gripperB, gripperB2, gripperB3, gripperB4, gripperTop
let friction = 0.5
let restitution = 0//0.4
let sphereGroundContact
let gripper_pos_x, gripper_pos_y, gripper_pos_z, metacar_pos_x, metacar_pos_z

let command
let flag_forward_place = true
let flag_backward_place = true

// const timeStep = 1.0 / 60.0 // seconds

const socket = io('https://438d-59-125-76-248.jp.ngrok.io')

socket.on('connection')

socket.on('message', (data) => {
    document.querySelector('h1').innerHTML = data;
    if(data == 1){
      document.getElementById('spanWord').innerHTML = 1
    }
    else if(data == 2){
      document.getElementById('spanWord').innerHTML = 2
    }
    else if(data == 3){  
      document.getElementById('spanWord').innerHTML = 3
    }
    
})

function initObject() {
  const gltfLoader = new THREE.GLTFLoader()
  // const gltfLoader = new THREE.GLTFLoader().setPath('asset/Porsche 911/');

  gltfLoader.load('assets/robomaster02.glb', function ( gltf ) {

    metacarObj = gltf.scene
    metacarObj.position.x = -70
    metacarObj.position.y = -3.2
    metacarObj.position.z = 54
    metacarObj.scale.multiplyScalar(0.8)
    // gltf.scene.position.set(10,10,20)
    metacarObj.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        // object.receiveShadow = true
      }
    })
    // metacarObj.castShadow = true
    // metacarObj.receiveShadow  = true
    scene.add( metacarObj );
    

  }, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
  }, function ( error ) {

    console.error( "An error happened : " + error );

  });
}
// initObject()


class gripper {
  constructor() {
    // 宣告頭、身體、腳幾何體大小
    const gripperbase1Geo = new THREE.BoxGeometry(1, 10, 1);
    const gripperbase2Geo = new THREE.BoxGeometry(1, 10, 1);
    const gripperbase3Geo = new THREE.BoxGeometry(10, 1, 1)
    const gripperbase4Geo = new THREE.BoxGeometry(1, 2, 10)
    const gripperLGeo = new THREE.BoxGeometry(3, 1, 1);
    const gripperRGeo = new THREE.BoxGeometry(3, 1, 1);

    const gripperbase1Mat = new THREE.MeshPhongMaterial({
      color: 0x696969,
      // wireframe: true
    });
    const gripperbase2Mat = new THREE.MeshPhongMaterial({
      color: 0x696969,
      // wireframe: true
    });
    const gripperbase3Mat = new THREE.MeshPhongMaterial({
      color: 0x696969,
      // wireframe: true
    });
    const gripperbase4Mat = new THREE.MeshPhongMaterial({
      color: 0x696969,
      // wireframe: true
    });
    const gripperLMat = new THREE.MeshPhongMaterial({
      color: 0x696969,
      // wireframe: true
    });
    const gripperRMat = new THREE.MeshPhongMaterial({
      color: 0x696969,
      // wireframe: true
    });


    this.base1 = new THREE.Mesh(gripperbase1Geo, gripperbase1Mat)
    // this.base1.position.set(-72, -5, 54)
    this.base1.position.set(-1,0,-1)

    this.base2 = new THREE.Mesh(gripperbase2Geo, gripperbase2Mat)
    // this.base1.position.set(-72, -5, 54)
    this.base2.position.set(-1,0,1)

    this.base3 = new THREE.Mesh(gripperbase3Geo, gripperbase3Mat)
    // this.base2.position.set(-72, -1, 54)
    this.base3.position.set(-4,-1,0)

    this.base4 = new THREE.Mesh(gripperbase4Geo, gripperbase4Mat)
    this.base4.position.set(1,-1,0)

    this.gripperL = new THREE.Mesh(gripperLGeo, gripperLMat)
    this.gripperL.position.set(3,-1,-0.5)

    this.gripperR = new THREE.Mesh(gripperRGeo, gripperRMat)
    this.gripperR.position.set(3,-1,0.5)

    // 將四隻腳組合為一個 group
    this.clip = new THREE.Group()
    this.clip.add(this.gripperL)
    this.clip.add(this.gripperR)
    this.clip.add(this.base3)
    this.clip.add(this.base4)


    // 將頭、身體、腳組合為一個 group
    this.gripper = new THREE.Group()
    this.gripper.add(this.clip)
    this.gripper.add(this.base1)
    this.gripper.add(this.base2)

    this.gripper.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}

function createGripper() {
  gripperObj = new gripper()
  scene.add(gripperObj.gripper)
}


function initPlace(){

  const libraryGeo = new THREE.BoxGeometry(10, 10, 10);
  const libraryMat = new THREE.MeshPhongMaterial({map:new THREE.TextureLoader().load('/images/library.jpg')});
  library_cube = new THREE.Mesh(libraryGeo, libraryMat);
  library_cube.position.set(-40,-2,-12)
  scene.add(library_cube);

  const schoolGeo = new THREE.BoxGeometry(10, 10, 10);
  const schoolMat = new THREE.MeshPhongMaterial({map:new THREE.TextureLoader().load('/images/school.jpg')});
  school_cube = new THREE.Mesh(schoolGeo, schoolMat);
  school_cube.position.set(40,-2,-25)
  scene.add(school_cube);

  const parkGeo = new THREE.BoxGeometry(10, 10, 10);
  const parkMat = new THREE.MeshPhongMaterial({map:new THREE.TextureLoader().load('/images/park.jpg')});
  park_cube = new THREE.Mesh(parkGeo, parkMat);
  park_cube.position.set(19, -2, 25)
  scene.add(park_cube);

  // const parkGeo = new THREE.BoxGeometry(10, 10, 10);
  // const textureloader = new THREE.TextureLoader();
  // const texture = textureloader.load('/images/park.png');
  // const parkMat = new THREE.MeshPhongMaterial({map:texture});
  // park = new THREE.Mesh(parkGeo, parkMat);
  // // park.castShadow = true
  // // park.position.y = -4.5
  // park.position.set(19, -2, 25)
  // scene.add(park);

  // const parkGeo = new THREE.BoxGeometry(10, 10, 10);
  // const textureloader = new THREE.TextureLoader();
  // const texture = textureloader.load('/images/park.png');
  // const parkMat = new THREE.MeshPhongMaterial({map:texture});
  // park = new THREE.Mesh(parkGeo, parkMat);
  // // park.castShadow = true
  // // park.position.y = -4.5
  // park.position.set(19, -2, 25)
  // scene.add(park);

  const loader = new THREE.FontLoader();
  loader.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {
    const parktextGeo = new THREE.TextGeometry( 'PARK', {
      font: font,
      size: 5,
      height: 1,
      curveSegments: 1,

      bevelThickness: 0.3,
      bevelSize: 0.1,
      bevelEnabled: true
    } );
    parktextGeo.computeBoundingBox();
    const parktextMaterial = new THREE.MeshPhongMaterial( { color: 0xffd700, specular: 0xffffff } );
    const park = new THREE.Mesh( parktextGeo, parktextMaterial );
    // park.castShadow = true;
    // park.receiveShadow = true;
    park.position.set(11, 5, 25)
    // mesh.rotation.y = 3.14/4
    scene.add( park );

    const librarytextGeo = new THREE.TextGeometry( 'library', {
      font: font,
      size: 5,
      height: 1,
      curveSegments: 1,

      bevelThickness: 0.3,
      bevelSize: 0.1,
      bevelEnabled: true
    } );
    librarytextGeo.computeBoundingBox();
    const librarytextMaterial = new THREE.MeshPhongMaterial( { color: 0x4169e1, specular: 0xffffff } );
    const library = new THREE.Mesh( librarytextGeo, librarytextMaterial );
    // library.castShadow = true;
    // library.receiveShadow = true;
    library.position.set(-40, 5, -3)
    library.rotation.y = 3.14/2
    scene.add( library );

    const schooltextGeo = new THREE.TextGeometry( 'school', {
      font: font,
      size: 5,
      height: 1,
      curveSegments: 1,

      bevelThickness: 0.3,
      bevelSize: 0.1,
      bevelEnabled: true
    } );
    schooltextGeo.computeBoundingBox();
    const schooltextMaterial = new THREE.MeshPhongMaterial( { color: 0xee82ee, specular: 0xffffff } );
    const school = new THREE.Mesh( schooltextGeo, schooltextMaterial );
    // school.castShadow = true;
    // school.receiveShadow = true;
    school.position.set(30, 5, -25)
    // mesh.rotation.y = 3.14/4
    scene.add( school );
  } );
}

function initStats(){
  const stats = new Stats()
  stats.setMode(0)
  document.getElementById('stats').appendChild(stats.domElement)
  return stats
}

function init(){
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  )
  camera.position.set(150, 150, 150)
  camera.lookAt(scene.position)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.setClearColor(0xeeeeee, 1.0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = 2

  cameraControl = new THREE.OrbitControls(camera, renderer.domElement)
  cameraControl.enableDamping = true
  cameraControl.dampingFactor = 0.05

  // let axes = new THREE.AxesHelper(20)
  // scene.add(axes)

  statsUI = initStats()

  const planeGeometry = new THREE.PlaneGeometry(150, 150)
  const TextureLoader = new THREE.TextureLoader()
  const planetexture = TextureLoader.load('images/roadMap.png')
  // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
  const planeMaterial = new THREE.MeshLambertMaterial({map:planetexture})
  plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(0, -7, 0)
  plane.castShadow = true
  plane.receiveShadow = true
  scene.add(plane)

  // createCreeper()
  initObject()
  initPlace()
  createGripper()
  // createMetacar()

  // metacarObj.position.x = -70
  //   metacarObj.position.y = -3.2
  //   metacarObj.position.z = 54
  // const geometry = new THREE.BoxGeometry(20, 5, 5) // 幾何體
  // const material = new THREE.MeshPhongMaterial({ 
  //     color: 0x0000ff 
  // }) // 材質
  // cube = new THREE.Mesh(geometry, material) // 建立網格物件
  // cube.position.set(-70, -3.2, 54)
  // scene.add(cube)



    // mesh.castShadow = true;
    // mesh.receiveShadow = true;

    // scene.add( mesh );

  let ambientLight = new THREE.AmbientLight(0x404040)
  scene.add(ambientLight)

  let spotLight = new THREE.SpotLight(0xf0f0f0)
  // spotLight.position.set(-10, 30, 20)
  spotLight.position.set(-100, 150, 100)
  spotLight.castShadow = true
  spotLight.angle = Math.PI/4;
  scene.add(spotLight)

  // pointLight = new THREE.PointLight(0xccffcc, 1, 300)
  // pointLight.castShadow = true
  // // pointLight.position.set(-30, 30, 30)
  // pointLight.position.set(-80, 150, 80)
  // scene.add(pointLight)

  document.body.appendChild(renderer.domElement)
}

function initCannonWorld() {
  // 建立物理世界
  world = new CANNON.World()

  // 設定重力場為 y 軸 -9.8 m/s²
  world.gravity.set(0, -20, 0)

  // 碰撞偵測
  world.broadphase = new CANNON.NaiveBroadphase()

  // 建立地板剛體
  let groundShape = new CANNON.Plane()
  let groundCM = new CANNON.Material()
  groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape,
    position: new CANNON.Vec3(0, -7, 0),
    material: groundCM
  })
  // setFromAxisAngle 旋轉 x 軸 -90 度
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
  world.add(groundBody)

  plane.position.copy(groundBody.position)
  plane.quaternion.copy(groundBody.quaternion)

  // 建立球剛體
  // let sphereShape = new CANNON.Sphere(1)
  // let sphereCM = new CANNON.Material()
  // sphereBody = new CANNON.Body({
  //   mass: 5,
  //   shape: sphereShape,
  //   position: new CANNON.Vec3(0, 0, 0),
  //   material: sphereCM
  // })
  // world.add(sphereBody)


  // metacarObj.position.x = -70
  // metacarObj.position.y = -3.2
  // metacarObj.position.z = 54
  // 建立車剛體
  // let carShape = new CANNON.Box(new CANNON.Vec3(5, 1, 5))
  // let carCM = new CANNON.Material()
  // carBody = new CANNON.Body({
  //   mass: 0,
  //   shape: carShape,
  //   position: new CANNON.Vec3(-70, -6, 54),
  //   material: carCM
  // })
  // world.add(carBody)

  // 設定兩剛體碰撞時交互作用屬性
  // carGroundContact = new CANNON.ContactMaterial(groundCM, carCM, {
  //   friction: friction, // 摩擦力
  //   restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  // })
  // world.addContactMaterial(carGroundContact)

  // 建立C1方塊
  let boxC1aShape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
  let boxC1aCM = new CANNON.Material()
  boxC1aBody = new CANNON.Body({
    mass: 5,
    shape: boxC1aShape,
    position: new CANNON.Vec3(60, 0.5, 54),
    material: boxC1aCM
  })
  world.add(boxC1aBody)
  
  // 設定兩剛體碰撞時交互作用屬性
  boxC1aGroundContact = new CANNON.ContactMaterial(groundCM, boxC1aCM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(boxC1aGroundContact)

  let boxC1bShape = new CANNON.Box(new CANNON.Vec3(1.5, 2.5, 1.5))
  let boxC1bCM = new CANNON.Material()
  boxC1bBody = new CANNON.Body({
    mass: 5,
    shape: boxC1bShape,
    position: new CANNON.Vec3(60, -4.5, 54),
    material: boxC1bCM
  })
  world.add(boxC1bBody)

  boxC1bGroundContact = new CANNON.ContactMaterial(groundCM, boxC1bCM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(boxC1bGroundContact)

  boxC1Joint = new CANNON.LockConstraint(boxC1aBody, boxC1bBody)
  world.addConstraint(boxC1Joint)

  // 設定兩剛體碰撞時交互作用屬性
  


  // metacarObj.position.x = -70
  // metacarObj.position.y = -3.2
  // metacarObj.position.z = 54

  // 建立夾爪A
  let gripperAShape = new CANNON.Box(new CANNON.Vec3(5, 0.5, 0.5))
  let gripperACM = new CANNON.Material()
  gripperABody = new CANNON.Body({
    mass: 0,
    shape: gripperAShape,
    position: new CANNON.Vec3(-70, -2.5, 54),
    material: gripperACM
  })
  world.add(gripperABody)


  // 設定兩剛體碰撞時交互作用屬性
  gripperAGroundContact = new CANNON.ContactMaterial(groundCM, gripperACM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(gripperAGroundContact)

  // 建立夾爪A2
  let gripperA2Shape = new CANNON.Box(new CANNON.Vec3(0.5, 2, 0.5))
  let gripperA2CM = new CANNON.Material()
  gripperA2Body = new CANNON.Body({
    mass: 0,
    shape: gripperA2Shape,
    position: new CANNON.Vec3(-70, -2.5, 54),
    material: gripperA2CM
  })
  world.add(gripperA2Body)


  // 設定兩剛體碰撞時交互作用屬性
  gripperA2GroundContact = new CANNON.ContactMaterial(groundCM, gripperA2CM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(gripperA2GroundContact)



  // 建立夾爪A3
  let gripperA3Shape = new CANNON.Box(new CANNON.Vec3(0.5, 2, 0.5))
  let gripperA3CM = new CANNON.Material()
  gripperA3Body = new CANNON.Body({
    mass: 0,
    shape: gripperA3Shape,
    position: new CANNON.Vec3(-70, -2.55, 54),
    material: gripperA3CM
  })
  world.add(gripperA3Body)


  // 設定兩剛體碰撞時交互作用屬性
  gripperA3GroundContact = new CANNON.ContactMaterial(groundCM, gripperA3CM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(gripperA3GroundContact)


  // 建立夾爪A4
  let gripperA4Shape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 0.5))
  let gripperA4CM = new CANNON.Material()
  gripperA4Body = new CANNON.Body({
    mass: 0,
    shape: gripperA4Shape,
    position: new CANNON.Vec3(-70, -2.5, 54),
    material: gripperA4CM
  })
  world.add(gripperA4Body)


  // 設定兩剛體碰撞時交互作用屬性
  gripperA4GroundContact = new CANNON.ContactMaterial(groundCM, gripperA4CM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(gripperA4GroundContact)


  // 建立夾爪B
  let gripperBShape = new CANNON.Box(new CANNON.Vec3(5, 0.5, 0.5))
  let gripperBCM = new CANNON.Material()
  gripperBBody = new CANNON.Body({
    mass: 0,
    shape: gripperBShape,
    position: new CANNON.Vec3(-70, -2.5, 54),
    material: gripperBCM
  })
  world.add(gripperBBody)


  // 設定兩剛體碰撞時交互作用屬性
  gripperBGroundContact = new CANNON.ContactMaterial(groundCM, gripperBCM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(gripperBGroundContact)


  // 建立夾爪B2
  let gripperB2Shape = new CANNON.Box(new CANNON.Vec3(0.5, 2, 0.5))
  let gripperB2CM = new CANNON.Material()
  gripperB2Body = new CANNON.Body({
    mass: 0,
    shape: gripperB2Shape,
    position: new CANNON.Vec3(-70, -2.5, 54),
    material: gripperB2CM
  })
  world.add(gripperB2Body)


  // 設定兩剛體碰撞時交互作用屬性
  gripperB2GroundContact = new CANNON.ContactMaterial(groundCM, gripperB2CM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(gripperB2GroundContact)


  // 建立夾爪B3
  let gripperB3Shape = new CANNON.Box(new CANNON.Vec3(0.5, 2, 0.5))
  let gripperB3CM = new CANNON.Material()
  gripperB3Body = new CANNON.Body({
    mass: 0,
    shape: gripperB3Shape,
    position: new CANNON.Vec3(-70, -2.5, 54),
    material: gripperB3CM
  })
  world.add(gripperB3Body)


  // 設定兩剛體碰撞時交互作用屬性
  gripperB3GroundContact = new CANNON.ContactMaterial(groundCM, gripperB3CM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(gripperB3GroundContact)


  // 建立夾爪B4
  let gripperB4Shape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 0.5))
  let gripperB4CM = new CANNON.Material()
  gripperB4Body = new CANNON.Body({
    mass: 0,
    shape: gripperB4Shape,
    position: new CANNON.Vec3(-70, -2.5, 54),
    material: gripperB4CM
  })
  world.add(gripperB4Body)


  // 設定兩剛體碰撞時交互作用屬性
  gripperB4GroundContact = new CANNON.ContactMaterial(groundCM, gripperB4CM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(gripperB4GroundContact)


  // 建立夾爪蓋
  let gripperTopShape = new CANNON.Box(new CANNON.Vec3(10, 0.5, 2.5))
  let gripperTopCM = new CANNON.Material()
  gripperTopBody = new CANNON.Body({
    mass: 0,
    shape: gripperTopShape,
    position: new CANNON.Vec3(-70, 6.1, 54),
    material: gripperTopCM
  })
  world.add(gripperTopBody)


  // 設定兩剛體碰撞時交互作用屬性
  gripperTopGroundContact = new CANNON.ContactMaterial(groundCM, gripperTopCM, {
    friction: friction, // 摩擦力
    restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  })
  world.addContactMaterial(gripperTopGroundContact)

  // gripperBJoint = new CANNON.LockConstraint(gripperBBody, gripperB2Body)
  // world.addConstraint(gripperBJoint)

  // // 設定兩剛體碰撞時交互作用屬性
  // sphereGroundContact = new CANNON.ContactMaterial(groundCM, sphereCM, {
  //   friction: friction, // 摩擦力
  //   restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
  // })
  // world.addContactMaterial(sphereGroundContact)

  // 地板網格
  // let groundGeometry = new THREE.PlaneGeometry(20, 20, 32)
  // let groundMaterial = new THREE.MeshLambertMaterial({
  //   color: 0xa5a5a5,
  //   side: THREE.DoubleSide
  // })
  // let ground = new THREE.Mesh(groundGeometry, groundMaterial)
  // ground.rotation.x = -Math.PI / 2
  // ground.receiveShadow = true
  // // ground.position.y = -7
  // scene.add(ground)

  // 球網格
  let sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
  let sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x33aaaa })
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.castShadow = true
  // scene.add(sphere)


  // (20, 1, 5)
  const carGeo = new THREE.BoxGeometry(10, 1, 5);
  const carMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    // wireframe: true
  });
  car = new THREE.Mesh(carGeo, carMat);
  car.castShadow = true
  // car.position.y = 10
  // scene.add(car);

  const gripperAGeo = new THREE.BoxGeometry(10, 1, 1);
  const gripperAMat = new THREE.MeshPhongMaterial({
    color: 0x4287f5,
    // wireframe: true
  });
  gripperA = new THREE.Mesh(gripperAGeo, gripperAMat);
  gripperA.castShadow = true
  // car.position.y = 10
  // scene.add(gripperA);

  const gripperA2Geo = new THREE.BoxGeometry(1, 4, 1);
  const gripperA2Mat = new THREE.MeshPhongMaterial({
    color: 0x4287f5,
    // wireframe: true
  });
  gripperA2 = new THREE.Mesh(gripperA2Geo, gripperA2Mat);
  gripperA2.castShadow = true
  // car.position.y = 10
  // scene.add(gripperA2);

  const gripperA3Geo = new THREE.BoxGeometry(1, 4, 1);
  const gripperA3Mat = new THREE.MeshPhongMaterial({
    color: 0x4287f5,
    // wireframe: true
  });
  gripperA3 = new THREE.Mesh(gripperA3Geo, gripperA3Mat);
  gripperA3.castShadow = true
  // car.position.y = 10
  // scene.add(gripperA3);

  const gripperA4Geo = new THREE.BoxGeometry(5, 5, 1);
  const gripperA4Mat = new THREE.MeshPhongMaterial({
    color: 0x4287f5,
    // wireframe: true
  });
  gripperA4 = new THREE.Mesh(gripperA4Geo, gripperA4Mat);
  gripperA4.castShadow = true
  // car.position.y = 10
  // scene.add(gripperA4);

  const gripperBGeo = new THREE.BoxGeometry(10, 1, 1);
  const gripperBMat = new THREE.MeshPhongMaterial({
    color: 0x4287f5,
    // wireframe: true
  });
  gripperB = new THREE.Mesh(gripperBGeo, gripperBMat);
  gripperB.castShadow = true
  // car.position.y = 10
  // scene.add(gripperB);

  const gripperB2Geo = new THREE.BoxGeometry(1, 4, 1);
  const gripperB2Mat = new THREE.MeshPhongMaterial({
    color: 0x4287f5,
    // wireframe: true
  });
  gripperB2 = new THREE.Mesh(gripperB2Geo, gripperB2Mat);
  gripperB2.castShadow = true
  // car.position.y = 10
  // scene.add(gripperB2);

  const gripperB3Geo = new THREE.BoxGeometry(1, 4, 1);
  const gripperB3Mat = new THREE.MeshPhongMaterial({
    color: 0x4287f5,
    // wireframe: true
  });
  gripperB3 = new THREE.Mesh(gripperB3Geo, gripperB3Mat);
  gripperB3.castShadow = true
  // car.position.y = 10
  // scene.add(gripperB3);

  const gripperB4Geo = new THREE.BoxGeometry(5, 5, 1);
  const gripperB4Mat = new THREE.MeshPhongMaterial({
    color: 0x4287f5,
    // wireframe: true
  });
  gripperB4 = new THREE.Mesh(gripperB4Geo, gripperB4Mat);
  gripperB4.castShadow = true
  // car.position.y = 10
  // scene.add(gripperB4);

  const gripperTopGeo = new THREE.BoxGeometry(20, 1, 5);
  const gripperTopMat = new THREE.MeshPhongMaterial({
    color: 0x4287f5,
    // wireframe: true
  });
  gripperTop = new THREE.Mesh(gripperTopGeo, gripperTopMat);
  gripperTop.castShadow = true
  // car.position.y = 10
  // scene.add(gripperTop);

  const boxC1aGeo = new THREE.BoxGeometry(5, 5, 5);
  const boxC1aMat = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    // wireframe: true
  });
  boxC1a = new THREE.Mesh(boxC1aGeo, boxC1aMat);
  boxC1a.castShadow = true
  boxC1a.position.y = 10
  scene.add(boxC1a);

  const boxC1bGeo = new THREE.BoxGeometry(3, 5, 3);
  const boxC1bMat = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    // wireframe: true
  });
  boxC1b = new THREE.Mesh(boxC1bGeo, boxC1bMat);
  boxC1b.castShadow = true
  boxC1b.position.y = 10
  scene.add(boxC1b);
}


function forward(){

  if(metacarObj.rotation.y<=0.5 && metacarObj.rotation.y>=-0.5){
    metacarObj.rotation.y = 0
  }
  else if(metacarObj.rotation.y<=1.65 && metacarObj.rotation.y>=1.5){
    metacarObj.rotation.y = 1.57
  }
  else if(metacarObj.rotation.y>=-1.65 && metacarObj.rotation.y<=-1.5){
    metacarObj.rotation.y = -1.57
  }
  else if(metacarObj.rotation.y>=3.1 && metacarObj.rotation.y<=3.2){
    metacarObj.rotation.y = 3.14
  }
  else if(metacarObj.rotation.y>=-3.2 && metacarObj.rotation.y<=-3.1){
    metacarObj.rotation.y = -3.14
  }


  if(move_count>=20){
    flag_record1 = true
  }
  // metacarObj.position.x = -35
  // metacarObj.position.y = -4.1
  // metacarObj.position.z = 22.5

  //new position
  // metacarObj.position.x = -70
  // metacarObj.position.y = -4.1
  // metacarObj.position.z = 54
  if(((metacarObj.position.x<=-20+adjustment && metacarObj.position.x>=-20-adjustment) && (metacarObj.position.z>=54-adjustment && metacarObj.position.z<=54+adjustment) ||
      (metacarObj.position.x<=-20+adjustment && metacarObj.position.x>=-20-adjustment) && (metacarObj.position.z>=0-adjustment && metacarObj.position.z<=0+adjustment) ||
      (metacarObj.position.x<=-30+adjustment && metacarObj.position.x>=-30-adjustment) && (metacarObj.position.z>=0-adjustment && metacarObj.position.z<=0+adjustment) ||
      (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=0-adjustment && metacarObj.position.z<=0+adjustment) ||
      (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=-15-adjustment && metacarObj.position.z<=-15+adjustment) ||
      (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment))  &&
      flag_record1){
    console.log('stttttttttttttttoooop')
    flag_forward = false
    flag_turn = true
    flag_record1 = false
    move_count = 0
    if(turn_direction == null){
      console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn')
      flag_stop = true
    }
  }
  else if((metacarObj.position.x>=-70-adjustment && metacarObj.position.x<=-70+adjustment) && (metacarObj.position.z>=54-adjustment && metacarObj.position.z<=54+adjustment) && flag_sec2 != true){
    console.log('stttttttttttttttoooop')
    flag_forward = false
    flag_turn = true
    flag_record1 = false
    move_count = 0
    if(turn_direction == null){
      console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn')
      flag_stop = true
    }
  }
  else if(Math.floor(metacarObj.rotation.y*100)/100 == 0 && flag_stop!=true){
    metacarObj.position.x = metacarObj.position.x + 0.5
    move_count = move_count + 1
    console.log('22222222222222222222')
  }
  else if((Math.floor(metacarObj.rotation.y*100)/100 == 3.14 || (metacarObj.rotation.y < -3.1 && metacarObj.rotation.y > -3.2)) && flag_stop!=true){
    metacarObj.position.x = metacarObj.position.x - 0.5
    move_count = move_count + 1
    console.log('22222222222222222222')
  }
  else if(Math.floor(metacarObj.rotation.y*100)/100 == 3.14/2 && flag_stop!=true){
    metacarObj.position.z = metacarObj.position.z - 0.5
    move_count = move_count + 1
    console.log('333333333333333333333')
  }
  else if((((Math.round(metacarObj.rotation.y * 100) / 100) > 4.7 && (Math.round(metacarObj.rotation.y * 100) / 100) < 4.75) || Math.floor(metacarObj.rotation.y*100)/100 == -3.14/2) && flag_stop!=true){
    metacarObj.position.z = metacarObj.position.z + 0.5
    move_count = move_count + 1
    console.log('333333333333333333333')
  }
  else{
    for(l=0; l<map.length; l++){
      if(map[l].indexOf(4) != -1){
        break
      }
    }
    for(m=0; m<map.length; m++){
      if(map[m].indexOf(2) != -1){
        break
      }
    }
    flag_forward = true
    
    if(spanWord == 1 && flag_place){
      flag_library = true
      flag_place = false
    }
    else if(spanWord == 2 && flag_place){
      flag_school = true
      flag_place = false
    }
    else if(spanWord == 3 && flag_place){
      flag_park = true
      flag_place = false
    }

    // if(flag_library){
    //   console.log("flag_library")
    // }
    // else if(flag_school){
    //   console.log("flag_school")
    // }
    // else if(flag_park){
    //   console.log("flag_park")
    // }

    // flag_sec1 = true
    console.log('m = ', m)
    console.log('l = ', l)
    if(flag_sec1 && flag_sec2 && spanWord == 1){
      console.log("spanWord == 1")
      flag_sec2 = false
      // flag_spanWord = true
      flag_record3 = true
      first_search_target = false
      sec_search_target = true
      flag_stop = false
      flag_tween1 = true
      flag_tween4 = false
      flag_turn_around = true
      while (path.length) {
        path.pop();
      }
      while (road_path.length) {
        road_path.pop();
      }
      while (road_path_sec.length) {
        road_path_sec.pop();
      }
      while (turn_path.length) {
        turn_path.pop();
      }

      map[m][map[m].indexOf(2)] = 1
      map[l][map[l].indexOf(4)] = 2
      map[9][0] = 4
    }
    else if(flag_sec1 && flag_sec2 && spanWord == 2){
      console.log("spanWord == 2")
      flag_sec2 = false
      // flag_spanWord = true
      flag_record3 = true
      first_search_target = false
      sec_search_target = true
      flag_stop = false
      flag_tween1 = true
      flag_tween4 = false
      flag_turn_around = true
      while (path.length) {
        path.pop();
      }
      while (road_path.length) {
        road_path.pop();
      }
      while (road_path_sec.length) {
        road_path_sec.pop();
      }
      while (turn_path.length) {
        turn_path.pop();
      }

      map[m][map[m].indexOf(2)] = 1
      map[l][map[l].indexOf(4)] = 2
      map[9][0] = 4
      
    }
    else if(flag_sec1 && flag_sec2 && spanWord == 3){
      console.log("spanWord == 333")
      flag_sec2 = false
      // flag_spanWord = true
      flag_record3 = true
      first_search_target = false
      sec_search_target = true
      flag_stop = false
      flag_tween1 = true
      flag_tween4 = false
      flag_turn_around = true
      while (path.length) {
        path.pop();
      }
      while (road_path.length) {
        road_path.pop();
      }
      while (road_path_sec.length) {
        road_path_sec.pop();
      }
      while (turn_path.length) {
        turn_path.pop();
      }
      // turn_path.pop();

      map =  [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];//park:(3, 3);

      // map[m][map[m].indexOf(2)] = 1
      // map[l][map[l].indexOf(4)] = 2
      // map[9][0] = 4
      
    }
    // else if(flag_turn_around){
    //   console.log("flag_turn_around")
    // }
    
    move_count = 0
    console.log("map = ", map)
    
    console.log('4444444444444444444444444444444444444')
    
    
  }
  // console.log("path = ", path)
  console.log("metacarObj.rotation.y = ", Math.round(metacarObj.rotation.y * 100) / 100)
  console.log("turn_direction = ", turn_direction)
  // console.log("flag_record1 = ", flag_record1)
  // console.log("move_count = ", move_count)
  // console.log("flag_record3 = ", flag_record3)
  // console.log("road_path_sec = ", road_path_sec)
  console.log("turn_path = ", turn_path)
  // console.log("flag_tween1 = ", flag_tween1)
  // console.log("flag_tween4 = ", flag_tween4)
  console.log("flag_library = ", flag_library)
  console.log("flag_school = ", flag_school)
  console.log("flag_park = ", flag_park)
  console.log("metacarObj.position.x = ", metacarObj.position.x)
  console.log("metacarObj.position.z = ", metacarObj.position.z)
  // console.log("metacarObj.rotation.y = ", Math.floor(metacarObj.rotation.y*100)/100)
  // console.log("first_search_target = ", first_search_target)
}

function forward_place(){
  // console.log("turn_direction2 = ", turn_direction2)
  
  if(flag_sec3){
    while (path.length) {
      path.pop();
    }
    while (road_path.length) {
      road_path.pop();
    }
    while (road_path_sec.length) {
      road_path_sec.pop();
    }
    flag_tween1 = true
    flag_tween4 = false
    flag_sec3 = false
    flag_stop = false
    
    map = map_park
    // map = [[1, 1, 1, 1, 2, 1, 1, 1, 1],
    //       [0, 0, 1, 0, 0, 1, 0, 0, 1],
    //       [0, 0, 1, 0, 0, 1, 0, 0, 1],
    //       [0, 1, 1, 0, 1, 1, 0, 4, 1]];
    
    console.log("flag_sec3")
    row = map.length;
    col = map[0].length;
  }
  
  
  if(move_count>=20){
    flag_record1 = true
  }

  if(((metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment) || //park
      (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment) || //park C1
      (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=44-adjustment && metacarObj.position.z<=44+adjustment) || //park C1
      (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=0-adjustment && metacarObj.position.z<=0+adjustment) || //library
      (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=-15-adjustment && metacarObj.position.z<=-15+adjustment)) //school
      && flag_record1){
    console.log('stttttttttttttttoooop')
    flag_forward = false
    flag_turn = true
    flag_record1 = false
    flag_record4 = true
    move_count = 0
    if(turn_path2.length < 1){
      console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn')
      flag_stop = true
    }
  }
  else if((metacarObj.position.x>=-70-adjustment && metacarObj.position.x<=-70+adjustment) && (metacarObj.position.z>=54-adjustment && metacarObj.position.z<=54+adjustment) && flag_sec2 != true){
    console.log('stttttttttttttttoooop')
    flag_forward = false
    flag_turn = true
    flag_record1 = false
    move_count = 0
    if(turn_path2.length < 1){
      console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn')
      flag_stop = true
    }
  }
  

  if(turn_direction2 == 0 && flag_stop!=true){
    move_count = move_count + 1
    metacarObj.position.x = metacarObj.position.x + 0.5
  }
  else if(turn_direction2 == 1 && flag_stop!=true){
    move_count = move_count + 1
    metacarObj.position.z = metacarObj.position.z - 0.5
  }
  else if(turn_direction2 == 2 && flag_stop!=true){
    move_count = move_count + 1
    metacarObj.position.x = metacarObj.position.x - 0.5
  }
  else if(turn_direction2 == 3 && flag_stop!=true){
    move_count = move_count + 1
    metacarObj.position.z = metacarObj.position.z + 0.5
  }



  if(flag_record5 && flag_stop){
    gripperABody.position.z = gripperABody.position.z + 2
    gripperBBody.position.z = gripperBBody.position.z + 2
    console.log("flag_record5 = ", flag_record5)
    gripper_pos_x = gripperABody.position.x
    gripper_pos_z = gripperABody.position.z
    gripper_pos_y = gripperABody.position.y
    metacar_pos_x = metacarObj.position.x

    // metacarObj_pos_z = metacarObj.position.z
    flag_record5 = false
    flag_step1 = true
    // flag_stop = false
  }
  else if(gripperABody.position.x >= gripper_pos_x-4 && gripperBBody.position.x <= gripper_pos_x+4 && flag_step1){
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    gripperABody.position.x = gripperABody.position.x - 0.05
    gripperBBody.position.x = gripperBBody.position.x + 0.05
    gripperObj.gripperL.position.z = gripperObj.gripperL.position.z - 0.05
    gripperObj.gripperR.position.z = gripperObj.gripperR.position.z + 0.05
  }
  else if(gripperABody.position.z <= gripper_pos_z+6 && gripperBBody.position.z <= gripper_pos_z+6 && flag_step1){
    // console.log("ffffffffffffffffffffffffffff")
    gripperABody.position.z = gripperABody.position.z + 0.05
    gripperBBody.position.z = gripperBBody.position.z + 0.05
    gripperTopBody.position.z = gripperTopBody.position.z + 0.05
    gripperObj.clip.position.x = gripperObj.clip.position.x + 0.05
    // gripperObj.gripperR.position.x = gripperObj.gripperR.position.x + 0.05
    // gripperObj.base1.position.y = gripperObj.base1.position.y + 0.05
    // gripperObj.base3.position.x = gripperObj.base3.position.x + 0.05
    // gripperObj.base4.position.x = gripperObj.base4.position.x + 0.05
    // gripperObj.gripperR.position.z = gripperObj.gripperR.position.z + 0.05
  }
  else if(flag_step1){
    flag_step1 = false
    flag_step2 = true
  }

  if(gripperABody.position.x <= gripper_pos_x-2.5 && gripperBBody.position.x >= gripper_pos_x+2.5 && flag_step1 != true && flag_step2){
    // console.log("gggggggggggggggggggggggggggg")
    gripperABody.position.x = gripperABody.position.x + 0.05
    gripperBBody.position.x = gripperBBody.position.x - 0.05
    gripperObj.gripperL.position.z = gripperObj.gripperL.position.z + 0.05
    gripperObj.gripperR.position.z = gripperObj.gripperR.position.z - 0.05
  }
  else if(gripperABody.position.y <= gripper_pos_y+2.5 && gripperBBody.position.y <= gripper_pos_y+2.5 && flag_step1 != true && flag_step2){
    // console.log("gggggggggggggggggggggggggggg")
    gripperABody.position.y = gripperABody.position.y + 0.05
    gripperBBody.position.y = gripperBBody.position.y + 0.05
    gripperObj.clip.position.y = gripperObj.clip.position.y + 0.05
  }
  // else if(gripperABody.position.y <= gripper_pos_y+10 && gripperBBody.position.y <= gripper_pos_y+10 && flag_step1 != true){
  //   console.log("ffffffffffffffffffffffffffff")
  //   gripperABody.position.y = gripperABody.position.y + 0.05
  //   gripperBBody.position.y = gripperBBody.position.y + 0.05
  //   // boxC1body.position.z = gripperABody.position.z
  // }
  else if(gripperABody.position.z >= gripper_pos_z+3 && gripperBBody.position.z >= gripper_pos_z+3 && flag_step1 != true && flag_step2){
    // console.log("ffffffffffffffffffffffffffff")
    gripperABody.position.z = gripperABody.position.z - 0.05
    gripperBBody.position.z = gripperBBody.position.z - 0.05
    gripperTopBody.position.z = gripperTopBody.position.z - 0.05
    gripperObj.clip.position.x = gripperObj.clip.position.x - 0.05
  }
  else if(metacarObj.position.x >= metacar_pos_x-10 && flag_step1 != true && flag_step2){
    metacarObj.position.x = metacarObj.position.x - 0.05
    gripperABody.position.x = gripperABody.position.x - 0.05
    gripperBBody.position.x = gripperBBody.position.x - 0.05
    gripperTopBody.position.x = metacarObj.position.x
    gripperObj.gripper.position.x = metacarObj.position.x
    // console.log("step1_finish0")
  }
  else if(flag_step1 != true && flag_step2){
    flag_step2 = false
    flag_step3 = true
    // console.log("step1_finish")
  }

  if(gripperABody.position.z <= gripper_pos_z+6 && gripperBBody.position.z <= gripper_pos_z+6 && flag_step1 != true && flag_step2 != true && flag_step3){
    gripperABody.position.z = gripperABody.position.z + 0.05
    gripperBBody.position.z = gripperBBody.position.z + 0.05
    gripperTopBody.position.z = gripperTopBody.position.z + 0.05
    gripperObj.clip.position.x = gripperObj.clip.position.x + 0.05
    // console.log("gripperTopBody.position.z = " , gripperTopBody.position.z)
    // console.log("step2")
  }
  else if(gripperABody.position.y >= gripper_pos_y && gripperBBody.position.y >= gripper_pos_y && flag_step1 != true && flag_step2 != true && flag_step3){
    // console.log("gggggggggggggggggggggggggggg")
    gripperABody.position.y = gripperABody.position.y - 0.05
    gripperBBody.position.y = gripperBBody.position.y - 0.05
    if(gripperTopBody.position.y >= 3.6){
      gripperTopBody.position.y = gripperTopBody.position.y - 0.05
      gripperObj.clip.position.y = gripperObj.clip.position.y - 0.05
    }
  }
  // else if(flag_step1 != true && flag_step2 != true && flag_step3){
  //   flag_step3 = false
  // }

  else if(gripperObj.clip.position.x >= 3 && flag_step1 != true && flag_step2 != true && flag_step3){
    // console.log("gggggggggggggggggggggggggggg")
    // gripperABody.position.z = gripperABody.position.z - 0.05
    // gripperBBody.position.z = gripperBBody.position.z - 0.05
    // gripperTopBody.position.z = gripperTopBody.position.z - 0.05
    gripperObj.clip.position.x = gripperObj.clip.position.x - 0.05
    // if(gripperTopBody.position.y >= 3.6){
    //   gripperTopBody.position.y = gripperTopBody.position.y - 0.05
    //   gripperObj.clip.position.y = gripperObj.clip.position.y - 0.05
    // }
  }
  else if((boxC1aBody.position.x>=50-adjustment && boxC1aBody.position.x<=50+adjustment) && (boxC1aBody.position.y>=0.5-adjustment && boxC1aBody.position.y<=0.5+adjustment) && (boxC1aBody.position.z>=54-adjustment && boxC1aBody.position.z<=54+adjustment)){
    console.log("finishhhhhhhhhhhhhhh")
    gripperABody.position.x = metacarObj.position.x
    gripperABody.position.z = metacarObj.position.z
    gripperBBody.position.x = metacarObj.position.x
    gripperBBody.position.z = metacarObj.position.z
    gripperTopBody.position.y = 6.1
    gripperTopBody.position.z = metacarObj.position.z
    flag_step1 = false
    flag_step2 = false
    flag_step3 = false
    flag_sec3 = true
    flag_forward_place = false
    flag_backward_place = true
    flag_record5 = true
  }

  console.log("boxC1aBody.position.x = ", boxC1aBody.position.x)
  console.log("boxC1aBody.position.z = ", boxC1aBody.position.z)

  if(flag_step1){
    gripperA2Body.position.x = gripperABody.position.x
    gripperA2Body.position.y = gripperABody.position.y
    gripperA2Body.position.z = gripperABody.position.z+5.5
    gripperA3Body.position.x = gripperABody.position.x
    gripperA3Body.position.y = gripperABody.position.y
    gripperA3Body.position.z = gripperABody.position.z-0.5
    gripperA4Body.position.x = gripperABody.position.x-0.5
    gripperA4Body.position.y = gripperABody.position.y
    gripperA4Body.position.z = gripperABody.position.z+3
    gripperB2Body.position.x = gripperBBody.position.x
    gripperB2Body.position.y = gripperBBody.position.y
    gripperB2Body.position.z = gripperBBody.position.z+5.5
    gripperB3Body.position.x = gripperBBody.position.x
    gripperB3Body.position.y = gripperBBody.position.y
    gripperB3Body.position.z = gripperBBody.position.z-0.5
    gripperB4Body.position.x = gripperBBody.position.x+0.5
    gripperB4Body.position.y = gripperBBody.position.y
    gripperB4Body.position.z = gripperBBody.position.z+3

    // gripperTopBody.position.x = metacarObj.position.x
    // gripperTopBody.position.z = metacarObj.position.z
  }
  // else if(flag_record5 != true && flag_step1 != true && flag_step2 != true){
  //   gripperA2Body.position.x = gripperABody.position.x
  //   gripperA2Body.position.y = gripperABody.position.y
  //   gripperA2Body.position.z = gripperABody.position.z+5.5
  //   gripperA3Body.position.x = gripperABody.position.x
  //   gripperA3Body.position.y = gripperABody.position.y
  //   gripperA3Body.position.z = gripperABody.position.z-0.5
  //   gripperA4Body.position.x = gripperABody.position.x-0.5
  //   gripperA4Body.position.y = gripperABody.position.y
  //   gripperA4Body.position.z = gripperABody.position.z+3
  //   gripperB2Body.position.x = gripperBBody.position.x
  //   gripperB2Body.position.y = gripperBBody.position.y
  //   gripperB2Body.position.z = gripperBBody.position.z+5.5
  //   gripperB3Body.position.x = gripperBBody.position.x
  //   gripperB3Body.position.y = gripperBBody.position.y
  //   gripperB3Body.position.z = gripperBBody.position.z-0.5
  //   gripperB4Body.position.x = gripperBBody.position.x+0.5
  //   gripperB4Body.position.y = gripperBBody.position.y
  //   gripperB4Body.position.z = gripperBBody.position.z+3

  //   gripperTopBody.position.y = gripperABody.position.y+7.5
  //   gripperTopBody.position.z = gripperABody.position.z
  // }
  else{
    gripperA2Body.position.x = gripperABody.position.x
    gripperA2Body.position.y = gripperABody.position.y
    gripperA2Body.position.z = gripperABody.position.z+5.5
    gripperA3Body.position.x = gripperABody.position.x
    gripperA3Body.position.y = gripperABody.position.y
    gripperA3Body.position.z = gripperABody.position.z-0.5
    gripperA4Body.position.x = gripperABody.position.x-0.5
    gripperA4Body.position.y = gripperABody.position.y
    gripperA4Body.position.z = gripperABody.position.z+3
    gripperB2Body.position.x = gripperBBody.position.x
    gripperB2Body.position.y = gripperBBody.position.y
    gripperB2Body.position.z = gripperBBody.position.z+5.5
    gripperB3Body.position.x = gripperBBody.position.x
    gripperB3Body.position.y = gripperBBody.position.y
    gripperB3Body.position.z = gripperBBody.position.z-0.5
    gripperB4Body.position.x = gripperBBody.position.x+0.5
    gripperB4Body.position.y = gripperBBody.position.y
    gripperB4Body.position.z = gripperBBody.position.z+3
    

    // gripperTopBody.position.x = metacarObj.position.x
    // gripperTopBody.position.z = metacarObj.position.z
  }
  // gripperTopBody.position.x = metacarObj.position.x
  // gripperTopBody.position.y = metacarObj.position.y
  // gripperTopBody.position.z = metacarObj.position.z
  

  // if(flag_library){
  //   console.log("flag_library")
  // }
  // else if(flag_school){
  //   console.log("flag_school")
  // }
  // else if(flag_park){
  //   console.log("flag_park")
  // }
  // console.log("turn_path2 = ", turn_path2)
  // console.log("turn_direction2 = ", turn_direction2)
  // console.log("flag_step1 = ", flag_step1)
  // console.log("flag_step2 = ", flag_step2)
  // console.log("flag_stop = ", flag_stop)
  // console.log("gripperABody.position.z = ", gripperABody.position.z)
  // console.log("gripperBBody.position.z = ", gripperBBody.position.z)
  // console.log("metacarObj.position.x = ", metacarObj.position.x)
  // console.log("metacarObj.position.z = ", metacarObj.position.z)
}

function backward_place(){

  if(flag_sec3){
    while (path.length) {
      path.pop();
    }
    while (road_path.length) {
      road_path.pop();
    }
    while (road_path_sec.length) {
      road_path_sec.pop();
    }
    flag_tween1 = true
    flag_tween4 = false
    flag_sec3 = false
    flag_stop = false
    
    map = map_park2
    // map = [[1, 1, 1, 1, 2, 1, 1, 1, 1],
    //       [0, 0, 1, 0, 0, 1, 0, 0, 1],
    //       [0, 0, 1, 0, 0, 1, 0, 0, 1],
    //       [0, 1, 1, 0, 1, 1, 0, 4, 1]];
    
    console.log("flag_sec3")
    row = map.length;
    col = map[0].length;
    turn_path2.push(0)
  }
  
  
  if(move_count>=20){
    flag_record1 = true
  }

  if(((metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment) || //park
      (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment) || //park C1
      (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=44-adjustment && metacarObj.position.z<=44+adjustment) || //park C1
      (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=0-adjustment && metacarObj.position.z<=0+adjustment) || //library
      (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=-15-adjustment && metacarObj.position.z<=-15+adjustment)) //school
      && flag_record1){
    console.log('stttttttttttttttoooop')
    flag_forward = false
    flag_turn = true
    flag_record1 = false
    flag_record4 = true
    move_count = 0
    if(turn_path2.length < 1){
      console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn')
      flag_stop = true
      console.log("on park begin")
      flag_library = false
      flag_school = false
      flag_park = false
      flag_sec1 = true
      map =  [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];//park:(3, 3);
      console.log(map)
      row = map.length;
      col = map[0].length;
      console.log('row = ', row, " col = ", col)
    }
  }
  else if((metacarObj.position.x>=-70-adjustment && metacarObj.position.x<=-70+adjustment) && (metacarObj.position.z>=54-adjustment && metacarObj.position.z<=54+adjustment) && flag_sec2 != true){
    console.log('stttttttttttttttoooop')
    flag_forward = false
    flag_turn = true
    flag_record1 = false
    move_count = 0
    if(turn_path2.length < 1){
      console.log('n222222222222222')
      flag_stop = true
    }
  }
  

  if(turn_direction2 == 0 && flag_stop!=true){
    move_count = move_count + 1
    metacarObj.position.x = metacarObj.position.x + 0.5
  }
  else if(turn_direction2 == 1 && flag_stop!=true){
    move_count = move_count + 1
    metacarObj.position.z = metacarObj.position.z - 0.5
  }
  else if(turn_direction2 == 2 && flag_stop!=true){
    move_count = move_count + 1
    metacarObj.position.x = metacarObj.position.x - 0.5
  }
  else if(turn_direction2 == 3 && flag_stop!=true){
    move_count = move_count + 1
    metacarObj.position.z = metacarObj.position.z + 0.5
  }
}

function turn_around(){
  if(flag_record2){
    meta_rotationy = metacarObj.rotation.y
    flag_record2 = false
    console.log("rotate11111111111111")
  }
  else if(a == 3 && metacarObj.rotation.y<=meta_rotationy+3.14){
    metacarObj.rotation.y = metacarObj.rotation.y + 0.05
    console.log("turn left")
  }
  else if((a == 1 || a ==2) &&metacarObj.rotation.y>=meta_rotationy-3.14){
    metacarObj.rotation.y = metacarObj.rotation.y - 0.05
    console.log("turn right")
  }
  else{
    flag_record2 = true
    flag_turn_around = false
  }
}

function turn(){
  if(flag_record2){
    meta_rotationy = metacarObj.rotation.y
    flag_record2 = false
    console.log("rotate11111111111111")
  }
  else if(turn_direction == 1 && metacarObj.rotation.y<=meta_rotationy+3.14/2 && flag_turn){
    metacarObj.rotation.y = metacarObj.rotation.y + 0.05
    console.log("turn left")
  }
  else if(turn_direction == -1 && metacarObj.rotation.y>=meta_rotationy-3.14/2 && flag_turn){
    metacarObj.rotation.y = metacarObj.rotation.y - 0.05
    console.log("turn right")
  }
  else if(turn_direction == 0 && flag_turn){
    move_count = 0
    flag_record1 = false
    flag_forward = true
    flag_record3 = true
    // flag_turn = false
    console.log("keep going")
  }
  else{
    flag_record2 = true
    flag_record3 = true
    flag_forward = true
    flag_turn = false
    console.log("turn finish")
  }
}

function move() {

  spanWord = document.getElementById("spanWord").innerHTML;
  spanWord = parseFloat(spanWord)
  
  try {
    
    if(spanWord == 1 && flag_spanWord){
      flag_spanWord = false
      a = 1
    }
    else if(spanWord == 2 && flag_spanWord){
      flag_spanWord = false
      a = 2
      document.getElementById("place").src="/images/B2-1.jpg";
    }
    else if(spanWord == 3 && flag_spanWord){
      flag_spanWord = false
      a = 3
    }
    // console.log(first_search_target)
    

    
    if(first_search_target && a == 1){
      map[9][0] = 2
      map[5][4] = 4
      flag_tween1 = true
      first_search_target = false
    }
    else if(first_search_target && a == 2){
      map[9][0] = 2
      map[4][10] = 4
      flag_tween1 = true
      first_search_target = false
    }
    else if(first_search_target && a == 3){
      map[9][0] = 2
      map[6][10] = 4
      flag_tween1 = true
      first_search_target = false
    }

//========================move========================

    if(flag_tween1){
      flag_tween2 = true
      run()
      // setTimeout("run()", 5000)
      console.log("path1 = ", path)
      // console.log(map)
      if(path.length > 0){
        if(road_path.length < path.length){
          for(i=0; i<path.length; i++){
            road_path.push([path[i].colAt, path[i].rowAt])
          }
        }
        else{
          flag_tween1 = false
          flag_tween2 = true
        }
      }
    }
    else if(flag_tween2){
      if(road_path_sec.length < road_path.length-1){
        for(j=0; j<road_path.length; j++){
          road_path_sec.push([road_path[j+1][0]-road_path[j][0], road_path[j+1][1]-road_path[j][1]])
        }
      }
      else{
        flag_tween2 = false
        flag_tween3 = true
      }
    }
    else if(flag_tween3){
      for(k=0; k<road_path_sec.length-1; k++){
        if((JSON.stringify(turn_right[0][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_right[0][1]) === JSON.stringify(road_path_sec[k+1])) ||
          (JSON.stringify(turn_right[1][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_right[1][1]) === JSON.stringify(road_path_sec[k+1])) ||
          (JSON.stringify(turn_right[2][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_right[2][1]) === JSON.stringify(road_path_sec[k+1])) ||
          (JSON.stringify(turn_right[3][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_right[3][1]) === JSON.stringify(road_path_sec[k+1]))){
          console.log(k + " : " + "turn left")
          turn_path.push(1)
        }
        else if((JSON.stringify(turn_left[0][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[0][1]) === JSON.stringify(road_path_sec[k+1])) ||
                (JSON.stringify(turn_left[1][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[1][1]) === JSON.stringify(road_path_sec[k+1])) ||
                (JSON.stringify(turn_left[2][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[2][1]) === JSON.stringify(road_path_sec[k+1])) ||
                (JSON.stringify(turn_left[3][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[3][1]) === JSON.stringify(road_path_sec[k+1]))){
          console.log(k + " : " + "turn right")
          turn_path.push(-1)
        }
        else{
          console.log(k + " : " + "keep")
        }
      }

      if(flag_library || flag_school || flag_park){
        for(n=0; n<road_path_sec.length; n++){
        if(road_path_sec[n][0] != 0){
          if(road_path_sec[n][0] == 1){
            console.log(k + " : " + "+X")
            if(turn_path2[turn_path2.length-1] != 0){
              turn_path2.push(0)
            }
          }
          else if(road_path_sec[n][0] == -1){
            console.log(k + " : " + "-X")
            if(turn_path2[turn_path2.length-1] != 2){
              turn_path2.push(2)
            }
          }
          // console.log(k + " : " + "turn left")
          // turn_path2.push(1)
        }
        else if(road_path_sec[n][1] != 0){
          if(road_path_sec[n][1] == 1){
            console.log(k + " : " + "+Y")
            if(turn_path2[turn_path2.length-1] != 3){
              turn_path2.push(3)
            }
          }
          else if(road_path_sec[n][1] == -1){
            console.log(k + " : " + "-Y")
            if(turn_path2[turn_path2.length-1] != 1){
              turn_path2.push(1)
            }
          }
        }
      }
      }
      


      console.log(turn_path)
      flag_tween3 = false
      flag_tween4 = true
    }
    if(flag_tween4 && flag_turn_around!=true && (flag_library!=true && flag_school!=true && flag_park!=true)){
      if(flag_record3){
        turn_direction = turn_path.shift(turn_path[0])
        flag_record3 = false
      }
      else if(flag_forward){
        forward()
      }
      else if(flag_turn){
        turn()
      }
      
      else{
        console.log("no move")
      }
    }
    else if((flag_library || flag_school || flag_park)){
      if(flag_record4 && turn_path2.length>0){
        turn_direction2 = turn_path2.shift(turn_path2[0])
        flag_record4 = false
        console.log("shift_turn")
      }
      if(flag_forward_place){
        forward_place()
      }
      else if(flag_backward_place){
        backward_place()
      }
      // console.log("flag_forward_place")
      // console.log(a)
      // console.log("turn_path = ", turn_path)
      
    }
    else if(flag_turn_around){
      console.log("flag_turn_around")
      console.log(a)
      turn_around()
    }
    // console.log("turn_path = ", turn_path)

    // carBody.position.x = metacarObj.position.x
    // carBody.position.z = metacarObj.position.z
    // carBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)
    // carBody.rotation.y = metacarObj.rotation.y

    if(flag_record5){
      gripperABody.position.x = metacarObj.position.x
      gripperABody.position.z = metacarObj.position.z
      gripperABody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)
      gripperA2Body.position.x = metacarObj.position.x
      gripperA2Body.position.z = metacarObj.position.z
      gripperA2Body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)
      gripperA3Body.position.x = metacarObj.position.x
      gripperA3Body.position.z = metacarObj.position.z
      gripperA3Body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)
      gripperA4Body.position.x = metacarObj.position.x
      gripperA4Body.position.z = metacarObj.position.z
      gripperA4Body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)

      gripperBBody.position.x = metacarObj.position.x
      gripperBBody.position.z = metacarObj.position.z
      gripperBBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)
      gripperB2Body.position.x = metacarObj.position.x
      gripperB2Body.position.z = metacarObj.position.z
      gripperB2Body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)
      gripperB3Body.position.x = metacarObj.position.x
      gripperB3Body.position.z = metacarObj.position.z
      gripperB3Body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)
      gripperB4Body.position.x = metacarObj.position.x
      gripperB4Body.position.z = metacarObj.position.z
      gripperB4Body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)

      gripperTopBody.position.x = metacarObj.position.x
      gripperTopBody.position.z = metacarObj.position.z
      gripperTopBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)

      gripperObj.gripper.position.x = metacarObj.position.x
      gripperObj.gripper.position.z = metacarObj.position.z
      gripperObj.gripper.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), metacarObj.rotation.y)
    }
    

  } catch (error) {
    console.log(error)
  }
  
  
  
  
}

// 苦力怕擺頭
// function creeperHeadRotate() {
//   rotateHeadOffset += 0.04
//   if (startRotateHead) {
//     creeperObj.head.rotation.y = Math.sin(rotateHeadOffset)
//   }
// }

// // 苦力怕走動
// function creeperFeetWalk() {
//   walkOffset += 0.04
//   creeperObj.foot1.rotation.x = Math.sin(walkOffset) / 4 // 前腳左
//   creeperObj.foot2.rotation.x = -Math.sin(walkOffset) / 4 // 後腳左
//   creeperObj.foot3.rotation.x = -Math.sin(walkOffset) / 4 // 前腳右
//   creeperObj.foot4.rotation.x = Math.sin(walkOffset) / 4 // 後腳右
// }


function render(){
  cameraControl.update()
  statsUI.update()
  // creeperFeetWalk()
  move()
  // TWEEN.update()

  world.step(1/60)
  // if (sphere) {
  //   sphere.position.copy(sphereBody.position)
  //   sphere.quaternion.copy(sphereBody.quaternion)
  // }

  if (boxC1a) {
    boxC1a.position.copy(boxC1aBody.position)
    boxC1a.quaternion.copy(boxC1aBody.quaternion)
  }

  if (boxC1b) {
    boxC1b.position.copy(boxC1bBody.position)
    boxC1b.quaternion.copy(boxC1bBody.quaternion)
  }

  // if (car) {
  //   car.position.copy(carBody.position)
  //   car.quaternion.copy(carBody.quaternion)
  // }

  if (gripperA) {
    gripperA.position.copy(gripperABody.position)
    gripperA.quaternion.copy(gripperABody.quaternion)
  }

  if (gripperA2) {
    gripperA2.position.copy(gripperA2Body.position)
    gripperA2.quaternion.copy(gripperA2Body.quaternion)
  }

  if (gripperA3) {
    gripperA3.position.copy(gripperA3Body.position)
    gripperA3.quaternion.copy(gripperA3Body.quaternion)
  }

  if (gripperA4) {
    gripperA4.position.copy(gripperA4Body.position)
    gripperA4.quaternion.copy(gripperA4Body.quaternion)
  }

  if (gripperB) {
    gripperB.position.copy(gripperBBody.position)
    gripperB.quaternion.copy(gripperBBody.quaternion)
  }

  if (gripperB2) {
    gripperB2.position.copy(gripperB2Body.position)
    gripperB2.quaternion.copy(gripperB2Body.quaternion)
  }

  if (gripperB3) {
    gripperB3.position.copy(gripperB3Body.position)
    gripperB3.quaternion.copy(gripperB3Body.quaternion)
  }

  if (gripperB4) {
    gripperB4.position.copy(gripperB4Body.position)
    gripperB4.quaternion.copy(gripperB4Body.quaternion)
  }

  if (gripperTop) {
    gripperTop.position.copy(gripperTopBody.position)
    gripperTop.quaternion.copy(gripperTopBody.quaternion)
  }

  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth / this.window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

function press(){
  document.getElementById("spanWord").innerHTML = 3
}

init()
initCannonWorld()
render()