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
import { glowingStars } from '~/assets/js/stars'
import { explosion } from '~/assets/js/explosion'

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
AFRAME.registerComponent('glowing-stars', glowingStars)

AFRAME.registerComponent('rotate', rotateComponent)
AFRAME.registerComponent('explode', explosion)

// Custom shader for pulse effect
AFRAME.registerShader('pulse', {
  schema: {
    color: { type: 'color', is: 'uniform' },
    timeMsec: { type: 'time', is: 'uniform' },
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    varying vec2 vUv;
    uniform vec3 color;
    uniform float timeMsec; // A-Frame time in milliseconds.

    // Simplex noise function from GLSL simplex noise library
    // Returns a value between -1.0 and 1.0
    float noise(vec2 pos) {
      return 0.5 * (1.0 + sin(dot(pos, vec2(12.9898, 78.233))));
    }

    void main() {
      float time = timeMsec / 1000.0; // Convert from A-Frame milliseconds to typical time in seconds.

      // Generate a random pulsating value using simplex noise
      float randomValue = 0.5 + 0.5 * noise(vec2(time * 2.0, time * 3.0));

      // Modify the base color to create a pulsating effect
      vec4 baseColor = vec4(color, 1.0);
      baseColor.rgb *= randomValue;

      // Create a semi-transparent color by setting the alpha channel to 0.5
      vec4 transparentColor = vec4(color, 0.5);

      gl_FragColor = mix(
        baseColor,
        transparentColor,
        randomValue // Use the pulsating value to determine the mix of colors
      );
    }
  `,
})

// flicker shader with hard edges
AFRAME.registerShader('depth', {
  schema: {
    color: { type: 'color', is: 'uniform' },
    timeMsec: { type: 'time', is: 'uniform' },
  },
  vertexShader: `

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  fragmentShader: `
  varying vec2 vUv;

  void main() {
    float depth = vUv.y; // Use the Y coordinate of the UV map as depth
    gl_FragColor = vec4(vec3(depth), 1.0); // Use depth as the color
  }
  `,
})

// custom shader for flicker effect
AFRAME.registerShader('flicker', {
  schema: {
    color: { type: 'color', is: 'uniform' },
    timeMsec: { type: 'time', is: 'uniform' },
  },

  vertexShader: `
    varying vec2 vUv;

    // Define a varying for the transformed normal
    varying vec3 vNormal;

    void main() {
      vUv = uv;

      // Transform the normal vector by the model-view matrix
      vNormal = normalize(normalMatrix * normal);

      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,

  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform vec3 color;
    uniform float timeMsec;

    void main() {
      float time = timeMsec / 1000.0;

      float period = 5.0 + 5.0 * sin(time / 10.0);
      float pulse = 0.5 + 0.5 * sin(time / period);

      vec4 baseColor = vec4(color, 1.0);
      baseColor.rgb *= pulse;

      vec4 transparentColor = vec4(color, 0.5);

      // Calculate the amount of edge highlighting based on the angle between the normal and the view vector
      float edgeHighlight = max(0.0, dot(normalize(vNormal), normalize(-vec3(gl_FragCoord))));
      edgeHighlight = pow(edgeHighlight, 10.0);

      // Add the edge highlighting to the base color
      baseColor.rgb += edgeHighlight;

      gl_FragColor = mix(
        baseColor,
        transparentColor,
        pulse
      );
    }
  `,
})
