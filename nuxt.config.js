const isDev = process.env.NODE_ENV === 'production'
const useEmulators = false // manually change if emulators needed

export default {
  //mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Learn to write macro with excel vba and boost your data analysis career', //|| process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Learn to write macro with excel vba and boost your data analysis career' } //process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: 'blue',
    height: '5px'
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/vue-core-video-player.js', mode: 'client'},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // 'nuxt-composition-api',
    '@nuxtjs/firebase',
    '@nuxtjs/composition-api/module'
  ],

  firebase: {
    lazy: false,
    config: {
      apiKey: 'AIzaSyBvQ1QlHAwZ91Vk7Hg2w2d1mzaUdbv62gs',
      authDomain: 'vba-sensei.firebaseapp.com',
      projectId: 'vba-sensei',
      storageBucket: 'vba-sensei.appspot.com',
      messagingSenderId: '487786726058',
      appId: '1:487786726058:web:49c009d2171e6de44ac6d3',
      measurementId: 'G-GSS4RP019D'
    },
    onFirebaseHosting: false,
    terminateDatabasesAfterGenerate: true,
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChanged',
          subscribeManually: false
        },
        ssr: true,
        emulatorPort: isDev && useEmulators ? 9099 : undefined,
        disableEmulatorWarnings: false,
      },
      database: {
        emulatorPort: isDev && useEmulators ? 9000 : undefined,
      },
      storage: true,
    }
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      '@nuxtjs/axios',
     // '@nuxtjs/auth',
    ]
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
    //transpile: ['@nuxtjs/auth']
  },
  generate: {
    // choose to suit your project
    interval: 2000,
  },
  axios: {
    baseURL: 'http://165.227.94.31:8000/bizops/'
  },
  router: {
    // middleware: ['auth']
    extendRoutes(routes, resolve) {
      // routes.push({
      //   name: 'custom',
      //   path: '*',
      //   component: resolve(__dirname, 'pages/404.vue')
      // })
    },
    beforeEach(to, from, next) {
      alert('About to enter another route!')
      // if (to.matched.some(record => record.meta.requiresAuth)) {
      //   // this route requires auth, check if logged in
      //   // if not, redirect to login page.
      //   if (!auth.loggedIn()) {
      //     next({
      //       path: '/login',
      //       query: { redirect: to.fullPath }
      //     })
      //   } else {
      //     next()
      //   }
      // } else {
      //   next() // make sure to always call next()!
      // }
    }
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
    // redirect: {
    //   login: '/signin',
    //   logout: '/',
    //   callback: '/signin',
    //   home: '/'
    // }


  }

