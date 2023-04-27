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
import { tetraComponent } from '~/assets/js/tetra'

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

// Custom shader for tetra
AFRAME.registerComponent('tetra', tetraComponent)
AFRAME.registerShader('grid-glitch', {
  schema: {
    color: { type: 'color', is: 'uniform' },
    timeMsec: { type: 'time', is: 'uniform' },
  },

  vertexShader: `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`,
  fragmentShader: `
varying vec2 vUv;
uniform vec3 color;
uniform float timeMsec; // A-Frame time in milliseconds.

void main() {
  float time = timeMsec / 1000.0; // Convert from A-Frame milliseconds to typical time in seconds.
  // Use sin(time), which curves between -1 and 1 over time,
  // to determine the mix of two colors:
  //    (a) Base color.
  //    (b) Semi-transparent color.
  //
  // The color itself is a vec4 containing RGBA values 0-1.

  // Pulsating value created by sin function
  float pulse = 0.5 + 0.5 * sin(time * 1.0);

  // Add a small positive offset to the pulsating value to ensure
  // that the base color never becomes completely black
  pulse = 0.1 + 0.9 * pulse;

  // Modify the base color to create a pulsating effect
  vec4 baseColor = vec4(color, 1.0);
  baseColor.rgb *= pulse;

  // Create a semi-transparent color by setting the alpha channel to 0.5
  vec4 transparentColor = vec4(color, 0.5);

  gl_FragColor = mix(
    baseColor,
    transparentColor,
    pulse // Use the pulsating value to determine the mix of colors
  );
}
`,
})
