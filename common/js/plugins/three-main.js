//定義共用數據
let runTime;
let canvasHeight;
let canvasWidth;
let scene;
let renderer;
let camera;
let box;

function init() {

  canvasHeight = document.getElementById("three").offsetHeight;  // 將 canvas 高度設定成 #three 的高度
  canvasWidth = document.getElementById("three").offsetWidth; // 將 canvas 高度設定成 #three 的高度


  // * ==========================================================================
  // * 創建場景
  // * ==========================================================================
  scene = new THREE.Scene();           // 建立新場景
  camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 1000); // 建立鏡頭
  camera.position.set(150, 150, 150);
  scene.add(camera);                    // 把鏡頭加到場景

  renderer = new THREE.WebGLRenderer({ // 建立渲染器
    antialias: true,
    alpha: true,                               // 反鋸齒開啟
  });
  renderer.setSize(canvasWidth, canvasHeight); // 設定渲染器大小跟 canvas 一樣
  renderer.setPixelRatio(window.devicePixelRatio);       // 設定渲染器比例跟螢幕一樣
  document.getElementById("three").appendChild(renderer.domElement);  // 把渲染器加到 #three


  // * ==========================================================================
  // * 設定光源
  // * ==========================================================================
  const Light = new THREE.HemisphereLight(0xffffff, 0x080820, 0.8);  // 設定環境光源
  scene.add(Light);                                                   // 把光源加到場景


  // * ==========================================================================
  // * 創建模型
  // * ==========================================================================
  const cubeGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 5, 5, 5); // 建立長闊高都是 100，每邊由 5 個多邊形組成的方體
  const cubeMaterial = new THREE.MeshLambertMaterial({                      // 建立材質
    color: 0xffeeee,  // 顏色
    wireframe: true,  // 外框
  });
  const myAxis = new THREE.Vector3(0, 0, 1);  //設定Z軸
  box = new THREE.Mesh(cubeGeometry, cubeMaterial);  // 設定box的形狀及材質
  box.position.set(200, 150, -80);    // 設定box的位置
  box.rotateOnWorldAxis(myAxis, THREE.Math.degToRad(110));  // 旋轉
  scene.add(box);     // 把box加到場景



}

//canvas 畫面自訂義
// function resizeRendererToDisplaySize(renderer) {
//   const canvas = renderer.domElement;
//   const width = canvas.canvasWidth;
//   const height = canvas.canvasHeight;
//   const needResize = canvas.width !== width || canvas.height !== height;
//   if (needResize) {
//     renderer.setSize(width, height, false);
//   }
//   return needResize;
// }


//動畫執行
function animate() {
  requestAnimationFrame(animate);

  // if (resizeRendererToDisplaySize(renderer)) {}

  canvasHeight = document.getElementById("three").offsetHeight; // 重新取得長闊
  canvasWidth = document.getElementById("three").offsetWidth;
  renderer.setSize(canvasWidth, canvasHeight);        // 重設長闊
  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();    // 更新鏡頭視點

  box.rotation.y += 0.005;

  renderer.render(scene, camera);
}

init();
animate();