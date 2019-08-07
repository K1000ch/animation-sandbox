// ページの読み込みを待つ
window.addEventListener('load', init);

// サイズを指定
const width = 960;
const height = 540;

function init() {
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);


  // 画像を読み込む
  const loader = new THREE.TextureLoader();
  const texture = loader.load('../../images/planets/2k_jupiter.jpg');
  // マテリアルにテクスチャーを設定
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness:0.8
  });

  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  // 3D空間にメッシュを追加
  scene.add(mesh);

  mesh.rotation.x = Math.PI / 8;


  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(50, 50, 60);
  // シーンに追加
  scene.add(directionalLight);

  var light = new THREE.AmbientLight(0xFFFFFF, 0.2);
  scene.add(light);

  // 赤い光
  // var light = new THREE.AmbientLight(0xff0000);
  // scene.add( light );

  //load background image
  new THREE.TextureLoader();
  loader.load('https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg' , function(texture)
  {
    scene.background = texture;  
  });

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // メッシュを回転させる
    mesh.rotation.y += 0.002;
    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
}