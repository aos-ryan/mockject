<template>
  <div id="ar-div">
    <!-- Loading Modal -->
    <div id="loading-modal">
      <div id="loading-modal-content">
        <video
          id="intro-video"
          muted
          autoplay
          playsinline
          crossorigin="anonymous"
          loop="true"
          src="/textures/loading.mp4"
        ></video>
        <div id="start" class="button">
          Now loading an Array of Stars Experience
        </div>
      </div>
      <div id="disclaimer">
        This prototype demonstrates augmented reality functionality and
        potential.<br />It is not related to client work.
      </div>
    </div>
    <!-- UI -->
    <div id="overlay" class="absolute-fill">
      <div id="ui">
        <div id="reset-btn">
          <img class="ui-img" src="/textures/reset.png" />
        </div>
        <div id="recenter-btn">
          <img class="ui-img" src="/textures/recenter.png" />
        </div>
        <div id="info-btn">
          <img class="ui-img" src="/textures/info.png" />
        </div>
        <div id="sound-btn">
          <img class="ui-img" src="/textures/audio.png" />
        </div>
      </div>
      <span id="promptText"></span>
      <!-- Info modal -->
      <div id="info-modal">
        <div id="close-modal" class="close">&times;</div>
        <div class="modal-body">
          <img class="aos-logo" src="/textures/aos-logo.png" />
          Array of Stars creates enhanced experiences built for attention across
          virtual, digital, and physical realities.
          <a href="https://www.arrayofstars.com" class="cta"> Learn More </a>
        </div>
      </div>
    </div>

    <!-- Scene -->
    <a-scene
      loading
      ui-controls
      xrextras-runtime-error
      renderer="colorManagement: true;"
      tap-to-place-portal
      prompt-flow
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
      <a-camera id="camera" position="0 9 9" portal-camera> </a-camera>
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

      <!-- Portal Contents -->
      <a-entity id="portal-contents">
        <a-entity
          id="floor"
          gltf-model="/models/moon_floor.glb"
          scale="0.1 0.1 0.1"
          position="-20 -10 0"
        >
        </a-entity>

        <!-- Skybox -->
        <a-entity
          gltf-model="/models/sky_model.glb"
          scale="100 100 100"
        ></a-entity>

        <!-- Planet -->
        <a-entity
          gltf-model="/models/planet_earth.glb"
          position="-10 15 -75"
          scale="10 10 10"
          spin="speed: 16000"
        ></a-entity>
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
.hidden {
  display: none !important;
}

#ar-div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#loading-modal {
  z-index: 998;
  height: 100%;
  background-color: #000000;
  position: relative;
}
#loading-modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15%;
}
#start {
  font-family: 'Plain';
  pointer-events: none;
}
#disclaimer {
  font-family: 'Plain';
  user-select: none;
  color: white;
  font-size: 10px;
  padding: 5%;
  text-align: center;
  position: absolute;
  bottom: 5%;
}

#intro-video {
  width: 100vw;
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

#ui {
  display: none;
  position: absolute;
  z-index: 5;
  left: 7vh;
  bottom: 5vh;
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
  pointer-events: auto;
}

.ui-img {
  width: 30px;
  height: 30px;
}

.aos-logo {
  width: 36px;
  height: 31px;
  margin-bottom: 5%;
}

#promptText {
  font-family: 'Plain';
  font-size: 14px;
  text-align: center;
  color: white;

  position: absolute;
  width: 100%;
  bottom: 12vh;
  left: 50%;
  transform: translate(-50%, 0);
}
.button {
  height: auto;
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 14px;
  color: #e6e6e6;
  user-select: none;
}

/* Modal styles */

#info-modal {
  display: none;
  z-index: 999;
  background-color: #000000;
  position: relative;
  margin: 40% auto;
  width: 80%;
  padding-left: 5%;
  padding-right: 5%;
  border-radius: 5px;
  pointer-events: auto;
}
.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15%;
  user-select: none;

  font-family: 'Plain';
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
}
.cta {
  background-color: #ffffff;
  color: #000000;
  font-family: 'Monument Extended';
  font-size: 14px;
  text-transform: uppercase;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 20px;

  margin-top: 10%;
  margin-bottom: 10%;
}

.close {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 34px;
  color: #ffffff;
}

.fly-in {
  animation: fly-in 1.5s ease-out both;
}
@keyframes fly-in {
  0% {
    transform: translate(-100%, 0%);
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
}
.fly-out {
  animation: fly-out 1.5s ease-out both;
}
@keyframes fly-out {
  0% {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    transform: translate(0%, 0%);
    opacity: 0;
  }
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
