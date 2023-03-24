const createCollectible = {
  schema: {
    position: { type: 'vec3' },
    value: { type: 'number', default: 1 },
    radius: { type: 'int', default: 1 },
  },
  init() {
    // reference to the element
    const collectible = this.el
    // create the geometry and material
    const collectibleGeo = new THREE.SphereGeometry(this.data.radius, 32, 32)
    const collectibleMat = new THREE.PointsMaterial({
      size: 0.02,
    })
    // Add an event listenr for when the element is interacted with that emits the score event
    // and removes the entity from the scene
    collectible.addEventListener('animationcomplete__intersected', (e) => {
      collectible.emit('item-collected', { collectedWorth: this.data.value })
      collectible.parentNode.removeChild(collectible)
    })

    // set the mesh of the entity to the geo and material we created
    collectible.setObject3D(
      'mesh',
      new THREE.Points(collectibleGeo, collectibleMat)
    )

    // set attributes of the a-frame entity component based on passed properties
    collectible.setAttribute('position', this.data.position)
    collectible.setAttribute('class', 'collidible')

    // set the animation attributes to handle the rotation, click, and collected states
    collectible.setAttribute('animation', {
      property: 'rotation',
      from: { x: 0, y: 0, z: 0 },
      to: { x: 0, y: 360, z: 0 },
      loop: true,
      dur: 10000,
      easing: 'linear',
    })

    // this is a fake "explosion" effect by animating the scale up, to be replaced
    collectible.setAttribute('animation__intersected', {
      property: 'scale',
      to: { x: 10, y: 10, z: 10 },
      dur: 300,
      startEvents: 'click',
    })
  },
}
export { createCollectible }
