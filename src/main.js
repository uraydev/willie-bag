import Vue from 'vue'
import i18n from '@/plugins/i18n'
import ls from '@/plugins/localstorage'
import router from '@/plugins/router'
import store from '@/plugins/store'
import '@/plugins/vuetify'
import App from '@/App.vue'
import Message from '@/components/Message'
import ConfirmDialog from '@/components/ConfirmDialog'
import timeFilter from '@/filters/time'
import doubleFilter from '@/filters/double'

Vue.config.productionTip = false

Vue.component('message', Message)
Vue.component('confirm-dialog', ConfirmDialog)

Vue.filter('time', timeFilter)
Vue.filter('double', doubleFilter)

const app = {
  initialize() {
    this.bindEvents()
    this.setupVue()
  },

  bindEvents() {
    document
      .addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  onDeviceReady() {
    this.receivedEvent()
  },

  receivedEvent() {
    window.screen.orientation.lock('portrait')
    cordova.plugins.backgroundMode.enable()
  },

  setupVue() {
    new Vue({
      router,
      store,
      ls,
      i18n,
      render: h => h(App),
    }).$mount('#app')
  }
}

app.initialize()
