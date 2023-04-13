const uiControls = {
  init() {
    const uis = document.querySelectorAll('#ui')
    const resetBtn = document.getElementById('reset-btn')
    const recenterBtn = document.getElementById('recenter-btn')
    const soundBtn = document.getElementById('sound-btn')
    const infoBtn = document.getElementById('info-btn')
    const modal = document.getElementById('info-modal')
    const closeBtn = document.getElementById('close-modal')

    const selectSound = document.getElementById('select-sound')

    this.el.sceneEl.addEventListener('realityready', () => {
      // When reality is ready (scene loaded) display the UI controls
      uis.forEach((ui) => {
        ui.style.display = 'flex'
      })
    })
    // Repositions the camera to the origin / facing direction from updateCameraProjectionMatrix
    recenterBtn.addEventListener('click', (e) => {
      selectSound.play()
      recenterBtn.classList.add('ripple')
      XR8.XrController.recenter()
    })
    recenterBtn.addEventListener('animationend', (e) => {
      selectSound.play()
      recenterBtn.classList.remove('ripple')
    })
    // handle clicking audio button
    soundBtn.addEventListener('click', (e) => {
      console.log('audio toggled')
    })
    // Reset the experience at any stage
    resetBtn.addEventListener('click', (e) => {
      selectSound.play()
      resetBtn.classList.add('ripple')
      location.reload()
    })
    infoBtn.addEventListener('click', (e) => {
      selectSound.play()
      modal.style.display = 'block'
      infoBtn.classList.add('active')
      infoBtn.classList.add('ripple')
    })

    // Add event listener to close the modal
    closeBtn.addEventListener('click', (e) => {
      infoBtn.classList.remove('active')
      infoBtn.classList.remove('ripple')
      modal.style.display = 'none'
    })
  },
}
export { uiControls }
