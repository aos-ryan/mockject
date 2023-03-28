import { OimoWorld, OimoBody } from '~/assets/js/physics-component.js'
// import CubeMapSceneComponent from '~/assets/js/cubemap-realtime.js'
import { createCollectible } from '~/assets/js/collectible.js'
import { updateScore } from '~/assets/js/updateScore.js'
import {
  portalCameraComponent,
  tapToPlacePortalComponent,
  promptFlowComponent,
  spinComponent,
} from '~/assets/js/portal.js'

AFRAME.registerComponent('create-collectible', createCollectible)
AFRAME.registerComponent('update-score', updateScore)

AFRAME.registerComponent('portal-camera', portalCameraComponent)
AFRAME.registerComponent('spin', spinComponent)
AFRAME.registerComponent('prompt-flow', promptFlowComponent)
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
