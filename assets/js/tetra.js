const tetraComponent = {
  init() {
    const el = this.el

    // create geometry
    this.geometry = new THREE.ConeGeometry(1, 2, 3)

    // create mesh
    this.mesh = new THREE.Mesh(this.geometry)

    el.setObject3D('mesh', this.mesh)
  },
}

export { tetraComponent }
