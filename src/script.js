(function(){

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var loader = new THREE.ColladaLoader();
  var renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

  camera.position.z = 5;

  loader.load("test.dae", function (result) {
      scene.add(result.scene);
  });

  function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
  }
  render();

})();