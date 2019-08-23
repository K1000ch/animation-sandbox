var container;
var camera, scene, renderer;
var uniforms;
init();
animate();


function init(){
  container = document.getElementById( 'container' );

  camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

  scene = new THREE.Scene();


  //画像読み込み
  var loader = new THREE.TextureLoader();
  // var texture = loader.load('../../images/planets/2k_jupiter.jpg');

  var uniforms = {
    resolution: {
      type: 'v2',
      value: new THREE.Vector2(container.clientWidth, container.clientHeight),
    },
    imageResolution: {
      type: 'v2',
      value: new THREE.Vector2(2048, 1356),
    },
    texture: {
      type: 't',
      value: new THREE.TextureLoader().load("../../images/planets/2k_moon.jpg"), 
    },
  };

  
  var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

  
  // Material作成
  var material = new THREE.RawShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    transparent: true,
  });

  
  // var material = new THREE.MeshBasicMaterial({color: 0x0099FF});
  // var material = material = new THREE.MeshNormalMaterial();

  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  container.appendChild( renderer.domElement );
  onWindowResize();
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  renderer.setSize( container.clientWidth, container.clientHeight );
}

function animate( timestamp ) {
  requestAnimationFrame( animate );
  // uniforms[ "time" ].value = timestamp / 1000;
  renderer.render( scene, camera );
}