import path from 'path'
import fs from 'fs'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AOS - Portals',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: '//cdn.8thwall.com/web/aframe/8frame-1.3.0.min.js' },
      { src: '//cdn.8thwall.com/web/xrextras/xrextras.js' },
      { src: '//apps.8thwall.com/xrweb?appKey=' + process.env.API_8W },
      {
        src: '//cdn.8thwall.com/web/aframe/aframe-extras-6.1.1.min.js',
      },
      {
        src: 'https://unpkg.com/aframe-particle-system-component@1.0.x/dist/aframe-particle-system-component.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/layouts/global.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vue.js' }, { src: '~/plugins/aframe.js' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/dotenv'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.(glsl|vert|frag)$/,
        loader: 'raw-loader',
      })
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3443,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'dev.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'dev.crt')),
    },
  },
}
