import {
  portalCameraComponent,
  tapToPlacePortalComponent,
  spinComponent,
  promptFlowComponent,
} from '~/assets/js/portal.js'
import { imageTargetPortalComponent } from '~/assets/js/imagePortal'

import { loadingComponent } from '~/assets/js/loading'

import { uiControls } from '~/assets/js/uiControls'

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
