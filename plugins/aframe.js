import {
  portalCameraComponent,
  tapToPlacePortalComponent,
  spinComponent,
  promptFlowComponent,
} from '~/assets/js/portal.js'
import { imageTargetPortalComponent } from '~/assets/js/imagePortal'

import { loadingComponent } from '~/assets/js/loading'

import { uiControls } from '~/assets/js/uiControls'
import { rotateComponent } from '~/assets/js/rotate'
import { particleControllerComponent } from '~/assets/js/particleController'

AFRAME.registerComponent('portal-camera', portalCameraComponent)
AFRAME.registerComponent('prompt-flow', promptFlowComponent)
AFRAME.registerComponent('spin', spinComponent)
AFRAME.registerComponent('tap-to-place-portal', tapToPlacePortalComponent)
AFRAME.registerComponent('auto-play-video', {
  schema: {
    video: { type: 'string' },
  },
  init() {
    const v = document.querySelector(this.data.video)
    v.play()
  },
})

AFRAME.registerComponent('image-target-portal', imageTargetPortalComponent())
AFRAME.registerComponent('loading', loadingComponent)
AFRAME.registerComponent('ui-controls', uiControls)

AFRAME.registerComponent('rotate', rotateComponent)
AFRAME.registerComponent('particle-controller', particleControllerComponent)

// Custom geometry for tetra
AFRAME.registerGeometry('tetra', {
  schema: {},
  init: function (data) {
    let geometry = new THREE.BufferGeometry()
    const points = [
      new THREE.Vector3(-1, 1, -1), //c
      new THREE.Vector3(-1, -1, 1), //b
      new THREE.Vector3(1, 1, 1), //a

      new THREE.Vector3(1, 1, 1), //a
      new THREE.Vector3(1, -1, -1), //d
      new THREE.Vector3(-1, 1, -1), //c

      new THREE.Vector3(-1, -1, 1), //b
      new THREE.Vector3(1, -1, -1), //d
      new THREE.Vector3(1, 1, 1), //a

      new THREE.Vector3(-1, 1, -1), //c
      new THREE.Vector3(1, -1, -1), //d
      new THREE.Vector3(-1, -1, 1), //b
    ]

    geometry.setFromPoints(points)
    geometry.computeVertexNormals()
    this.geometry = geometry
  },
})
