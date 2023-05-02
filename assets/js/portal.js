const portalCameraComponent = {
  schema: {
    width: { default: 10 },
    height: { default: 10 },
  },
  init() {
    this.camera = this.el
    this.contents = document.getElementById('portal-contents')
    this.walls = document.getElementById('hider-walls')
    this.portalWall = document.getElementById('portal-wall')
    this.isInPortalSpace = false
    this.wasOutside = true
  },
  tick() {
    const { position } = this.camera.object3D
    const isOutside = position.z > 0
    const withinPortalBounds =
      position.y < this.data.height &&
      Math.abs(position.x) < this.data.width / 2
    if (this.wasOutside !== isOutside && withinPortalBounds) {
      this.isInPortalSpace = !isOutside
    }
    this.contents.object3D.visible = this.isInPortalSpace || isOutside
    this.walls.object3D.visible = !this.isInPortalSpace && isOutside
    this.portalWall.object3D.visible = this.isInPortalSpace && !isOutside
    this.wasOutside = isOutside
  },
}
const tapToPlacePortalComponent = {
  init() {
    const { sceneEl } = this.el
    this.camera = document.getElementById('camera')
    this.contents = document.getElementById('portal-contents')
    this.walls = document.getElementById('hider-walls')
    this.portalWall = document.getElementById('portal-wall')

    this.isInPortalSpace = false
    this.wasOutside = true
    const portalHiderRing = this.el.sceneEl.querySelector('#portalHiderRing')
    const portalRim = this.el.sceneEl.querySelector('#portalRim')
    const outerRim = this.el.sceneEl.querySelector('#outerRim')
    const tetra = this.el.sceneEl.querySelector('#tetra')
    const humSound = document.getElementById('positional-hum')

    const firstPlaceEvent = (e) => {
      sceneEl.emit('recenter')
      sceneEl.emit('dismissPrompt')

      portalHiderRing.setAttribute('animation__1', {
        property: 'radius-inner',
        dur: 400,
        from: '0.001',
        to: '6.9',
        easing: 'linear',
      })
      portalRim.setAttribute('animation__2', {
        property: 'scale',
        dur: 500,
        from: '0.001 0.001 0.001',
        to: '2 2 2',
        easing: 'linear',
      })
      tetra.setAttribute('animation__move', {
        property: 'position',
        to: {
          y: 8,
        },
        dir: 'alternate',
        loop: true,
        easing: 'easeInOutCubic',
      })
      tetra.addEventListener('animationcomplete__shrink', (e) => {
        const explosion = document.createElement('a-entity')
        explosion.setAttribute('explode', true)
        explosion.setAttribute('position', { x: 0, y: 6, z: -7 })
        explosion.setAttribute('animation__scaleup', {
          property: 'scale',
          dur: 500,
          from: '0.001 0.001 0.001',
          to: '1 1 1',
          easing: 'linear',
        })
        this.el.appendChild(explosion)
      })
      setTimeout(() => {
        tetra.setAttribute('animation__shrink', {
          property: 'scale',
          to: {
            x: 0,
            y: 0,
            z: 0,
          },
          dur: 1000,
          easing: 'linear',
        })
      }, 5000)
      humSound.components.sound.playSound()
      sceneEl.removeEventListener('click', firstPlaceEvent)
    }
    sceneEl.addEventListener('click', firstPlaceEvent)
  },
}
const promptFlowComponent = {
  init() {
    this.prompt = document.getElementById('promptText')
    this.overlay = document.getElementById('overlay')
    this.el.sceneEl.addEventListener('realityready', () => {
      this.overlay.style.display = 'block'
      this.prompt.innerHTML = 'Tap to Place<br>Portal'
      this.prompt.classList.add('fly-in')
    })
    this.el.addEventListener('dismissPrompt', () => {
      this.prompt.classList.remove('fly-in')
      this.prompt.classList.add('fly-out')
    })
  },
}
const spinComponent = {
  schema: {
    speed: { default: 2000 },
    direction: { default: 'normal' },
    axis: { default: 'y' },
    dual: { default: false },
  },
  init() {
    const { el } = this
    el.setAttribute('animation__spin', {
      property: `object3D.rotation.${this.data.axis}`,
      from: 0,
      to: 360,
      dur: this.data.speed,
      dir: this.data.direction,
      loop: true,
      easing: 'linear',
    })
    if (this.data.dual) {
      el.setAttribute('animation__spinx', {
        property: `object3D.rotation.x`,
        from: 0,
        to: 360,
        dur: this.data.speed,
        dir: this.data.direction,
        loop: true,
        easing: 'linear',
      })
    }
  },
}
export {
  portalCameraComponent,
  tapToPlacePortalComponent,
  promptFlowComponent,
  spinComponent,
}
