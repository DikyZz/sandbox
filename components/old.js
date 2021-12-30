import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// export default Three = {
//   abc: new OrbitControls()
// };
export default class Three {
  constructor({
    canvasContainer,
    sceneSizes,
  }) {
    // Для использования внутри класса добавляем параметры к this
    // this.sceneSizes = sceneSizes;
    // this.mesh;
    
    // this.initSmth();
    // this.initCamera();
    // this.initScene();
    // this.initRender(canvasContainer);
    // this.initControls();
    // this.loadModels();
    // this.initEventListeners();
    // this.animation();



    this.group; 
    this.camera;
    this.scene;
    this.renderer;

    this.init();
    this.animate();
  }

  initSmth() {
    // this.loader = new THREE.JSONLoader()
    this.loader = new THREE.ObjectLoader()
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 30;
    // this.camera.lookAt( 0, 3, 0 );
  }

  initScene() {
    this.scene = new THREE.Scene();
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.enablePan = false;
    this.controls.minDistance = 15;
    this.controls.maxDistance = 35;
    this.controls.minPolarAngle = 1.5; // radians
    this.controls.maxPolarAngle = 1.5;
  }

  initRender(canvasContainer) {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(this.sceneSizes.width, this.sceneSizes.height);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor(0x333F47, 1);
    // this.renderer.setAnimationLoop( this.animation );

    canvasContainer.appendChild(this.renderer.domElement);
  }
  
  initEventListeners() {
    window.addEventListener('resize', function() {
      let WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      console.log(WIDTH, HEIGHT)
      this.renderer.setSize(WIDTH, HEIGHT);
      this.camera.aspect = WIDTH / HEIGHT;
      this.camera.updateProjectionMatrix();
    });
  }

  loadModels() {
    let geometry = new THREE.BoxGeometry( 3, 3, 3 );
    let material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh( geometry, material );
    this.scene.add( this.mesh );

    this.loader.load('/static/resources/walls.json', function(geometry, materials) {
      console.log("loaded")
    	// this.objects.house.geometry = geometry;
      // this.objects.house.materials.normal = new THREE.MeshFaceMaterial(materials);
      // this.objects.house.mesh = new THREE.Mesh(geometry, this.objects.house.materials.normal);
      // this.objects.house.mesh.name = null;
      // this.scene.add(this.objects.house.mesh);
      // this.objects.house.mesh.position.set(-4.75, -3, 4.5);
    });
    let a = this.loader.parseObject('/static/resources/walls.json', function(geometry, materials) {
      console.log("loaded")
    });
    console.log(a)
    this.scene.add(a);
    // this.objects.house.mesh.position.set(-4.75, -3, 4.5);

    this.geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
    this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    this.sphere = new THREE.Mesh( this.geometry, this.material );
    this.sphere.position.set( 0, -1, 25 );
    this.sphere.name = "sphere";
    this.sphere.visible = true;
    this.scene.add( this.sphere );
  }

  render() {
    // console.log(THREE)
    
	  // controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  animation( time ) {
    // console.log(requestAnimationFrame)
    // console.log(this.animation)
    console.log("FFF", this)
    // requestAnimationFrame(this.animation);
    this.render();
  }
}