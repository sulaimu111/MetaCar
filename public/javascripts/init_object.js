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
      const parktextGeo = new THREE.TextGeometry( 'Supermarket', {
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
      park.position.set(2, 5, 25)
      // mesh.rotation.y = 3.14/4
      scene.add( park );
  
      const librarytextGeo = new THREE.TextGeometry( 'Park', {
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
      library.position.set(-40, 5, -5)
      library.rotation.y = 3.14/2
      scene.add( library );
  
      const schooltextGeo = new THREE.TextGeometry( 'Restaurant', {
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
      school.position.set(25, 5, -25)
      // mesh.rotation.y = 3.14/4
      scene.add( school );
    } );
  }

  // function initPointLight() {
  //   pointLight = new THREE.PointLight(0xffffff, 1, 300)
  //   pointLight.castShadow = true
  //   // pointLight.position.set(-30, 30, 30)
  //   pointLight.position.set(-80, 150, 80)
  //   scene.add(pointLight)
  // }

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


    //========================================================================boxA========================================================================
  
    // 建立A1方塊
    let boxA1aShape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
    let boxA1aCM = new CANNON.Material()
    boxA1aBody = new CANNON.Body({
      mass: 5,
      shape: boxA1aShape,
      position: new CANNON.Vec3(-60, 0.5, 40),
      material: boxA1aCM
    })
    world.add(boxA1aBody)
    
    // 設定兩剛體碰撞時交互作用屬性
    boxA1aGroundContact = new CANNON.ContactMaterial(groundCM, boxA1aCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxA1aGroundContact)
  
    let boxA1bShape = new CANNON.Box(new CANNON.Vec3(1.5, 2.5, 1.5))
    let boxA1bCM = new CANNON.Material()
    boxA1bBody = new CANNON.Body({
      mass: 5,
      shape: boxA1bShape,
      position: new CANNON.Vec3(-60, -4.5, 40),
      material: boxA1bCM
    })
    world.add(boxA1bBody)
  
    boxA1bGroundContact = new CANNON.ContactMaterial(groundCM, boxA1bCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxA1bGroundContact)
  
    boxA1Joint = new CANNON.LockConstraint(boxA1aBody, boxA1bBody)
    world.addConstraint(boxA1Joint)
  
  
    // 建立A2方塊
    let boxA2aShape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
    let boxA2aCM = new CANNON.Material()
    boxA2aBody = new CANNON.Body({
      mass: 5,
      shape: boxA2aShape,
      position: new CANNON.Vec3(-60, 0.5, 0),
      material: boxA2aCM
    })
    world.add(boxA2aBody)
    
    // 設定兩剛體碰撞時交互作用屬性
    boxA2aGroundContact = new CANNON.ContactMaterial(groundCM, boxA2aCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxA2aGroundContact)
  
    let boxA2bShape = new CANNON.Box(new CANNON.Vec3(1.5, 2.5, 1.5))
    let boxA2bCM = new CANNON.Material()
    boxA2bBody = new CANNON.Body({
      mass: 5,
      shape: boxA2bShape,
      position: new CANNON.Vec3(-60, -4.5, 0),
      material: boxA2bCM
    })
    world.add(boxA2bBody)
  
    boxA2bGroundContact = new CANNON.ContactMaterial(groundCM, boxA2bCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxA2bGroundContact)
  
    boxA2Joint = new CANNON.LockConstraint(boxA2aBody, boxA2bBody)
    world.addConstraint(boxA2Joint)



    // 建立A3方塊
    let boxA3aShape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
    let boxA3aCM = new CANNON.Material()
    boxA3aBody = new CANNON.Body({
      mass: 5,
      shape: boxA3aShape,
      position: new CANNON.Vec3(-60, 0.5, -40),
      material: boxA3aCM
    })
    world.add(boxA3aBody)
    
    // 設定兩剛體碰撞時交互作用屬性
    boxA3aGroundContact = new CANNON.ContactMaterial(groundCM, boxA3aCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxA3aGroundContact)
  
    let boxA3bShape = new CANNON.Box(new CANNON.Vec3(1.5, 2.5, 1.5))
    let boxA3bCM = new CANNON.Material()
    boxA3bBody = new CANNON.Body({
      mass: 5,
      shape: boxA3bShape,
      position: new CANNON.Vec3(-60, -4.5, -40),
      material: boxA3bCM
    })
    world.add(boxA3bBody)
  
    boxA3bGroundContact = new CANNON.ContactMaterial(groundCM, boxA3bCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxA3bGroundContact)
  
    boxA3Joint = new CANNON.LockConstraint(boxA3aBody, boxA3bBody)
    world.addConstraint(boxA3Joint)

    //========================================================================boxB========================================================================
  
    // 建立B1方塊
    let boxB1aShape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
    let boxB1aCM = new CANNON.Material()
    boxB1aBody = new CANNON.Body({
      mass: 5,
      shape: boxB1aShape,
      position: new CANNON.Vec3(0, 0.5, -54),
      material: boxB1aCM
    })
    world.add(boxB1aBody)
    
    // 設定兩剛體碰撞時交互作用屬性
    boxB1aGroundContact = new CANNON.ContactMaterial(groundCM, boxB1aCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxB1aGroundContact)
  
    let boxB1bShape = new CANNON.Box(new CANNON.Vec3(1.5, 2.5, 1.5))
    let boxB1bCM = new CANNON.Material()
    boxB1bBody = new CANNON.Body({
      mass: 5,
      shape: boxB1bShape,
      position: new CANNON.Vec3(0, -4.5, -54),
      material: boxB1bCM
    })
    world.add(boxB1bBody)
  
    boxB1bGroundContact = new CANNON.ContactMaterial(groundCM, boxB1bCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxB1bGroundContact)
  
    boxB1Joint = new CANNON.LockConstraint(boxB1aBody, boxB1bBody)
    world.addConstraint(boxB1Joint)
  
  
    // 建立B2方塊
    let boxB2aShape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
    let boxB2aCM = new CANNON.Material()
    boxB2aBody = new CANNON.Body({
      mass: 5,
      shape: boxB2aShape,
      position: new CANNON.Vec3(30, 0.5, -54),
      material: boxB2aCM
    })
    world.add(boxB2aBody)
    
    // 設定兩剛體碰撞時交互作用屬性
    boxB2aGroundContact = new CANNON.ContactMaterial(groundCM, boxB2aCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxB2aGroundContact)
  
    let boxB2bShape = new CANNON.Box(new CANNON.Vec3(1.5, 2.5, 1.5))
    let boxB2bCM = new CANNON.Material()
    boxB2bBody = new CANNON.Body({
      mass: 5,
      shape: boxB2bShape,
      position: new CANNON.Vec3(30, -4.5, -54),
      material: boxB2bCM
    })
    world.add(boxB2bBody)
  
    boxB2bGroundContact = new CANNON.ContactMaterial(groundCM, boxB2bCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxB2bGroundContact)
  
    boxB2Joint = new CANNON.LockConstraint(boxB2aBody, boxB2bBody)
    world.addConstraint(boxB2Joint)



    // 建立B3方塊
    let boxB3aShape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
    let boxB3aCM = new CANNON.Material()
    boxB3aBody = new CANNON.Body({
      mass: 5,
      shape: boxB3aShape,
      position: new CANNON.Vec3(60, 0.5, -54),
      material: boxB3aCM
    })
    world.add(boxB3aBody)
    
    // 設定兩剛體碰撞時交互作用屬性
    boxB3aGroundContact = new CANNON.ContactMaterial(groundCM, boxB3aCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxB3aGroundContact)
  
    let boxB3bShape = new CANNON.Box(new CANNON.Vec3(1.5, 2.5, 1.5))
    let boxB3bCM = new CANNON.Material()
    boxB3bBody = new CANNON.Body({
      mass: 5,
      shape: boxB3bShape,
      position: new CANNON.Vec3(60, -4.5, -54),
      material: boxB3bCM
    })
    world.add(boxB3bBody)
  
    boxB3bGroundContact = new CANNON.ContactMaterial(groundCM, boxB3bCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxB3bGroundContact)
  
    boxB3Joint = new CANNON.LockConstraint(boxB3aBody, boxB3bBody)
    world.addConstraint(boxB3Joint)

  
    //========================================================================boxC========================================================================
  
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
  
  
    // 建立C2方塊
    let boxC2aShape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
    let boxC2aCM = new CANNON.Material()
    boxC2aBody = new CANNON.Body({
      mass: 5,
      shape: boxC2aShape,
      position: new CANNON.Vec3(30, 0.5, 54),
      material: boxC2aCM
    })
    world.add(boxC2aBody)
    
    // 設定兩剛體碰撞時交互作用屬性
    boxC2aGroundContact = new CANNON.ContactMaterial(groundCM, boxC2aCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxC2aGroundContact)
  
    let boxC2bShape = new CANNON.Box(new CANNON.Vec3(1.5, 2.5, 1.5))
    let boxC2bCM = new CANNON.Material()
    boxC2bBody = new CANNON.Body({
      mass: 5,
      shape: boxC2bShape,
      position: new CANNON.Vec3(30, -4.5, 54),
      material: boxC2bCM
    })
    world.add(boxC2bBody)
  
    boxC2bGroundContact = new CANNON.ContactMaterial(groundCM, boxC2bCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxC2bGroundContact)
  
    boxC2Joint = new CANNON.LockConstraint(boxC2aBody, boxC2bBody)
    world.addConstraint(boxC2Joint)



    // 建立C3方塊
    let boxC3aShape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
    let boxC3aCM = new CANNON.Material()
    boxC3aBody = new CANNON.Body({
      mass: 5,
      shape: boxC3aShape,
      position: new CANNON.Vec3(0, 0.5, 54),
      material: boxC3aCM
    })
    world.add(boxC3aBody)
    
    // 設定兩剛體碰撞時交互作用屬性
    boxC3aGroundContact = new CANNON.ContactMaterial(groundCM, boxC2aCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxC3aGroundContact)
  
    let boxC3bShape = new CANNON.Box(new CANNON.Vec3(1.5, 2.5, 1.5))
    let boxC3bCM = new CANNON.Material()
    boxC3bBody = new CANNON.Body({
      mass: 5,
      shape: boxC3bShape,
      position: new CANNON.Vec3(0, -4.5, 54),
      material: boxC3bCM
    })
    world.add(boxC3bBody)
  
    boxC3bGroundContact = new CANNON.ContactMaterial(groundCM, boxC3bCM, {
      friction: friction, // 摩擦力
      restitution: restitution // 恢復係數, 衡量兩個物體碰撞後反彈程度
    })
    world.addContactMaterial(boxC3bGroundContact)
  
    boxC3Joint = new CANNON.LockConstraint(boxC3aBody, boxC3bBody)
    world.addConstraint(boxC3Joint)


  
    //========================================================================機器人剛體========================================================================
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
  

    //========================================================================網格========================================================================

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
    scene.add(gripperA);
  
    const gripperA2Geo = new THREE.BoxGeometry(1, 4, 1);
    const gripperA2Mat = new THREE.MeshPhongMaterial({
      color: 0x4287f5,
      // wireframe: true
    });
    gripperA2 = new THREE.Mesh(gripperA2Geo, gripperA2Mat);
    gripperA2.castShadow = true
    // car.position.y = 10
    scene.add(gripperA2);
  
    const gripperA3Geo = new THREE.BoxGeometry(1, 4, 1);
    const gripperA3Mat = new THREE.MeshPhongMaterial({
      color: 0x4287f5,
      // wireframe: true
    });
    gripperA3 = new THREE.Mesh(gripperA3Geo, gripperA3Mat);
    gripperA3.castShadow = true
    // car.position.y = 10
    scene.add(gripperA3);
  
    const gripperA4Geo = new THREE.BoxGeometry(5, 5, 1);
    const gripperA4Mat = new THREE.MeshPhongMaterial({
      color: 0x4287f5,
      // wireframe: true
    });
    gripperA4 = new THREE.Mesh(gripperA4Geo, gripperA4Mat);
    gripperA4.castShadow = true
    // car.position.y = 10
    scene.add(gripperA4);
  
    const gripperBGeo = new THREE.BoxGeometry(10, 1, 1);
    const gripperBMat = new THREE.MeshPhongMaterial({
      color: 0x4287f5,
      // wireframe: true
    });
    gripperB = new THREE.Mesh(gripperBGeo, gripperBMat);
    gripperB.castShadow = true
    // car.position.y = 10
    scene.add(gripperB);
  
    const gripperB2Geo = new THREE.BoxGeometry(1, 4, 1);
    const gripperB2Mat = new THREE.MeshPhongMaterial({
      color: 0x4287f5,
      // wireframe: true
    });
    gripperB2 = new THREE.Mesh(gripperB2Geo, gripperB2Mat);
    gripperB2.castShadow = true
    // car.position.y = 10
    scene.add(gripperB2);
  
    const gripperB3Geo = new THREE.BoxGeometry(1, 4, 1);
    const gripperB3Mat = new THREE.MeshPhongMaterial({
      color: 0x4287f5,
      // wireframe: true
    });
    gripperB3 = new THREE.Mesh(gripperB3Geo, gripperB3Mat);
    gripperB3.castShadow = true
    // car.position.y = 10
    scene.add(gripperB3);
  
    const gripperB4Geo = new THREE.BoxGeometry(5, 5, 1);
    const gripperB4Mat = new THREE.MeshPhongMaterial({
      color: 0x4287f5,
      // wireframe: true
    });
    gripperB4 = new THREE.Mesh(gripperB4Geo, gripperB4Mat);
    gripperB4.castShadow = true
    // car.position.y = 10
    scene.add(gripperB4);
  
    const gripperTopGeo = new THREE.BoxGeometry(20, 1, 5);
    const gripperTopMat = new THREE.MeshPhongMaterial({
      color: 0x4287f5,
      // wireframe: true
    });
    gripperTop = new THREE.Mesh(gripperTopGeo, gripperTopMat);
    gripperTop.castShadow = true
    // car.position.y = 10
    scene.add(gripperTop);
  

    //========================================================================box A網格========================================================================

    //建立A1幾何方塊
    const boxA1aGeo = new THREE.BoxGeometry(5, 10, 5);
    // 苦力怕臉部貼圖
    const A1Map = new THREE.TextureLoader().load(
      'images/item_picture/A11.jpg'
    )
    // 苦力怕皮膚貼圖
    const skinMap = new THREE.TextureLoader().load(
      'https://dl.dropboxusercontent.com/s/eev6wxdxfmukkt8/creeper_skin.png'
    )
    const boxA1aMat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 0) map = A1Map
      else map = skinMap
    
      boxA1aMat.push(new THREE.MeshBasicMaterial({ map: map }))
    }

    boxA1a = new THREE.Mesh(boxA1aGeo, boxA1aMat);
    boxA1a.castShadow = true
    boxA1a.position.y = 10
    scene.add(boxA1a);
  
    const boxA1bGeo = new THREE.BoxGeometry(3, 5, 3);
    const boxA1bMat = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      // wireframe: true
    });
    boxA1b = new THREE.Mesh(boxA1bGeo, boxA1bMat);
    boxA1b.castShadow = true
    boxA1b.position.y = 10
    // scene.add(boxA1b);
  
  
    //建立A2幾何方塊
    const boxA2aGeo = new THREE.BoxGeometry(5, 10, 5);
    const A2Map = new THREE.TextureLoader().load(
      'images/item_picture/A21.jpg'
    )
    const boxA2aMat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 0) map = A2Map
      else map = skinMap
    
      boxA2aMat.push(new THREE.MeshBasicMaterial({ map: map }))
    }
    boxA2a = new THREE.Mesh(boxA2aGeo, boxA2aMat);
    boxA2a.castShadow = true
    boxA2a.position.y = 10
    scene.add(boxA2a);
  
    const boxA2bGeo = new THREE.BoxGeometry(3, 5, 3);
    const boxA2bMat = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      // wireframe: true
    });
    boxA2b = new THREE.Mesh(boxA2bGeo, boxA2bMat);
    boxA2b.castShadow = true
    boxA2b.position.y = 10
    // scene.add(boxA2b);


    //建立A3幾何方塊
    const boxA3aGeo = new THREE.BoxGeometry(5, 10, 5);
    const A3Map = new THREE.TextureLoader().load(
      'images/item_picture/A31.jpg'
    )
    const boxA3aMat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 0) map = A3Map
      else map = skinMap
    
      boxA3aMat.push(new THREE.MeshBasicMaterial({ map: map }))
    }
    boxA3a = new THREE.Mesh(boxA3aGeo, boxA3aMat);
    boxA3a.castShadow = true
    boxA3a.position.y = 10
    scene.add(boxA3a);
  
    const boxA3bGeo = new THREE.BoxGeometry(3, 5, 3);
    const boxA3bMat = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      // wireframe: true
    });
    boxA3b = new THREE.Mesh(boxA3bGeo, boxA3bMat);
    boxA3b.castShadow = true
    boxA3b.position.y = 10
    // scene.add(boxA3b);

    //========================================================================box B網格========================================================================

    //建立B1幾何方塊
    const boxB1aGeo = new THREE.BoxGeometry(5, 10, 5);
    const B1Map = new THREE.TextureLoader().load(
      'images/item_picture/B11.jpg'
    )
    const boxB1aMat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 4) map = B1Map
      else map = skinMap
    
      boxB1aMat.push(new THREE.MeshBasicMaterial({ map: map }))
    }
    boxB1a = new THREE.Mesh(boxB1aGeo, boxB1aMat);
    boxB1a.castShadow = true
    boxB1a.position.y = 10
    scene.add(boxB1a);
  
    const boxB1bGeo = new THREE.BoxGeometry(3, 5, 3);
    const boxB1bMat = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      // wireframe: true
    });
    boxB1b = new THREE.Mesh(boxB1bGeo, boxB1bMat);
    boxB1b.castShadow = true
    boxB1b.position.y = 10
    // scene.add(boxB1b);
  
  
    //建立B2幾何方塊
    const boxB2aGeo = new THREE.BoxGeometry(5, 10, 5);
    const B2Map = new THREE.TextureLoader().load(
      'images/item_picture/B21.png'
    )
    const boxB2aMat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 4) map = B2Map
      else map = skinMap
    
      boxB2aMat.push(new THREE.MeshBasicMaterial({ map: map }))
    }
    boxB2a = new THREE.Mesh(boxB2aGeo, boxB2aMat);
    boxB2a.castShadow = true
    boxB2a.position.y = 10
    scene.add(boxB2a);
  
    const boxB2bGeo = new THREE.BoxGeometry(3, 5, 3);
    const boxB2bMat = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      // wireframe: true
    });
    boxB2b = new THREE.Mesh(boxB2bGeo, boxB2bMat);
    boxB2b.castShadow = true
    boxB2b.position.y = 10
    // scene.add(boxB2b);


    //建立B3幾何方塊
    const boxB3aGeo = new THREE.BoxGeometry(5, 10, 5);
    const B3Map = new THREE.TextureLoader().load(
      'images/item_picture/B31.jpg'
    )
    const boxB3aMat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 4) map = B3Map
      else map = skinMap
    
      boxB3aMat.push(new THREE.MeshBasicMaterial({ map: map }))
    }
    boxB3a = new THREE.Mesh(boxB3aGeo, boxB3aMat);
    boxB3a.castShadow = true
    boxB3a.position.y = 10
    scene.add(boxB3a);
  
    const boxB3bGeo = new THREE.BoxGeometry(3, 5, 3);
    const boxB3bMat = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      // wireframe: true
    });
    boxB3b = new THREE.Mesh(boxB3bGeo, boxB3bMat);
    boxB3b.castShadow = true
    boxB3b.position.y = 10
    // scene.add(boxB3b);

    //========================================================================box C網格========================================================================

    //建立C1幾何方塊
    const boxC1aGeo = new THREE.BoxGeometry(5, 10, 5);
    const C1Map = new THREE.TextureLoader().load(
      'images/item_picture/C11.jpg'
    )
    const boxC1aMat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 5) map = C1Map
      else map = skinMap
    
      boxC1aMat.push(new THREE.MeshBasicMaterial({ map: map }))
    }
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
    // scene.add(boxC1b);
  
  
    //建立C2幾何方塊
    const boxC2aGeo = new THREE.BoxGeometry(5, 10, 5);
    const C2Map = new THREE.TextureLoader().load(
      'images/item_picture/C21.jpg'
    )
    const boxC2aMat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 5) map = C2Map
      else map = skinMap
    
      boxC2aMat.push(new THREE.MeshBasicMaterial({ map: map }))
    }
    boxC2a = new THREE.Mesh(boxC2aGeo, boxC2aMat);
    boxC2a.castShadow = true
    boxC2a.position.y = 10
    scene.add(boxC2a);
  
    const boxC2bGeo = new THREE.BoxGeometry(3, 5, 3);
    const boxC2bMat = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      // wireframe: true
    });
    boxC2b = new THREE.Mesh(boxC2bGeo, boxC2bMat);
    boxC2b.castShadow = true
    boxC2b.position.y = 10
    // scene.add(boxC2b);


    //建立C3幾何方塊
    const boxC3aGeo = new THREE.BoxGeometry(5, 10, 5);
    const C3Map = new THREE.TextureLoader().load(
      'images/item_picture/C31.png'
    )
    const boxC3aMat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 5) map = C3Map
      else map = skinMap
    
      boxC3aMat.push(new THREE.MeshBasicMaterial({ map: map }))
    }
    boxC3a = new THREE.Mesh(boxC3aGeo, boxC3aMat);
    boxC3a.castShadow = true
    boxC3a.position.y = 10
    scene.add(boxC3a);
  
    const boxC3bGeo = new THREE.BoxGeometry(3, 5, 3);
    const boxC3bMat = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      // wireframe: true
    });
    boxC3b = new THREE.Mesh(boxC3bGeo, boxC3bMat);
    boxC3b.castShadow = true
    boxC3b.position.y = 10
    // scene.add(boxC3b);
  }

