<template>
  <div>
    <!-- UI -->
    <div id="overlay" class="absolute-fill">
      <div id="score-title">Score: <span id="score">0</span></div>
    </div>

    <!-- Scene -->
    <a-scene
      xrweb="allowedDevices: any;"
      renderer="colorManagement: true;"
      update-score
      oimo-world
    >
      <!-- Assets -->
      <a-assets>
        <!-- Models -->
        <!-- Textures -->
      </a-assets>

      <!-- Camera -->
      <a-camera
        id="camera"
        cursor="fuse: false; rayOrigin: mouse;"
        raycaster="objects: .collidible"
        position="0 2 0"
        collider-check
      >
      </a-camera>

      <!-- Lights -->
      <a-light intensity="1" position="31 13 7.5"> </a-light>

      <!-- Entities -->

      <a-entity
        create-collectible="position: 4 6 -4; value: 1"
        oimo-body="move: true"
      >
      </a-entity>

      <a-entity
        create-collectible="position: 1 4 -6; radius: 2; value: 3"
        oimo-body="move: true"
      >
      </a-entity>

      <a-box
        id="ground"
        scale="100 1 100"
        position="0 0 0"
        oimo-body="move: false"
      ></a-box>
    </a-scene>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.absolute-fill {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}
#score-title {
  position: absolute;
  z-index: 11;
  top: 0;
  bottom: 2vh;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 4rem;
  pointer-events: none;
}
</style>
