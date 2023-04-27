const imageTargetPortalComponent = () => ({
  schema: {
    name: { type: 'string' },
  },
  init() {
    const { object3D } = this.el
    const { name } = this.data
    object3D.visible = false
    // selects the portal
    const portal = this.el.sceneEl.querySelector('#portal')
    // selects the ball
    const ball = this.el.sceneEl.querySelector('#ball')
    // selects the sound effects

    const showImage = ({ detail }) => {
      if (name !== detail.name) {
        return
      }
      object3D.position.copy(detail.position)
      object3D.quaternion.copy(detail.rotation)
      object3D.scale.set(detail.scale, detail.scale, detail.scale)
      object3D.visible = true
    }
    const imageFound = (e) => {
      showImage(e)
      // portal animation
      setTimeout(() => {
        portal.setAttribute('animation__scaleIn', {
          property: 'radius-inner',
          dur: 1500,
          from: '0.001',
          to: '0.375',
          easing: 'easeOutElastic',
        })
      }, 200)
      // ball animation
      setTimeout(() => {
        ball.setAttribute('animation__moveOut', {
          property: 'position',
          dur: 2500,
          from: '0 0 -1',
          to: '0 0 0.5',
          easing: 'easeOutQuad',
        })
        ball.setAttribute('animation__scaleUp', {
          property: 'scale',
          dur: 2500,
          from: '0.3 0.3 0.3',
          to: '0.6 0.6 0.6',
          easing: 'easeOutQuad',
        })
      }, 2000)
    }
    const imageLost = (e) => {
      object3D.visible = false
    }
    this.el.sceneEl.addEventListener('xrimagefound', imageFound)
    this.el.sceneEl.addEventListener('xrimageupdated', showImage)
    this.el.sceneEl.addEventListener('xrimagelost', imageLost)
  },
})
export { imageTargetPortalComponent }
