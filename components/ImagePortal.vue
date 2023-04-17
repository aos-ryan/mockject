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
    <!-- UI -->
    <div id="overlay" class="absolute-fill">
      <div id="ui">
        <div id="reset-btn" class="bdr-ripple">
          <img class="ui-img" src="/textures/reset.png" />
        </div>
        <div id="recenter-btn" class="bdr-ripple">
          <img class="ui-img" src="/textures/recenter.png" />
        </div>
        <div id="info-btn" class="bdr-ripple">
          <img class="ui-img" src="/textures/info.png" />
        </div>
        <div id="sound-btn" class="bdr-ripple">
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

    <a-scene
      loading
      ui-controls
      xrextras-gesture-detector
      xrextras-runtime-error
      renderer="colorManagement: true"
    >
      <a-assets>
        <img id="skybox-img" src="/textures/skybox.jpg" />
        <audio
          id="organ"
          src="/sounds/PipeOrganCharge.wav"
          preload="auto"
        ></audio>
        <audio id="bat" src="/sounds/BaseballBat.wav" preload="auto"></audio>
        <audio
          id="crowd"
          src="/sounds/baseball-crowd.wav"
          preload="auto"
          loop="true"
        ></audio>
        <audio
          id="intro"
          src="/sounds/positive-correct.wav"
          preload="auto"
        ></audio>
        <audio
          id="select-sound"
          src="/sounds/positive-bling.wav"
          preload="auto"
        ></audio>
      </a-assets>

      <a-camera
        raycaster="objects: .cantap"
        cursor="fuse: false; rayOrigin: mouse;"
      ></a-camera>

      <a-entity image-target-portal="name: skybox-target" visible="false">
        <a-entity id="organFx" sound="src: #organ"></a-entity>
        <a-entity id="batFx" sound="src: #bat"></a-entity>
        <a-entity id="crowdFx" sound="src: #crowd"></a-entity>

        <a-ring
          id="portal"
          radius-inner="0.001"
          radius-outer="1000"
          xrextras-hider-material
        ></a-ring>

        <a-entity
          id="ball"
          gltf-model="/models/worn_baseball_ball.glb"
          class="cantap"
          rotate
          position="0 0 -10"
          scale="0.3 0.3 0.3"
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
  top: 25%;
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
  padding: 5% 20%;
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
.button.shimmer {
  color: grey;
  display: inline-block;
  -webkit-mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/300%
    100%;
  mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/300% 100%;
  background-repeat: no-repeat;
  animation: shimmer 2.5s infinite;
}

/* Modal styles */
.aos-logo {
  width: 36px;
  height: 31px;
  margin-bottom: 5%;
  opacity: 0;
  animation: fade-in 250ms linear 250ms 1 forwards;
}

#info-modal {
  display: none;
  z-index: 999;
  background-color: #000000;
  position: relative;
  margin: 40% auto;
  width: 80%;
  opacity: 0;
  padding-left: 5%;
  padding-right: 5%;
  border-radius: 5px;
  pointer-events: auto;
  animation: fade-in 250ms linear 1 forwards;
}

.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15%;
  user-select: none;
  opacity: 0;
  font-family: 'Plain';
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  animation: fade-in 250ms linear 500ms 1 forwards;
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
  opacity: 0;
  margin-top: 10%;
  margin-bottom: 10%;
  animation: fade-in 250ms linear 1000ms 1 forwards;
}
.close {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 34px;
  color: #ffffff;
}
/* Button Ripple */
.bdr-ripple {
  display: block;
  background: #ffffff00;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 100%;
  box-sizing: border-box;
  color: #666;
  overflow: hidden;
}
.bdr-ripple.active {
  background: #fff;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
.ripple {
  animation: at-ripple 0.6s linear 1;
}
@keyframes at-ripple {
  0% {
    box-shadow: 0 4px 10px rgba(234, 234, 234, 0.1),
      0 0 0 0 rgba(234, 234, 234, 0.1), 0 0 0 5px rgba(234, 234, 234, 0.1),
      0 0 0 10px rgba(234, 234, 234, 0.1);
  }
  100% {
    box-shadow: 0 4px 10px rgba(234, 234, 234, 0.1),
      0 0 0 5px rgba(234, 234, 234, 0.1), 0 0 0 10px rgba(234, 234, 234, 0.1),
      0 0 0 20px rgba(234, 234, 234, 0);
  }
}
@keyframes shimmer {
  100% {
    mask-position: left;
    -webkit-mask-position: left;
  }
}
</style>
