

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

export default class Three {
  constructor({
    canvasContainer,
    sceneSizes,
  }) {

    // scene
    this.scene = new THREE.Scene();

    // camera
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(sceneSizes.width, sceneSizes.height);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor(0x333F47, 1);
    canvasContainer.appendChild(this.renderer.domElement);

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.enablePan = false;
    // this.controls.minDistance = 15;
    // this.controls.maxDistance = 35;
    // this.controls.minPolarAngle = 1.5; // radians
    // this.controls.maxPolarAngle = 1.5;

    // models
    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.texture = new THREE.TextureLoader().load( '/wood.png' );
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
    this.mesh.position.set(-1, -1, 1);

    this.loadModels();
    
    // events
    window.addEventListener('resize', function() {
      let WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      console.log(WIDTH, HEIGHT)
      this.renderer.setSize(WIDTH, HEIGHT);
      this.camera.aspect = WIDTH / HEIGHT;
      this.camera.updateProjectionMatrix();
    });

    // animation
    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  };

  loadModels = () => {
    // this.manager = new THREE.LoadingManager();

    // this.loader = new ThreeMFLoader( this.manager );
    // this.loader.load( '/truck.3mf', ( object ) => {

    //   object.quaternion.setFromEuler( new THREE.Euler( - Math.PI / 2, 0, 0 ) ); 	// z-up conversion

    //   object.traverse( function ( child ) {

    //     child.castShadow = true;

    //   } );

    //   this.scene.add( object );

    // } );

    this.loader = new THREE.FileLoader();
    // this.loader = new THREE.ObjectLoader();
    this.loader.load(
      // resource URL
      "/walls.json",
    
      // onLoad callback
      // Here the loaded data is assumed to be an object
      function ( obj ) {
        // Add the loaded object to the scene
        // this.scene.add( obj );
      },
    
      // onProgress callback
      function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },
    
      // onError callback
      function ( err ) {
        console.error( 'An error happened' );
      }
    );
    console.log(window)
    // Alternatively, to parse a previously loaded JSON structure
    // this.object = this.loader.parse( a_json_object );
    // this.scene.add( this.object );




    // this.loader = new THREE.ObjectLoader();
    // this.loader.load('/walls.json', function(geometry, materials) {
    //   console.log("loaded")
    // 	// this.objects.house.geometry = geometry;
    //   // this.objects.house.materials.normal = new THREE.MeshFaceMaterial(materials);
    //   // this.objects.house.mesh = new THREE.Mesh(geometry, this.objects.house.materials.normal);
    //   // this.objects.house.mesh.name = null;
    //   // this.scene.add(this.objects.house.mesh);
    //   // this.objects.house.mesh.position.set(-4.75, -3, 4.5);
    // },
    // function(xhr) {
    //   console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    // },
    // function() {
    //   console.log('error')
    // });
    // let a = this.loader.parseObject('/walls.json', function(geometry, materials) {
    //   console.log("loaded")
    // });
    // console.log(a)
    // this.scene.add(a);
  }
}
