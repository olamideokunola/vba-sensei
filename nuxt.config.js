
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
    '@nuxtjs/auth'
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
    baseURL: 'http://192.168.43.6:8000/bizops/'
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login/', method: 'post', propertyName: 'token' },
          // logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/users/', method: 'get', propertyName: 'user' }
        },
        tokenRequired: true,
        tokenType: 'bearer',
        globalToken: true,
        // autoFetchUser: true
      },
      customStrategy: {
        _scheme: '~/schemes/customScheme',
        endpoints: {
          login: { url: '/login/', method: 'post', propertyName: 'token' },
          logout: false, // { url: '/api/auth/logout', method: 'post' },
          user: { url: '/users/', method: 'get', propertyName: 'user' }
        },
        tokenRequired: true,
        tokenType: 'bearer',
        globalToken: true,
        // autoFetchUser: true
      }
    },
    redirect: {
      login: '/signin',
      logout: '/',
      callback: '/signin',
      home: '/'
    }
  }
}
