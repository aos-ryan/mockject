<template>
  <div>
    <!-- UI -->
    <div id="overlay" class="absolute-fill">
      <div id="score-title">Score: <span id="score">0</span></div>
      <img id="recenterButton" src="/textures/recenter.png" />
    </div>

    <!-- Scene -->
    <a-scene
      xrweb="allowedDevices: any; disableDefaultEnvironment: true"
      renderer="colorManagement: true;"
      tap-to-place-portal
      update-score
      inspector
    >
      <!-- Assets -->
      <a-assets>
        <!-- Textures -->
        <video
          id="portal-video"
          muted
          autoplay
          playsinline
          crossorigin="anonymous"
          loop="true"
          src="/textures/portal-video.mp4"
        ></video>
        <img id="skybox-img" src="/textures/skybox.jpg" />
      </a-assets>

      <!-- Camera -->
      <a-camera
        id="camera"
        cursor="fuse: false; rayOrigin: mouse;"
        raycaster="objects: .collidible"
        position="0 9 11"
        portal-camera
        collider-check
      >
      </a-camera>
      <!-- Hider walls -->
      <xrextras-opaque-background remove="true">
        <a-entity id="hider-walls">
          <a-box
            scale="100 1 100"
            position="0 -1 49"
            xrextras-hider-material
          ></a-box>
          <a-box
            scale="100 100 1"
            position="0 50 75"
            xrextras-hider-material
          ></a-box>
          <a-box
            scale="100 1 100"
            position="0 100 49"
            xrextras-hider-material
          ></a-box>
          <a-box
            scale="1 100 100"
            position="-30 50 50"
            xrextras-hider-material
          ></a-box>
          <a-box
            scale="1 100 100"
            position="30 50 50"
            xrextras-hider-material
          ></a-box>
          <a-ring
            id="portalHiderRing"
            radius-inner="0.001"
            radius-outer="100"
            position="0 7.5 -0.2"
            xrextras-hider-material
          ></a-ring>
        </a-entity>

        <a-entity id="portal-wall">
          <a-circle
            radius="5.2"
            rotation="0 180 0"
            position="0 7.5 0"
            scale="0.8 0.8 0"
            xrextras-hider-material
          ></a-circle>
          <a-circle
            radius="5.2"
            rotation="0 180 0"
            position="0 7.5 0.25"
            scale="0.8 0.8 0"
            xrextras-hider-material
          ></a-circle>
        </a-entity>
      </xrextras-opaque-background>
      <!-- Lights -->
      <a-entity
        light="
      type: directional;
      castShadow: true;
      shadowMapHeight:2048;
      shadowMapWidth:2048;
      shadowCameraTop: 35;
      shadowCameraBottom: -20;
      shadowCameraRight: 40;
      shadowCameraLeft: -10;
      target: #portalRim"
        xrextras-attach="target: portalRim; offset: 18 7 14"
        shadow
      >
      </a-entity>

      <a-light type="ambient" intensity="0.3"></a-light>

      <!-- Entities -->
      <a-entity id="portal-contents">
        <a-entity create-collectible="position: 8 9 -15; value: 1"> </a-entity>

        <a-entity
          create-collectible="position: -6 9 -11; value: 3"
          scale="2 2 2"
        >
        </a-entity>
        <!-- Skybox -->
        <a-sky src="#skybox-img" rotation="0 7 0"></a-sky>
      </a-entity>

      <!-- Portal -->
      <a-entity
        id="portalRim"
        gltf-model="/models/portal.glb"
        spin="axis: x; speed: 14000"
        reflections="type: realtime"
        position="0 7.5 0"
        rotation="90 -90 -90"
        scale="0.001 0.001 0.001"
        shadow="receive: false"
      >
      </a-entity>
      <a-entity
        id="portalVideo"
        auto-play-video="video: #portal-video"
        material="shader: flat; src: #portal-video; blending: additive; side: front; transparent: true"
        geometry="primitive: plane; height: 1; width: 1;"
        position="0 7.5 0.1"
        scale="0.001 0.001 0.001"
      >
      </a-entity>
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

#recenterButton {
  position: absolute;
  z-index: 5;
  left: 2vh;
  bottom: 2vh;
  max-width: 50px;
  pointer-events: auto;
}
.pulse-once {
  animation: pulse-once 0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) both;
}
@keyframes pulse-once {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>
