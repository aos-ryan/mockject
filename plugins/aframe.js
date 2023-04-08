import { OimoWorld, OimoBody } from '~/assets/js/physics-component.js'
// import CubeMapSceneComponent from '~/assets/js/cubemap-realtime.js'
import { createCollectible } from '~/assets/js/collectible.js'
import { updateScore } from '~/assets/js/updateScore.js'
import {
  portalCameraComponent,
  tapToPlacePortalComponent,
  spinComponent,
  promptFlowComponent,
} from '~/assets/js/portal.js'
import { imageTargetPortalComponent } from '~/assets/js/imagePortal'
import { startPractice } from '~/assets/js/startPractice'
import { loadingComponent } from '~/assets/js/loading'

AFRAME.registerComponent('create-collectible', createCollectible)
AFRAME.registerComponent('update-score', updateScore)
AFRAME.registerComponent('start-practice', startPractice)

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
