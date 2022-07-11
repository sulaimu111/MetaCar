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
let map_supermarket =[[0, 0, 0, 0],
                      [1, 1, 1, 1],
                      [0, 0, 0, 1],
                      [0, 0, 0, 1],
                      [1, 1, 1, 2],
                      [0, 0, 0, 1],
                      [0, 0, 0, 1],
                      [1, 1, 1, 1],
                      [0, 0, 0, 1]];

let map_restaurant = [[0, 1, 0, 0, 1, 0, 0, 1, 0],
                      [0, 1, 0, 0, 1, 0, 0, 1, 0],
                      [0, 1, 0, 0, 1, 0, 0, 1, 0],
                      [0, 1, 1, 1, 2, 1, 1, 1, 0]];

let map_park = [[0, 1, 1, 1, 2, 1, 1, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 1, 0]];

let map_park2 =[[0, 1, 1, 1, 4, 1, 1, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 2, 0, 0, 1, 0, 0, 1, 0]];

// let map_park2 =[[1, 1, 1, 1, 4, 1, 1, 1, 1],
//                 [0, 0, 1, 0, 1, 0, 0, 0, 1],
//                 [0, 0, 1, 0, 1, 0, 0, 0, 1],
//                 [0, 0, 1, 0, 1, 0, 0, 0, 2]];

let flag_library = false
let flag_school = false
let flag_park = false
let flag_place = true

let object_library = "A"
let object_school
let object_park = 1
let flag_sec3 = false, flag_sec4 = true
let direction_record = 0

// Cannon.js
let world
let groundBody
let sphereBody
let boxB1aBody,boxB1bBody, boxB2aBody,boxB2bBody 
let boxC1aBody,boxC1bBody, boxC2aBody,boxC2bBody 
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
let flag_gripper
let flag_item = true

// const timeStep = 1.0 / 60.0 // seconds

// const socket = io('http://140.125.32.138:3000')

// socket.on('connection')

// socket.on('message', (data) => {
//     document.querySelector('h1').innerHTML = data;
//     document.getElementById('spanWord').innerHTML = data
//     // if(data == 1){
//     //   document.getElementById('spanWord').innerHTML = 1
//     // }
//     // else if(data == 2){
//     //   document.getElementById('spanWord').innerHTML = 2
//     // }
//     // else if(data == 3){  
//     //   document.getElementById('spanWord').innerHTML = 3
//     // }
    
