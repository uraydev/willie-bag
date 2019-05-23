import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import config from '@/config'

Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})

export default {
  // Trainer settings
  hasTrainer: {
    type: Boolean,
    default: config.default.hasTrainer
  },
  batchCount: {
    type: Number,
    default: config.default.batchCount
  },
  batchSpeed: {
    type: Number,
    default: config.default.batchSpeed
  },
  batchTimeoutDuration: {
    type: Number,
    default: config.default.batchTimeoutDuration
  },

  // Timer settings
  hasRounds: {
    type: Boolean,
    default: config.default.hasRounds
  },
  hasRoundsSounds: {
    type: Boolean,
    default: config.default.hasRoundsSounds
  },
  roundsCount: {
    type: Number,
    default: config.default.roundsCount
  },
  roundsDuration: {
    type: Number,
    default: config.default.roundsDuration
  },
  roundsTimeoutDuration: {
    type: Number,
    default: config.default.roundsTimeoutDuration
  },
  roundsWarnBeforeEndingDuration: {
    type: Number,
    default: config.default.roundsWarnBeforeEndingDuration
  },

  // App settings
  locale: {
    type: String,
    default: config.default.locale
  },
  voice: {
    type: String,
    default: config.default.voice
  }
}
