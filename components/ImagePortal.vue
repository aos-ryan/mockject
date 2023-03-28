<template>
  <div>
    <a-scene
      xrextras-loading
      xrextras-runtime-error
      renderer="colorManagement: true"
      xrweb="allowedDevices: any; disableDefaultEnvironment: true"
    >
      <a-assets>
        <img id="skybox-img" src="/textures/skybox.jpg" />
        <img id="earth-tex" src="/textures/earth.jpg" />
      </a-assets>

      <a-camera></a-camera>

      <a-entity image-target-portal="name: skybox-target" visible="false">
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
          geometry="primitive: sphere"
          material="src: #earth-tex"
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
div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
