
export default {
  mode: 'spa',
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
    script: [
      { src: 'https://code.jquery.com/jquery-1.12.4.min.js', defer: 'true', rel: 'preload' },
      // { src: 'https://cdnjs.com/libraries/pdf.js', defer: 'true', rel: 'preload' },
      { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js', integrity: 'sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl', crossorigin: 'anonymous', defer: 'true', rel: 'preload' }
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js', defer: 'true', rel:'preload'}
    ],
    link: [
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#6cc2ec', height: '2px', time: 500000, continuous: 'false' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/assets/base.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vuelidate',
    '~/plugins/editortemplates',
    '~/plugins/mixins',
    '~/plugins/commonplugins'
  ],
  /*
    Nuxt.js dev-modules
    eslint doc: https://github.com/nuxt-community/eslint-module
  */
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  /*
    Nuxt.js modules
    bootstrap doc: https://bootstrap-vue.js.org
    axios doc: https://axios.nuxtjs.org/usage
  */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    proxy: {
      '/api/': { target: 'http://localhost:8080/RequirementPortal/masterJsonData', pathRewrite: {'^/api/': ''} }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
