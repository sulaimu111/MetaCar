// import { GLTFLoader } from '/javascripts/GLTFLoader.js';
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let scene, renderer, camera
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
let road_path = [];
let road_path_sec = [];
let turn_path = [];
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
let turn_direction, meta_rotationy, flag_forward=true
let move_count = 0
let flag_stop = false
let l, m
let first_search_target = true
let search_target = true
let sec_search_target = false
let flag_sec1 = false
let flag_sec2 = true
let adjustment = 0.1
let flag_turn_around = false

let map_library = [[4, 0, 0],
                  [0, 0, 0],
                  [0, 0, 0],
                  [0, 0, 2],
                  [0, 0, 0]];//park:(3, 3);

const socket = io('http://ad27-59-125-78-142.ngrok.io')

socket.on('connection')

socket.on('message2', (data) => {
    document.querySelector('h1').innerHTML = data;
    // if(data == 1){
    //   document.getElementById('spanWord').innerHTML = 1
    // }
    // else if(data == "hahaha"){
    //   document.getElementById('spanWord').innerHTML = "hahaha"
    // }
    // else if(data == 3){  
    //   document.getElementById('spanWord').innerHTML = 3
    // }
    
})

function initObject() {
  const gltfLoader = new THREE.GLTFLoader()
  // const gltfLoader = new THREE.GLTFLoader().setPath('asset/Porsche 911/');

  gltfLoader.load('assets/robomaster01.glb', function ( gltf ) {

    metacarObj = gltf.scene
    metacarObj.position.x = -35
    metacarObj.position.y = -4.1
    metacarObj.position.z = 22.5
    metacarObj.scale.multiplyScalar(0.6)
    // gltf.scene.position.set(10,10,20)
    scene.add( metacarObj );
    

  }, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
  }, function ( error ) {

    console.error( "An error happened : " + error );

  } );
}
// initObject()

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
  camera.position.set(100, 100, 100)
  camera.lookAt(scene.position)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.setClearColor(0xeeeeee, 1.0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = 2

  cameraControl = new THREE.OrbitControls(camera, renderer.domElement)
  cameraControl.enableDamping = true
  cameraControl.dampingFactor = 0.05

  let axes = new THREE.AxesHelper(20)
  scene.add(axes)

  statsUI = initStats()

  const planeGeometry = new THREE.PlaneGeometry(80, 80)
  const TextureLoader = new THREE.TextureLoader()
  const planetexture = TextureLoader.load('images/roadMap.png')
  // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
  const planeMaterial = new THREE.MeshLambertMaterial({map:planetexture})
  let plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(0, -7, 0)
  plane.receiveShadow = true
  scene.add(plane)

  // createCreeper()
  initObject()
  // createMetacar()

  let ambientLight = new THREE.AmbientLight(0x404040)
  scene.add(ambientLight)

  let spotLight = new THREE.SpotLight(0xf0f0f0)
  spotLight.position.set(-10, 30, 20)
  spotLight.angle = Math.PI/4;
  scene.add(spotLight)

  pointLight = new THREE.PointLight(0xccffcc, 1, 150)
  pointLight.castShadow = true
  pointLight.position.set(-30, 30, 30)
  scene.add(pointLight)

  document.body.appendChild(renderer.domElement)
}