// })



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
  camera.position.set(200, 100, 200)
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
  init_background_object()
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
    // console.log('stttttttttttttttoooop')
    flag_forward = false
    flag_turn = true
    flag_record1 = false
    move_count = 0
    if(turn_direction == null){
      // console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn')
      flag_stop = true
    }
  }
  else if((metacarObj.position.x>=-70-adjustment && metacarObj.position.x<=-70+adjustment) && (metacarObj.position.z>=54-adjustment && metacarObj.position.z<=54+adjustment) && flag_sec2 != true){
    // console.log('stttttttttttttttoooop')
    flag_forward = false
    flag_turn = true
    flag_record1 = false
    move_count = 0
    if(turn_direction == null){
      // console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn')
      flag_stop = true
    }
  }
  else if(Math.floor(metacarObj.rotation.y*100)/100 == 0 && flag_stop!=true){
    metacarObj.position.x = metacarObj.position.x + 0.5
    move_count = move_count + 1
    // console.log('22222222222222222222')
  }
  else if((Math.floor(metacarObj.rotation.y*100)/100 == 3.14 || (metacarObj.rotation.y < -3.1 && metacarObj.rotation.y > -3.2)) && flag_stop!=true){
    metacarObj.position.x = metacarObj.position.x - 0.5
    move_count = move_count + 1
    // console.log('22222222222222222222')
  }
  else if(Math.floor(metacarObj.rotation.y*100)/100 == 3.14/2 && flag_stop!=true){
    metacarObj.position.z = metacarObj.position.z - 0.5
    move_count = move_count + 1
    // console.log('333333333333333333333')
  }
  else if((((Math.round(metacarObj.rotation.y * 100) / 100) > 4.7 && (Math.round(metacarObj.rotation.y * 100) / 100) < 4.75) || Math.floor(metacarObj.rotation.y*100)/100 == -3.14/2) && flag_stop!=true){
    metacarObj.position.z = metacarObj.position.z + 0.5
    move_count = move_count + 1
    // console.log('333333333333333333333')
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
    
    if((spanWord == 1 || spanWord == 11 || spanWord == 12 || spanWord == 13) && flag_place){
      flag_library = true
      flag_place = false
    }
    else if((spanWord == 2 || spanWord == 21 || spanWord == 22 || spanWord == 23) && flag_place){
      flag_school = true
      flag_place = false
    }
    else if((spanWord == 3 || spanWord == 31 || spanWord == 32 || spanWord == 33) && flag_place){
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
    // console.log('m = ', m)
    // console.log('l = ', l)
    if(flag_sec1 && flag_sec2 && (spanWord == 1 || spanWord == 11 || spanWord == 12 || spanWord == 13|| spanWord == 111)){
      // console.log("spanWord == 1")
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


      map =  [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];//park:(3, 3);

      
      // map[m][map[m].indexOf(2)] = 1
      // map[l][map[l].indexOf(4)] = 2
      // map[9][0] = 4
    }
    else if(flag_sec1 && flag_sec2 && (spanWord == 2 || spanWord == 21 || spanWord == 22 || spanWord == 23|| spanWord == 222)){
      // console.log("spanWord == 2")
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

      map =  [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];//park:(3, 3);
      
      
      // map[m][map[m].indexOf(2)] = 1
      // map[l][map[l].indexOf(4)] = 2
      // map[9][0] = 4
      
    }
    else if(flag_sec1 && flag_sec2 && (spanWord == 3 || spanWord == 31 || spanWord == 32 || spanWord == 33|| spanWord == 333)){
      // console.log("spanWord == 333")
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
    // console.log("map = ", map)
    
    // console.log('4444444444444444444444444444444444444')
    
    
  }
  // console.log("path = ", path)
  // console.log("metacarObj.rotation.y = ", Math.round(metacarObj.rotation.y * 100) / 100)
  // console.log("turn_direction = ", turn_direction)
  // console.log("flag_record1 = ", flag_record1)
  // console.log("move_count = ", move_count)
  // console.log("flag_record3 = ", flag_record3)
  // console.log("road_path_sec = ", road_path_sec)
  // console.log("turn_path = ", turn_path)
  // console.log("flag_tween1 = ", flag_tween1)
  // console.log("flag_tween4 = ", flag_tween4)
  // console.log("flag_library = ", flag_library)
  // console.log("flag_school = ", flag_school)
  // console.log("flag_park = ", flag_park)
  // console.log("metacarObj.position.x = ", metacarObj.position.x)
  // console.log("metacarObj.position.z = ", metacarObj.position.z)
  // console.log("metacarObj.rotation.y = ", Math.floor(metacarObj.rotation.y*100)/100)
  // console.log("first_search_target = ", first_search_target)
}

function forward_place(){
  // console.log("turn_direction2 = ", turn_direction2)
  // console.log("spanWord2 = ", spanWord)
  if(spanWord == 11 && flag_item){
    flag_sec3 = true
    flag_item = false
    map = map_supermarket
    map[7][0] = 4
  }
  else if(spanWord == 12 && flag_item){
    flag_sec3 = true
    flag_item = false
    map = map_supermarket
    map[4][0] = 4
  }
  else if(spanWord == 13 && flag_item){
    flag_sec3 = true
    flag_item = false
    map = map_supermarket
    map[1][0] = 4
  }

  if(spanWord == 21 && flag_item){
    flag_sec3 = true
    flag_item = false
    map = map_restaurant
    map[0][1] = 4
  }
  else if(spanWord == 22 && flag_item){
    flag_sec3 = true
    flag_item = false
    map = map_restaurant
    map[0][4] = 4
  }
  else if(spanWord == 23 && flag_item){
    flag_sec3 = true
    flag_item = false
    map = map_restaurant
    map[0][7] = 4
  }
  
  if(spanWord == 31 && flag_item){
    flag_sec3 = true
    flag_item = false
    map = map_park
    map[3][7] = 4
  }
  else if(spanWord == 32 && flag_item){
    flag_sec3 = true
    flag_item = false
    map = map_park
    map[3][4] = 4
  }
  else if(spanWord == 33 && flag_item){
    flag_sec3 = true
    flag_item = false
    map = map_park
    map[3][1] = 4
  }
  // console.log("flag_sec3 = ", flag_sec3)
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
    
    
    // map_park = [[0, 1, 1, 1, 2, 1, 1, 1, 0],
    //             [0, 1, 0, 0, 1, 0, 0, 1, 0],
    //             [0, 1, 0, 0, 1, 0, 0, 1, 0],
    //             [0, 1, 0, 0, 1, 0, 0, 1, 0]];
    
    // console.log("flag_sec3 = ", flag_sec3)
    row = map.length;
    col = map[0].length;
    flag_gripper = true
    

  }
  
  if(flag_gripper){
    if(move_count>=20){
      flag_record1 = true
    }
  
    if(((metacarObj.position.x<=-30+adjustment && metacarObj.position.x>=-30-adjustment) && (metacarObj.position.z>=0-adjustment && metacarObj.position.z<=0+adjustment) || //supermarket
        (metacarObj.position.x<=-30+adjustment && metacarObj.position.x>=-30-adjustment) && (metacarObj.position.z>=40-adjustment && metacarObj.position.z<=40+adjustment) || //supermarket A1
        (metacarObj.position.x<=-51.5+adjustment && metacarObj.position.x>=-51.5-adjustment) && (metacarObj.position.z>=40-adjustment && metacarObj.position.z<=40+adjustment) || //supermarket A1
        (metacarObj.position.x<=-51.5+adjustment && metacarObj.position.x>=-51.5-adjustment) && (metacarObj.position.z>=0-adjustment && metacarObj.position.z<=0+adjustment) || //supermarket A2
        (metacarObj.position.x<=-30+adjustment && metacarObj.position.x>=-30-adjustment) && (metacarObj.position.z>=-40-adjustment && metacarObj.position.z<=-40+adjustment) || //supermarket A3
        (metacarObj.position.x<=-51.5+adjustment && metacarObj.position.x>=-51.5-adjustment) && (metacarObj.position.z>=-40-adjustment && metacarObj.position.z<=-40+adjustment) || //supermarket A3
        (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=-15-adjustment && metacarObj.position.z<=-15+adjustment) || //restaurant
        (metacarObj.position.x<=0+adjustment && metacarObj.position.x>=0-adjustment) && (metacarObj.position.z>=-15-adjustment && metacarObj.position.z<=-15+adjustment) || //restaurant B1
        (metacarObj.position.x<=0+adjustment && metacarObj.position.x>=0-adjustment) && (metacarObj.position.z>=-44-adjustment && metacarObj.position.z<=-44+adjustment) || //restaurant B1
        (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=-44-adjustment && metacarObj.position.z<=-44+adjustment) || //restaurant B2
        (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=-15-adjustment && metacarObj.position.z<=-15+adjustment) || //restaurant B3
        (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=-44-adjustment && metacarObj.position.z<=-44+adjustment) || //restaurant B3
        (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment) || //park
        (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment) || //park C1
        (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=44-adjustment && metacarObj.position.z<=44+adjustment) || //park C1
        (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=44-adjustment && metacarObj.position.z<=44+adjustment) || //park C2
        (metacarObj.position.x<=0+adjustment && metacarObj.position.x>=0-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment) || //park C3
        (metacarObj.position.x<=0+adjustment && metacarObj.position.x>=0-adjustment) && (metacarObj.position.z>=44-adjustment && metacarObj.position.z<=44+adjustment)) //park C3
        && flag_record1){
      // console.log('stttttttttttttttoooop')
      flag_forward = false
      flag_turn = true
      flag_record1 = false
      flag_record4 = true
      move_count = 0
      if(turn_path2.length < 1){
        // console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn')
        flag_stop = true
      }
    }
    else if((metacarObj.position.x>=-70-adjustment && metacarObj.position.x<=-70+adjustment) && (metacarObj.position.z>=54-adjustment && metacarObj.position.z<=54+adjustment) && flag_sec2 != true){
      // console.log('stttttttttttttttoooop')
      flag_forward = false
      flag_turn = true
      flag_record1 = false
      move_count = 0
      if(turn_path2.length < 1){
        // console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn')
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
  

    if(spanWord == 11 || spanWord == 12 || spanWord == 13){
      if(flag_record5 && flag_stop){
        // gripperABody.position.z = gripperABody.position.z - 2
        // gripperBBody.position.z = gripperBBody.position.z - 2
        // console.log("flag_record5 = ", flag_record5)
        gripper_pos_x = gripperABody.position.x
        gripper_pos_z = gripperABody.position.z
        gripper_pos_y = gripperABody.position.y
        metacar_pos_x = metacarObj.position.x
        metacar_pos_z = metacarObj.position.z
    
        // metacarObj_pos_z = metacarObj.position.z
        flag_record5 = false
        flag_step1 = true
        // flag_stop = false
      }
      else if(gripperABody.position.z >= gripper_pos_z-4 && gripperBBody.position.z <= gripper_pos_z+4 && flag_step1){
        // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        gripperABody.position.z = gripperABody.position.z - 0.05
        gripperBBody.position.z = gripperBBody.position.z + 0.05
        gripperObj.gripperL.position.z = gripperObj.gripperL.position.z - 0.05
        gripperObj.gripperR.position.z = gripperObj.gripperR.position.z + 0.05
      }
      else if(gripperABody.position.x >= gripper_pos_x-6 && gripperBBody.position.x >= gripper_pos_x-6 && flag_step1){
        // console.log("ffffffffffffffffffffffffffff")
        gripperABody.position.x = gripperABody.position.x - 0.05
        gripperBBody.position.x = gripperBBody.position.x - 0.05
        gripperTopBody.position.x = gripperTopBody.position.x - 0.05
        
        if(gripperABody.position.x >= gripper_pos_x-5 && gripperBBody.position.x >= gripper_pos_x-5){
          gripperObj.clip.position.x = gripperObj.clip.position.x + 0.05
        }
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
    
      if(gripperABody.position.z <= gripper_pos_z-2.5 && gripperBBody.position.z >= gripper_pos_z+2.5 && flag_step1 != true && flag_step2){
        // console.log("gggggggggggggggggggggggggggg")
        gripperABody.position.z = gripperABody.position.z + 0.05
        gripperBBody.position.z = gripperBBody.position.z - 0.05
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
      else if(gripperABody.position.x <= gripper_pos_x-3 && gripperBBody.position.x <= gripper_pos_x-3 && flag_step1 != true && flag_step2){
        // console.log("ffffffffffffffffffffffffffff")
        gripperABody.position.x = gripperABody.position.x + 0.05
        gripperBBody.position.x = gripperBBody.position.x + 0.05
        gripperTopBody.position.x = gripperTopBody.position.x + 0.05
        gripperObj.clip.position.x = gripperObj.clip.position.x - 0.05
      }
      else if(metacarObj.position.z >= metacar_pos_z-14 && flag_step1 != true && flag_step2){
        metacarObj.position.z = metacarObj.position.z - 0.05
        gripperABody.position.z = gripperABody.position.z - 0.05
        gripperBBody.position.z = gripperBBody.position.z - 0.05
        gripperTopBody.position.z = metacarObj.position.z
        gripperObj.gripper.position.z = metacarObj.position.z
        // console.log("step1_finish0")
      }
      else if(flag_step1 != true && flag_step2){
        flag_step2 = false
        flag_step3 = true
        // console.log("step1_finish")
      }
    
      if(gripperABody.position.x >= gripper_pos_x-6 && gripperBBody.position.x >= gripper_pos_x-6 && flag_step1 != true && flag_step2 != true && flag_step3){
        gripperABody.position.x = gripperABody.position.x - 0.05
        gripperBBody.position.x = gripperBBody.position.x - 0.05
        gripperTopBody.position.x = gripperTopBody.position.x - 0.05
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
      else if(((boxA1aBody.position.x>=-60-adjustment && boxA1aBody.position.x<=-60+adjustment) && (boxA1aBody.position.y>=0.5-adjustment && boxA1aBody.position.y<=0.5+adjustment) && (boxA1aBody.position.z>=25-adjustment && boxA1aBody.position.z<=25+adjustment)) ||
              ((boxA2aBody.position.x>=-60-adjustment && boxA2aBody.position.x<=-60+adjustment) && (boxA2aBody.position.y>=0.6-adjustment && boxA2aBody.position.y<=0.6+adjustment) && (boxA2aBody.position.z>=-14.5-adjustment && boxA2aBody.position.z<=-14.5+adjustment)) ||
              ((boxA3aBody.position.x>=-60-adjustment && boxA3aBody.position.x<=-60+adjustment) && (boxA3aBody.position.y>=0.5-adjustment && boxA3aBody.position.y<=0.5+adjustment) && (boxA3aBody.position.z>=-54.5-adjustment && boxA3aBody.position.z<=-54.5+adjustment))){
        // console.log("finishhhhhhhhhhhhhhh")
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
        flag_gripper = false
      }
    }
    else if(spanWord == 21 || spanWord == 22 || spanWord == 23){
      if(flag_record5 && flag_stop){
        gripperABody.position.z = gripperABody.position.z - 2
        gripperBBody.position.z = gripperBBody.position.z - 2
        // console.log("flag_record5 = ", flag_record5)
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
        // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        gripperABody.position.x = gripperABody.position.x - 0.05
        gripperBBody.position.x = gripperBBody.position.x + 0.05
        gripperObj.gripperL.position.z = gripperObj.gripperL.position.z - 0.05
        gripperObj.gripperR.position.z = gripperObj.gripperR.position.z + 0.05
      }
      else if(gripperABody.position.z >= gripper_pos_z-6 && gripperBBody.position.z >= gripper_pos_z-6 && flag_step1){
        // console.log("ffffffffffffffffffffffffffff")
        gripperABody.position.z = gripperABody.position.z - 0.05
        gripperBBody.position.z = gripperBBody.position.z - 0.05
        gripperTopBody.position.z = gripperTopBody.position.z - 0.05
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
      else if(gripperABody.position.z <= gripper_pos_z-3 && gripperBBody.position.z <= gripper_pos_z-3 && flag_step1 != true && flag_step2){
        // console.log("ffffffffffffffffffffffffffff")
        gripperABody.position.z = gripperABody.position.z + 0.05
        gripperBBody.position.z = gripperBBody.position.z + 0.05
        gripperTopBody.position.z = gripperTopBody.position.z + 0.05
        gripperObj.clip.position.x = gripperObj.clip.position.x - 0.05
      }
      else if(metacarObj.position.x <= metacar_pos_x+10 && flag_step1 != true && flag_step2){
        metacarObj.position.x = metacarObj.position.x + 0.05
        gripperABody.position.x = gripperABody.position.x + 0.05
        gripperBBody.position.x = gripperBBody.position.x + 0.05
        gripperTopBody.position.x = metacarObj.position.x
        gripperObj.gripper.position.x = metacarObj.position.x
        // console.log("step1_finish0")
      }
      else if(flag_step1 != true && flag_step2){
        flag_step2 = false
        flag_step3 = true
        // console.log("step1_finish")
      }
    
      if(gripperABody.position.z >= gripper_pos_z-6 && gripperBBody.position.z >= gripper_pos_z-6 && flag_step1 != true && flag_step2 != true && flag_step3){
        gripperABody.position.z = gripperABody.position.z - 0.05
        gripperBBody.position.z = gripperBBody.position.z - 0.05
        gripperTopBody.position.z = gripperTopBody.position.z - 0.05
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
      else if(((boxB1aBody.position.x>=10-adjustment && boxB1aBody.position.x<=10+adjustment) && (boxB1aBody.position.y>=0.5-adjustment && boxB1aBody.position.y<=0.5+adjustment) && (boxB1aBody.position.z>=-54-adjustment && boxB1aBody.position.z<=-54+adjustment)) ||
              ((boxB2aBody.position.x>=39.5-adjustment && boxB2aBody.position.x<=39.5+adjustment) && (boxB2aBody.position.y>=0.6-adjustment && boxB2aBody.position.y<=0.6+adjustment) && (boxB2aBody.position.z>=-54-adjustment && boxB2aBody.position.z<=-54+adjustment)) ||
              ((boxB3aBody.position.x>=70-adjustment && boxB3aBody.position.x<=70+adjustment) && (boxB3aBody.position.y>=0.5-adjustment && boxB3aBody.position.y<=0.5+adjustment) && (boxB3aBody.position.z>=-54-adjustment && boxB3aBody.position.z<=-54+adjustment))){
        // console.log("finishhhhhhhhhhhhhhh")
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
        flag_gripper = false
      }
    }
    else if(spanWord == 31 || spanWord == 32 || spanWord == 33){
      if(flag_record5 && flag_stop){
        gripperABody.position.z = gripperABody.position.z + 2
        gripperBBody.position.z = gripperBBody.position.z + 2
        // console.log("flag_record5 = ", flag_record5)
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
        // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee")
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
      else if(((boxC1aBody.position.x>=50-adjustment && boxC1aBody.position.x<=50+adjustment) && (boxC1aBody.position.y>=0.5-adjustment && boxC1aBody.position.y<=0.5+adjustment) && (boxC1aBody.position.z>=54-adjustment && boxC1aBody.position.z<=54+adjustment)) ||
              ((boxC2aBody.position.x>=19.5-adjustment && boxC2aBody.position.x<=19.5+adjustment) && (boxC2aBody.position.y>=0.5-adjustment && boxC2aBody.position.y<=0.5+adjustment) && (boxC2aBody.position.z>=54-adjustment && boxC2aBody.position.z<=54+adjustment)) ||
              ((boxC3aBody.position.x>=-10-adjustment && boxC3aBody.position.x<=-10+adjustment) && (boxC3aBody.position.y>=0.5-adjustment && boxC3aBody.position.y<=0.5+adjustment) && (boxC3aBody.position.z>=54-adjustment && boxC3aBody.position.z<=54+adjustment))){
        // console.log("finishhhhhhhhhhhhhhh")
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
        flag_gripper = false
      }
    }
  
    
  }

  // console.log("metacarObj.position.x = ", metacarObj.position.x)
  // console.log("metacarObj.position.z = ", metacarObj.position.z)
  // console.log("flag_backward_place = ", flag_backward_place)
  // console.log("boxB2aBody.position.x = ", boxB2aBody.position.x)
  // console.log("boxB2aBody.position.y = ", boxB2aBody.position.y)
  // console.log("boxB2aBody.position.z = ", boxB2aBody.position.z)

  if(spanWord == 11 || spanWord == 12 || spanWord == 13){
    gripperA2Body.position.x = gripperABody.position.x-5.5
    gripperA2Body.position.y = gripperABody.position.y
    gripperA2Body.position.z = gripperABody.position.z
    gripperA3Body.position.x = gripperABody.position.x
    gripperA3Body.position.y = gripperABody.position.y
    gripperA3Body.position.z = gripperABody.position.z-0.5
    gripperA4Body.position.x = gripperABody.position.x-3
    gripperA4Body.position.y = gripperABody.position.y
    gripperA4Body.position.z = gripperABody.position.z
    gripperB2Body.position.x = gripperBBody.position.x-5.5
    gripperB2Body.position.y = gripperBBody.position.y
    gripperB2Body.position.z = gripperBBody.position.z
    gripperB3Body.position.x = gripperBBody.position.x
    gripperB3Body.position.y = gripperBBody.position.y
    gripperB3Body.position.z = gripperBBody.position.z-0.5
    gripperB4Body.position.x = gripperBBody.position.x-3
    gripperB4Body.position.y = gripperBBody.position.y
    gripperB4Body.position.z = gripperBBody.position.z
  }
  else if(spanWord == 21 || spanWord == 22 || spanWord == 23){
    gripperA2Body.position.x = gripperABody.position.x
    gripperA2Body.position.y = gripperABody.position.y
    gripperA2Body.position.z = gripperABody.position.z+5.5
    gripperA3Body.position.x = gripperABody.position.x
    gripperA3Body.position.y = gripperABody.position.y
    gripperA3Body.position.z = gripperABody.position.z+0.5
    gripperA4Body.position.x = gripperABody.position.x-0.5
    gripperA4Body.position.y = gripperABody.position.y
    gripperA4Body.position.z = gripperABody.position.z-2.5
    gripperB2Body.position.x = gripperBBody.position.x
    gripperB2Body.position.y = gripperBBody.position.y
    gripperB2Body.position.z = gripperBBody.position.z-5.5
    gripperB3Body.position.x = gripperBBody.position.x
    gripperB3Body.position.y = gripperBBody.position.y
    gripperB3Body.position.z = gripperBBody.position.z+0.5
    gripperB4Body.position.x = gripperBBody.position.x+0.5
    gripperB4Body.position.y = gripperBBody.position.y
    gripperB4Body.position.z = gripperBBody.position.z-2.5
  }
  else if(spanWord == 31 || spanWord == 32 || spanWord == 33){
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
    
    for(n=0; n<map.length; n++){
      if(map[n].indexOf(4) != -1){
        break
      }
    }
    // map[][] = 2
    // if(spanWord==11 || spanWord==12 || spanWord==13){
    if(spanWord==111){
      map[4][3] = 4
      turn_path2.push(3)
    }
    // else if(spanWord==21 || spanWord==22 || spanWord==23){
    else if(spanWord==222){
      map[3][4] = 4
      turn_path2.push(2)
    }
    // else if(spanWord==31 || spanWord==32 || spanWord==33){
    else if(spanWord==333){
      map[0][4] = 4
      turn_path2.push(0)
    }
    map[n][map[n].indexOf(4)] = 2
    // map = map_park2
    // map =[[1, 1, 1, 1, 2, 1, 1, 1, 1],
    //       [0, 0, 1, 0, 0, 1, 0, 0, 1],
    //       [0, 0, 1, 0, 0, 1, 0, 0, 1],
    //       [0, 1, 1, 0, 1, 1, 0, 4, 1]];
    
    // console.log("flag_sec3")
    row = map.length;
    col = map[0].length;
    
  }
  // console.log("n = ", n)
  // console.log(map)
  
  if(move_count>=20){
    flag_record1 = true
  }

  if(((metacarObj.position.x<=-30+adjustment && metacarObj.position.x>=-30-adjustment) && (metacarObj.position.z>=0-adjustment && metacarObj.position.z<=0+adjustment) || //supermarket
        (metacarObj.position.x<=-30+adjustment && metacarObj.position.x>=-30-adjustment) && (metacarObj.position.z>=40-adjustment && metacarObj.position.z<=40+adjustment) || //supermarket A1
        (metacarObj.position.x<=-51.5+adjustment && metacarObj.position.x>=-51.5-adjustment) && (metacarObj.position.z>=40-adjustment && metacarObj.position.z<=40+adjustment) || //supermarket A1
        (metacarObj.position.x<=-51.5+adjustment && metacarObj.position.x>=-51.5-adjustment) && (metacarObj.position.z>=0-adjustment && metacarObj.position.z<=0+adjustment) || //supermarket A2
        (metacarObj.position.x<=-30+adjustment && metacarObj.position.x>=-30-adjustment) && (metacarObj.position.z>=-40-adjustment && metacarObj.position.z<=-40+adjustment) || //supermarket A3
        (metacarObj.position.x<=-51.5+adjustment && metacarObj.position.x>=-51.5-adjustment) && (metacarObj.position.z>=-40-adjustment && metacarObj.position.z<=-40+adjustment) || //supermarket A3
        (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=-15-adjustment && metacarObj.position.z<=-15+adjustment) || //restaurant
        (metacarObj.position.x<=0+adjustment && metacarObj.position.x>=0-adjustment) && (metacarObj.position.z>=-15-adjustment && metacarObj.position.z<=-15+adjustment) || //restaurant B1
        (metacarObj.position.x<=0+adjustment && metacarObj.position.x>=0-adjustment) && (metacarObj.position.z>=-44-adjustment && metacarObj.position.z<=-44+adjustment) || //restaurant B1
        (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=-44-adjustment && metacarObj.position.z<=-44+adjustment) || //restaurant B2
        (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=-15-adjustment && metacarObj.position.z<=-15+adjustment) || //restaurant B3
        (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=-44-adjustment && metacarObj.position.z<=-44+adjustment) || //restaurant B3
        (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment) || //park
        (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment) || //park C1
        (metacarObj.position.x<=60+adjustment && metacarObj.position.x>=60-adjustment) && (metacarObj.position.z>=44-adjustment && metacarObj.position.z<=44+adjustment) || //park C1
        (metacarObj.position.x<=30+adjustment && metacarObj.position.x>=30-adjustment) && (metacarObj.position.z>=44-adjustment && metacarObj.position.z<=44+adjustment) || //park C2
        (metacarObj.position.x<=0+adjustment && metacarObj.position.x>=0-adjustment) && (metacarObj.position.z>=15-adjustment && metacarObj.position.z<=15+adjustment) || //park C3
        (metacarObj.position.x<=0+adjustment && metacarObj.position.x>=0-adjustment) && (metacarObj.position.z>=44-adjustment && metacarObj.position.z<=44+adjustment)) //park C3
        && flag_record1){
    // console.log('stttttttttttttttoooop')
    flag_forward = false
    flag_turn = true
    flag_record1 = false
    flag_record4 = true
    move_count = 0
    if(turn_path2.length < 1){
      // console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn')
      flag_stop = true
      // console.log("on park begin")
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
      // console.log('row = ', row, " col = ", col)
    }
  }
  else if((metacarObj.position.x>=-70-adjustment && metacarObj.position.x<=-70+adjustment) && (metacarObj.position.z>=54-adjustment && metacarObj.position.z<=54+adjustment) && flag_sec2 != true){
    // console.log('stttttttttttttttoooop')
    flag_forward = false
    flag_turn = true
    flag_record1 = false
    move_count = 0
    if(turn_path2.length < 1){
      // console.log('n222222222222222')
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
    // console.log("rotate11111111111111")
  }
  else if(a == 3 && metacarObj.rotation.y<=meta_rotationy+3.14){
    metacarObj.rotation.y = metacarObj.rotation.y + 0.05
    // console.log("turn left")
  }
  else if((a == 1 || a ==2) &&metacarObj.rotation.y>=meta_rotationy-3.14){
    metacarObj.rotation.y = metacarObj.rotation.y - 0.05
    // console.log("turn right")
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
    // console.log("rotate11111111111111")
  }
  else if(turn_direction == 1 && metacarObj.rotation.y<=meta_rotationy+3.14/2 && flag_turn){
    metacarObj.rotation.y = metacarObj.rotation.y + 0.05
    // console.log("turn left")
  }
  else if(turn_direction == -1 && metacarObj.rotation.y>=meta_rotationy-3.14/2 && flag_turn){
    metacarObj.rotation.y = metacarObj.rotation.y - 0.05
    // console.log("turn right")
  }
  else if(turn_direction == 0 && flag_turn){
    move_count = 0
    flag_record1 = false
    flag_forward = true
    flag_record3 = true
    // flag_turn = false
    // console.log("keep going")
  }
  else{
    flag_record2 = true
    flag_record3 = true
    flag_forward = true
    flag_turn = false
    // console.log("turn finish")
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
      // document.getElementById("place").src="/images/B2-1.jpg";
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
      // console.log("path1 = ", path)
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
          // console.log(k + " : " + "turn left")
          turn_path.push(1)
        }
        else if((JSON.stringify(turn_left[0][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[0][1]) === JSON.stringify(road_path_sec[k+1])) ||
                (JSON.stringify(turn_left[1][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[1][1]) === JSON.stringify(road_path_sec[k+1])) ||
                (JSON.stringify(turn_left[2][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[2][1]) === JSON.stringify(road_path_sec[k+1])) ||
                (JSON.stringify(turn_left[3][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[3][1]) === JSON.stringify(road_path_sec[k+1]))){
          // console.log(k + " : " + "turn right")
          turn_path.push(-1)
        }
        else{
          // console.log(k + " : " + "keep")
        }
      }

      if(flag_library || flag_school || flag_park){
        for(n=0; n<road_path_sec.length; n++){
        if(road_path_sec[n][0] != 0){
          if(road_path_sec[n][0] == 1){
            // console.log(k + " : " + "+X")
            if(turn_path2[turn_path2.length-1] != 0){
              turn_path2.push(0)
            }
          }
          else if(road_path_sec[n][0] == -1){
            // console.log(k + " : " + "-X")
            if(turn_path2[turn_path2.length-1] != 2){
              turn_path2.push(2)
            }
          }
          // console.log(k + " : " + "turn left")
          // turn_path2.push(1)
        }
        else if(road_path_sec[n][1] != 0){
          if(road_path_sec[n][1] == 1){
            // console.log(k + " : " + "+Y")
            if(turn_path2[turn_path2.length-1] != 3){
              turn_path2.push(3)
            }
          }
          else if(road_path_sec[n][1] == -1){
            // console.log(k + " : " + "-Y")
            if(turn_path2[turn_path2.length-1] != 1){
              turn_path2.push(1)
            }
          }
        }
      }
      }
      


      // console.log(turn_path)
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
        // console.log("no move")
      }
    }
    else if((flag_library || flag_school || flag_park)){
      if(flag_record4 && turn_path2.length>0){
        turn_direction2 = turn_path2.shift(turn_path2[0])
        flag_record4 = false
        // console.log("shift_turn")
      }
      if(flag_forward_place){
        forward_place()
      }
      else if(flag_backward_place && (spanWord == 111 || spanWord == 222 || spanWord == 333)){
        backward_place()
      }
      // console.log("flag_forward_place")
      // console.log(a)
      // console.log("turn_path = ", turn_path)
      
    }
    else if(flag_turn_around){
      // console.log("flag_turn_around")
      // console.log(a)
      turn_around()
    }
    // console.log("spanWord = ", spanWord)

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



function render(){
  cameraControl.update()
  statsUI.update()
  move()
  story_image()

  world.step(1/60)


  //==================box A=================

  if (boxA1a) {
    boxA1a.position.copy(boxA1aBody.position)
    boxA1a.position.y = boxA1aBody.position.y - 2.5
    boxA1a.quaternion.copy(boxA1aBody.quaternion)
  }

  if (boxA1b) {
    boxA1b.position.copy(boxA1bBody.position)
    boxA1b.quaternion.copy(boxA1bBody.quaternion)
  }

  if (boxA2a) {
    boxA2a.position.copy(boxA2aBody.position)
    boxA2a.position.y = boxA2aBody.position.y - 2.5
    boxA2a.quaternion.copy(boxA2aBody.quaternion)
  }

  if (boxA2b) {
    boxA2b.position.copy(boxA2bBody.position)
    boxA2b.quaternion.copy(boxA2bBody.quaternion)
  }

  if (boxA3a) {
    boxA3a.position.copy(boxA3aBody.position)
    boxA3a.position.y = boxA3aBody.position.y - 2.5
    boxA3a.quaternion.copy(boxA3aBody.quaternion)
  }

  if (boxA3b) {
    boxA3b.position.copy(boxA3bBody.position)
    boxA3b.quaternion.copy(boxA3bBody.quaternion)
  }

  //==================box B=================

  if (boxB1a) {
    boxB1a.position.copy(boxB1aBody.position)
    boxB1a.position.y = boxB1aBody.position.y - 2.5
    boxB1a.quaternion.copy(boxB1aBody.quaternion)
  }

  if (boxB1b) {
    boxB1b.position.copy(boxB1bBody.position)
    boxB1b.quaternion.copy(boxB1bBody.quaternion)
  }

  if (boxB2a) {
    boxB2a.position.copy(boxB2aBody.position)
    boxB2a.position.y = boxB2aBody.position.y - 2.5
    boxB2a.quaternion.copy(boxB2aBody.quaternion)
  }

  if (boxB2b) {
    boxB2b.position.copy(boxB2bBody.position)
    boxB2b.quaternion.copy(boxB2bBody.quaternion)
  }

  if (boxB3a) {
    boxB3a.position.copy(boxB3aBody.position)
    boxB3a.position.y = boxB3aBody.position.y - 2.5
    boxB3a.quaternion.copy(boxB3aBody.quaternion)
  }

  if (boxB3b) {
    boxB3b.position.copy(boxB3bBody.position)
    boxB3b.quaternion.copy(boxB3bBody.quaternion)
  }

  //==================box C=================

  if (boxC1a) {
    boxC1a.position.copy(boxC1aBody.position)
    boxC1a.position.y = boxC1aBody.position.y - 2.5
    boxC1a.quaternion.copy(boxC1aBody.quaternion)
  }

  if (boxC1b) {
    boxC1b.position.copy(boxC1bBody.position)
    boxC1b.quaternion.copy(boxC1bBody.quaternion)
  }

  if (boxC2a) {
    boxC2a.position.copy(boxC2aBody.position)
    boxC2a.position.y = boxC2aBody.position.y - 2.5
    boxC2a.quaternion.copy(boxC2aBody.quaternion)
  }

  if (boxC2b) {
    boxC2b.position.copy(boxC2bBody.position)
    boxC2b.quaternion.copy(boxC2bBody.quaternion)
  }

  if (boxC3a) {
    boxC3a.position.copy(boxC3aBody.position)
    boxC3a.position.y = boxC3aBody.position.y - 2.5
    boxC3a.quaternion.copy(boxC3aBody.quaternion)
  }

  if (boxC3b) {
    boxC3b.position.copy(boxC3bBody.position)
    boxC3b.quaternion.copy(boxC3bBody.quaternion)
  }

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
  document.getElementById("spanWord").innerHTML = 1
}

function press2(){
  document.getElementById("spanWord").innerHTML = 11
}

function press3(){
  document.getElementById("spanWord").innerHTML = 9111
}


init()
initCannonWorld()
render()