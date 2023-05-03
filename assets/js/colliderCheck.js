const colliderCheck = {
  dependencies: ['raycaster'],

  init: function () {
    const tetra = this.el.sceneEl.querySelector('#tetra')

    this.el.addEventListener('raycaster-intersection', () => {
      console.log('player hit something!')

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
      tetra.addEventListener('animationcomplete__shrink', () => {
        const humSound = document.getElementById('positional-hum')
        humSound.components.sound.stopSound()

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
        this.el.sceneEl.appendChild(explosion)
      })
    })
  },
}
export { colliderCheck }