function forward(){
  if(metacarObj.rotation.y<=0.01 && metacarObj.rotation.y>=-0.01){
    metacarObj.rotation.y = 0
  }
  else if(metacarObj.rotation.y<=1.58 && metacarObj.rotation.y>=1.56){
    metacarObj.rotation.y = 1.57
  }
  else if(metacarObj.rotation.y>=-1.58 && metacarObj.rotation.y<=-1.56){
    metacarObj.rotation.y = -1.57
  }


  if(move_count>=40){
    flag_record1 = true
  }
  // metacarObj.position.x = -35
  // metacarObj.position.y = -4.1
  // metacarObj.position.z = 22.5
  if(((metacarObj.position.x<=-8.2 && metacarObj.position.x>=-8.4) && (metacarObj.position.z>=22.4 && metacarObj.position.z<=22.6) ||
      (metacarObj.position.x<=-8.2 && metacarObj.position.x>=-8.4) && (metacarObj.position.z>=-1.1 && metacarObj.position.z<=-0.9) ||
      (metacarObj.position.x<=-17.9 && metacarObj.position.x>=-18.1) && (metacarObj.position.z>=-1.1 && metacarObj.position.z<=-0.9) ||
      (metacarObj.position.x<=18.1 && metacarObj.position.x>=17.9) && (metacarObj.position.z>=-1.1 && metacarObj.position.z<=-0.9) ||
      (metacarObj.position.x<=18.1 && metacarObj.position.x>=17.9) && (metacarObj.position.z>=-12.1 && metacarObj.position.z<=-11.9) ||
      (metacarObj.position.x<=18.1 && metacarObj.position.x>=17.9) && (metacarObj.position.z>=11.9 && metacarObj.position.z<=12.1))  &&
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
  else if((metacarObj.position.x>=-35.1 && metacarObj.position.x<=-34.9) && (metacarObj.position.z>=22.4 && metacarObj.position.z<=22.6) && flag_sec2 != true){
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
    metacarObj.position.x = metacarObj.position.x + 0.1
    move_count = move_count + 1
    console.log('22222222222222222222')
  }
  else if((Math.floor(metacarObj.rotation.y*100)/100 == 3.14 || (metacarObj.rotation.y < -3.1 && metacarObj.rotation.y > -3.2)) && flag_stop!=true){
    metacarObj.position.x = metacarObj.position.x - 0.1
    move_count = move_count + 1
    console.log('22222222222222222222')
  }
  else if(Math.floor(metacarObj.rotation.y*100)/100 == 3.14/2 && flag_stop!=true){
    metacarObj.position.z = metacarObj.position.z - 0.1
    move_count = move_count + 1
    console.log('333333333333333333333')
  }
  else if((((Math.round(metacarObj.rotation.y * 100) / 100) > 4.7 && (Math.round(metacarObj.rotation.y * 100) / 100) < 4.75) || Math.floor(metacarObj.rotation.y*100)/100 == -3.14/2) && flag_stop!=true){
    metacarObj.position.z = metacarObj.position.z + 0.1
    move_count = move_count + 1
    console.log('333333333333333333333')
  }
  else{
    flag_forward = true
    flag_sec1 = true
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
      
      map =  [[0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 1, 0, 0],
              [0, 0, 2, 1, 1, 1, 1, 1, 1],
              [0, 0, 0, 1, 0, 0, 1, 0, 0],
              [4, 1, 1, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0]];
      // metacarObj.rotation.y = 0
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
      
      map =  [[0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 2, 0, 0],
              [0, 0, 1, 1, 1, 1, 1, 1, 1],
              [0, 0, 0, 1, 0, 0, 1, 0, 0],
              [4, 1, 1, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0]];
      // metacarObj.rotation.y = -3.14/2
    }
    else if(flag_sec1 && flag_sec2 && spanWord == 3){
      console.log("spanWord == 3")
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
      
      map =  [[0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 1, 0, 0],
              [0, 0, 1, 1, 1, 1, 1, 1, 1],
              [0, 0, 0, 1, 0, 0, 2, 0, 0],
              [4, 1, 1, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0]];
      // metacarObj.rotation.y = 3.14/2
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
  console.log("metacarObj.position.x = ", metacarObj.position.x)
  console.log("metacarObj.position.z = ", metacarObj.position.z)
  // console.log("metacarObj.rotation.y = ", Math.floor(metacarObj.rotation.y*100)/100)
  // console.log("first_search_target = ", first_search_target)
}

function turn_around(){
  if(flag_record2){
    meta_rotationy = metacarObj.rotation.y
    flag_record2 = false
    console.log("rotate11111111111111")
  }
  else if(a == 3 && metacarObj.rotation.y<=meta_rotationy+3.14){
    metacarObj.rotation.y = metacarObj.rotation.y + 0.01
    console.log("turn left")
  }
  else if((a == 1 || a ==2) &&metacarObj.rotation.y>=meta_rotationy-3.14){
    metacarObj.rotation.y = metacarObj.rotation.y - 0.01
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
    metacarObj.rotation.y = metacarObj.rotation.y + 0.01
    console.log("turn left")
  }
  else if(turn_direction == -1 && metacarObj.rotation.y>=meta_rotationy-3.14/2 && flag_turn){
    metacarObj.rotation.y = metacarObj.rotation.y - 0.01
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
  
  
  // console.log(spanWord)
  // console.log(metacarObj.position.x)
  //home  x:-35, y:-4.1, z:22.5
  //A-point x:-8, y:-4.1, z:22.5
  //B-point x:-8, y:-4.1, z:0
  //C-point x:18.5, y:-4.1, z:0

  


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
      map =  [[0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 1, 0, 0],
              [0, 0, 4, 1, 1, 1, 1, 1, 1],
              [0, 0, 0, 1, 0, 0, 1, 0, 0],
              [2, 1, 1, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0]];//park:(3, 3);
      flag_tween1 = true
      first_search_target = false
    }
    else if(first_search_target && a == 2){
      map =  [[0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 4, 0, 0],
              [0, 0, 1, 1, 1, 1, 1, 1, 1],
              [0, 0, 0, 1, 0, 0, 1, 0, 0],
              [2, 1, 1, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0]];//park:(3, 3);
      console.log('a2 = ', a)
      flag_tween1 = true
      first_search_target = false
    }
    else if(first_search_target && a == 3){
      map =  [[0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 1, 0, 0],
              [0, 0, 1, 1, 1, 1, 1, 1, 1],
              [0, 0, 0, 1, 0, 0, 4, 0, 0],
              [2, 1, 1, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0]];//park:(3, 3);
      console.log('a3 = ', a)
      flag_tween1 = true
      first_search_target = false
    }

//========================mov========================

    if(flag_tween1){
      flag_tween2 = true
      run()
      console.log("path1 = ", path)
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
          console.log(k + " : " + "turn right")
          turn_path.push(1)
        }
        else if((JSON.stringify(turn_left[0][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[0][1]) === JSON.stringify(road_path_sec[k+1])) ||
                (JSON.stringify(turn_left[1][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[1][1]) === JSON.stringify(road_path_sec[k+1])) ||
                (JSON.stringify(turn_left[2][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[2][1]) === JSON.stringify(road_path_sec[k+1])) ||
                (JSON.stringify(turn_left[3][0]) === JSON.stringify(road_path_sec[k]) && JSON.stringify(turn_left[3][1]) === JSON.stringify(road_path_sec[k+1]))){
          console.log(k + " : " + "turn left")
          turn_path.push(-1)
        }
        else{
          console.log(k + " : " + "keep")
        }
      }
      console.log(turn_path)
      flag_tween3 = false
      flag_tween4 = true
    }
    if(flag_tween4 && flag_turn_around!=true){
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
    else if(flag_turn_around){
      console.log("flag_turn_around")
      console.log(a)
      turn_around()
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
  TWEEN.update()
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth / this.window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

init()
render()