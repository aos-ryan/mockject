<template>
  <div id="ar-div">
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
    <a-scene loading xrextras-runtime-error renderer="colorManagement: true">
      <a-assets>
        <img id="skybox-img" src="/textures/skybox.jpg" />
        <audio
          id="organ"
          src="/sounds/PipeOrganCharge.wav"
          preload="auto"
        ></audio>
        <audio id="bat" src="/sounds/BaseballBat.wav" preload="auto"></audio>
      </a-assets>

      <a-camera></a-camera>

      <a-entity image-target-portal="name: skybox-target" visible="false">
        <a-entity id="organFx" sound="src: #organ"></a-entity>
        <a-entity id="batFx" sound="src: #bat"></a-entity>

        <a-ring
          id="portal"
          radius-inner="0.001"
          radius-outer="1000"
          xrextras-hider-material
        ></a-ring>

        <a-entity
          look-controls
          id="ball"
          position="0 0 -10"
          scale="0.3 0.3 0.3"
          gltf-model="/models/worn_baseball_ball.glb"
          reflections="type: static"
        >
        </a-entity>

        <a-sky
          rotation="0 90 0"
          scale="0.015 0.015 -0.015"
          src="#skybox-img"
        ></a-sky>
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

.button {
  height: auto;
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 14px;
  color: #e6e6e6;
  user-select: none;
}
</style>
