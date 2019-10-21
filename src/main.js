import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './components/store/store'
import vuetify from './plugins/vuetify'
import * as fb from 'firebase'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyD1AfCogLRnv0TW4OIMYZFBJQC9W7d5qt0',
      authDomain: 'ads-project-7341d.firebaseapp.com',
      databaseURL: 'https://ads-project-7341d.firebaseio.com',
      projectId: 'ads-project-7341d',
      storageBucket: 'ads-project-7341d.appspot.com',
      messagingSenderId: '509530952600',
      appId: '1:509530952600:web:c31193206232052de751ed'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  },
  render: h => h(App)
}).$mount('#app')
