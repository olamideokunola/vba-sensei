
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/vue-core-video-player.js', mode: 'client'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-composition-api'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/firebase',
    {
      config: {
        apiKey: 'AIzaSyBvQ1QlHAwZ91Vk7Hg2w2d1mzaUdbv62gs',
        authDomain: 'vba-sensei.firebaseapp.com',
        projectId: 'vba-sensei',
        storageBucket: 'vba-sensei.appspot.com',
        messagingSenderId: '487786726058',
        appId: '1:487786726058:web:49c009d2171e6de44ac6d3',
        measurementId: 'G-GSS4RP019D'
      },
      services: {
        auth: true, // Just as example. Can be any other service.
        database: true,
        functions: true,
      }
    }
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    transpile: ['@nuxtjs/auth']
  },
  generate: {
    // choose to suit your project
    interval: 2000,
  },
  axios: {
    baseURL: 'http://165.227.94.31:8000/bizops/'
  },
  router: {
    middleware: ['auth']
  },

  // Firebase Auth:
  auth: {
    persistence: 'local', // default
    initialize: {
      onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
      onAuthStateChangedAction: 'onAuthStateChangedAction',
      subscribeManually: false
    },
    ssr: false, // default
    emulatorPort: 9099,
    emulatorHost: 'http://localhost',
  },
  
  // Nuxt Auth:
  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: '/login/', method: 'post', propertyName: 'token' },
  //         // logout: { url: '/api/auth/logout', method: 'post' },
  //         user: { url: '/users/', method: 'get', propertyName: 'user' }
  //       },
  //       tokenRequired: true,
  //       tokenType: 'bearer',
  //       globalToken: true,
  //       // autoFetchUser: true
  //     },
  //     customStrategy: {
  //       _scheme: '~/schemes/customScheme',
  //       endpoints: {
  //         login: { url: '/login/', method: 'post', propertyName: 'token' },
  //         logout: false, // { url: '/api/auth/logout', method: 'post' },
  //         user: { url: '/users/', method: 'get', propertyName: 'user' }
  //       },
  //       tokenRequired: true,
  //       tokenType: 'bearer',
  //       globalToken: true,
  //       // autoFetchUser: true
  //     }
  //   },
    redirect: {
      login: '/signin',
      logout: '/',
      callback: '/signin',
      home: '/'
    }
  }