function init_background_object() {
  //========================================================================back A網格========================================================================

    //建立A12幾何方塊
    const boxA12Geo = new THREE.BoxGeometry(5, 10, 5);
    const skinMap = new THREE.TextureLoader().load(
      'https://dl.dropboxusercontent.com/s/eev6wxdxfmukkt8/creeper_skin.png'
    )
    const A12Map = new THREE.TextureLoader().load(
      'images/item_picture/A12.jpg'
    )
    const boxA12Mat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 0) map = A12Map
      else map = skinMap
    
      boxA12Mat.push(new THREE.MeshBasicMaterial({ map: map }))
    }

    boxA12 = new THREE.Mesh(boxA12Geo, boxA12Mat);
    boxA12.castShadow = true
    // boxA12.position.y = 10
    boxA12.position.set(-70, -2, 25)
    scene.add(boxA12);

    //建立A13背景
    const planeA13Geometry = new THREE.PlaneGeometry(25, 25)
    const TextureLoader = new THREE.TextureLoader()
    const planeA13texture = TextureLoader.load('images/item_picture/A13.png')
    // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
    const planeA13Material = new THREE.MeshBasicMaterial({map:planeA13texture})
    planeA13 = new THREE.Mesh(planeA13Geometry, planeA13Material)
    planeA13.rotation.y = 0.5 * Math.PI
    planeA13.position.set(-75, 10, 35)
    // planeA13.castShadow = true
    // planeA13.receiveShadow = true
    scene.add(planeA13)


    //建立A22幾何方塊
    const boxA22Geo = new THREE.BoxGeometry(5, 10, 5);
    const A22Map = new THREE.TextureLoader().load(
      'images/item_picture/A22.jpg'
    )
    const boxA22Mat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 0) map = A22Map
      else map = skinMap
    
      boxA22Mat.push(new THREE.MeshBasicMaterial({ map: map }))
    }

    boxA22 = new THREE.Mesh(boxA22Geo, boxA22Mat);
    boxA22.castShadow = true
    // boxA12.position.y = 10
    boxA22.position.set(-70, -2, -15),
    scene.add(boxA22);

    //建立A23背景
    const planeA23Geometry = new THREE.PlaneGeometry(25, 25)
    const planeA23texture = TextureLoader.load('images/item_picture/A23.png')
    // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
    const planeA23Material = new THREE.MeshBasicMaterial({map:planeA23texture})
    planeA23 = new THREE.Mesh(planeA23Geometry, planeA23Material)
    planeA23.rotation.y = 0.5 * Math.PI
    planeA23.position.set(-75, 10, -7)
    // planeA13.castShadow = true
    // planeA13.receiveShadow = true
    scene.add(planeA23)


    //建立A32幾何方塊
    const boxA32Geo = new THREE.BoxGeometry(5, 10, 5);
    const A32Map = new THREE.TextureLoader().load(
      'images/item_picture/A32.png'
    )
    const boxA32Mat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 0) map = A32Map
      else map = skinMap
    
      boxA32Mat.push(new THREE.MeshBasicMaterial({ map: map }))
    }

    boxA32 = new THREE.Mesh(boxA32Geo, boxA32Mat);
    boxA32.castShadow = true
    // boxA12.position.y = 10
    boxA32.position.set(-70, -2, -55),
    scene.add(boxA32);

    //建立A33背景
    const planeA33Geometry = new THREE.PlaneGeometry(25, 25)
    const planeA33texture = TextureLoader.load('images/item_picture/A33.jpg')
    // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
    const planeA33Material = new THREE.MeshBasicMaterial({map:planeA33texture})
    planeA33 = new THREE.Mesh(planeA33Geometry, planeA33Material)
    planeA33.rotation.y = 0.5 * Math.PI
    planeA33.position.set(-75, 10, -47)
    // planeA13.castShadow = true
    // planeA13.receiveShadow = true
    scene.add(planeA33)
  
    

    //========================================================================back B網格========================================================================

    //建立B12幾何方塊
    const boxB12Geo = new THREE.BoxGeometry(5, 10, 5);
    const B12Map = new THREE.TextureLoader().load(
      'images/item_picture/B12.jpg'
    )
    const boxB12Mat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 4) map = B12Map
      else map = skinMap
    
      boxB12Mat.push(new THREE.MeshBasicMaterial({ map: map }))
    }

    boxB12 = new THREE.Mesh(boxB12Geo, boxB12Mat);
    boxB12.castShadow = true
    // boxA12.position.y = 10
    boxB12.position.set(10, -2, -64),
    scene.add(boxB12);

    //建立B13背景
    const planeB13Geometry = new THREE.PlaneGeometry(25, 25)
    const planeB13texture = TextureLoader.load('images/item_picture/B13.png')
    // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
    const planeB13Material = new THREE.MeshBasicMaterial({map:planeB13texture})
    planeB13 = new THREE.Mesh(planeB13Geometry, planeB13Material)
    // planeB13.rotation.y = 0.5 * Math.PI
    planeB13.position.set(5, 10, -74)
    // planeA13.castShadow = true
    // planeA13.receiveShadow = true
    scene.add(planeB13)


    //建立B22幾何方塊
    const boxB22Geo = new THREE.BoxGeometry(5, 10, 5);
    const B22Map = new THREE.TextureLoader().load(
      'images/item_picture/B22.png'
    )
    const boxB22Mat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 4) map = B22Map
      else map = skinMap
    
      boxB22Mat.push(new THREE.MeshBasicMaterial({ map: map }))
    }

    boxB22 = new THREE.Mesh(boxB22Geo, boxB22Mat);
    boxB22.castShadow = true
    // boxA12.position.y = 10
    boxB22.position.set(40, -2, -64),
    scene.add(boxB22);

    //建立B23背景
    const planeB23Geometry = new THREE.PlaneGeometry(25, 25)
    const planeB23texture = TextureLoader.load('images/item_picture/B23.jpg')
    // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
    const planeB23Material = new THREE.MeshBasicMaterial({map:planeB23texture})
    planeB23 = new THREE.Mesh(planeB23Geometry, planeB23Material)
    // planeB13.rotation.y = 0.5 * Math.PI
    planeB23.position.set(35, 10, -74)
    // planeA13.castShadow = true
    // planeA13.receiveShadow = true
    scene.add(planeB23)


    //建立B32幾何方塊
    const boxB32Geo = new THREE.BoxGeometry(5, 10, 5);
    const B32Map = new THREE.TextureLoader().load(
      'images/item_picture/B32.png'
    )
    const boxB32Mat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 4) map = B32Map
      else map = skinMap
    
      boxB32Mat.push(new THREE.MeshBasicMaterial({ map: map }))
    }

    boxB32 = new THREE.Mesh(boxB32Geo, boxB32Mat);
    boxB32.castShadow = true
    // boxA12.position.y = 10
    boxB32.position.set(70, -2, -64),
    scene.add(boxB32);

    //建立B33背景
    const planeB33Geometry = new THREE.PlaneGeometry(25, 25)
    const planeB33texture = TextureLoader.load('images/item_picture/B33.jpg')
    // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
    const planeB33Material = new THREE.MeshBasicMaterial({map:planeB33texture})
    planeB23 = new THREE.Mesh(planeB33Geometry, planeB33Material)
    // planeB13.rotation.y = 0.5 * Math.PI
    planeB23.position.set(65, 10, -74)
    // planeA13.castShadow = true
    // planeA13.receiveShadow = true
    scene.add(planeB23)

    //========================================================================back C網格========================================================================

    //建立C12幾何方塊
    const boxC12Geo = new THREE.BoxGeometry(5, 10, 5);
    const C12Map = new THREE.TextureLoader().load(
      'images/item_picture/C12.jpg'
    )
    const boxC12Mat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 5) map = C12Map
      else map = skinMap
    
      boxC12Mat.push(new THREE.MeshBasicMaterial({ map: map }))
    }

    boxC12 = new THREE.Mesh(boxC12Geo, boxC12Mat);
    boxC12.castShadow = true
    // boxA12.position.y = 10
    boxC12.position.set(50, -2, 64),
    scene.add(boxC12);

    //建立C13背景
    const planeC13Geometry = new THREE.PlaneGeometry(25, 25)
    const planeC13texture = TextureLoader.load('images/item_picture/C13.jpg')
    // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
    const planeC13Material = new THREE.MeshBasicMaterial({map:planeC13texture})
    planeC13 = new THREE.Mesh(planeC13Geometry, planeC13Material)
    planeC13.rotation.y = Math.PI
    planeC13.position.set(55, 10, 74)
    // planeA13.castShadow = true
    // planeA13.receiveShadow = true
    scene.add(planeC13)


    //建立C22幾何方塊
    const boxC22Geo = new THREE.BoxGeometry(5, 10, 5);
    const C22Map = new THREE.TextureLoader().load(
      'images/item_picture/C22.jpg'
    )
    const boxC22Mat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 5) map = C22Map
      else map = skinMap
    
      boxC22Mat.push(new THREE.MeshBasicMaterial({ map: map }))
    }

    boxC22 = new THREE.Mesh(boxC22Geo, boxC22Mat);
    boxC22.castShadow = true
    // boxA12.position.y = 10
    boxC22.position.set(20, -2, 64),
    scene.add(boxC22);

    //建立C23背景
    const planeC23Geometry = new THREE.PlaneGeometry(25, 25)
    const planeC23texture = TextureLoader.load('images/item_picture/C23.png')
    // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
    const planeC23Material = new THREE.MeshBasicMaterial({map:planeC23texture})
    planeC23 = new THREE.Mesh(planeC23Geometry, planeC23Material)
    planeC23.rotation.y = Math.PI
    planeC23.position.set(25, 10, 74)
    // planeA13.castShadow = true
    // planeA13.receiveShadow = true
    scene.add(planeC23)
    

    //建立C32幾何方塊
    const boxC32Geo = new THREE.BoxGeometry(5, 10, 5);
    const C32Map = new THREE.TextureLoader().load(
      'images/item_picture/C32.png'
    )
    const boxC32Mat = [];
    for (let i = 0; i < 6; i++) {
      let map
    
      if (i === 5) map = C32Map
      else map = skinMap
    
      boxC32Mat.push(new THREE.MeshBasicMaterial({ map: map }))
    }

    boxC32 = new THREE.Mesh(boxC32Geo, boxC32Mat);
    boxC32.castShadow = true
    // boxA12.position.y = 10
    boxC32.position.set(-10, -2, 64),
    scene.add(boxC32);

    //建立C33背景
    const planeC33Geometry = new THREE.PlaneGeometry(25, 25)
    const planeC33texture = TextureLoader.load('images/item_picture/C33.png')
    // const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
    const planeC33Material = new THREE.MeshBasicMaterial({map:planeC33texture})
    planeC33 = new THREE.Mesh(planeC33Geometry, planeC33Material)
    planeC33.rotation.y = Math.PI
    planeC33.position.set(-5, 10, 74)
    // planeA13.castShadow = true
    // planeA13.receiveShadow = true
    scene.add(planeC33)
}