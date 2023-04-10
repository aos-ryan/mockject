const loadingComponent = {
  schema: {
    disableWorldTracking: { type: 'bool', default: false },
    requestGyro: { type: 'bool', default: false },
  },
  init() {
    const loadingModal = document.getElementById('loading-modal')
    const start = document.getElementById('start')

    setTimeout(() => {
      start.innerHTML = 'Tap to begin'
      start.style.pointerEvents = 'auto'
      start.style.fontFamily = 'Monument Extended'
    }, 5000)

    const addXRWeb = () => {
      if (
        this.data.requestGyro === true &&
        this.data.disableWorldTracking === true
      ) {
        // If world tracking is disabled, and you still want gyro enabled (i.e. 3DoF mode)
        // Request motion and orientation sensor via XR8's permission API
        XR8.addCameraPipelineModule({
          name: 'request-gyro',
          requiredPermissions: () => [
            XR8.XrPermissions.permissions().DEVICE_ORIENTATION,
          ],
        })
      }
      this.el.sceneEl.setAttribute(
        'xrweb',
        `allowedDevices: any; disableDefaultEnvironment: false; disableWorldTracking: ${this.data.disableWorldTracking}`
      )
      loadingModal.classList.add('hidden')
    }
    start.onclick = addXRWeb
  },
}
export { loadingComponent }
