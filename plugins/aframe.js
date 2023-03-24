import { OimoWorld, OimoBody } from '~/assets/js/physics-component.js'
// import CubeMapSceneComponent from '~/assets/js/cubemap-realtime.js'

AFRAME.registerComponent('oimo-world', OimoWorld)
AFRAME.registerComponent('oimo-body', OimoBody)
// AFRAME.registerComponent('cubemap-scene', CubeMapSceneComponent)

import { createCollectible } from '~/assets/js/collectible.js'
import { updateScore } from '~/assets/js/updateScore.js'

AFRAME.registerComponent('create-collectible', createCollectible)
AFRAME.registerComponent('update-score', updateScore)
