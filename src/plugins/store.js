import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '@/types'
import config from '@/config'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,

  state: {
    hasTrainer: config.default.hasTrainer,
    batchCount: config.default.batchCount,
    batchSpeed: config.default.batchSpeed,
    batchTimeoutDuration: config.default.batchTimeoutDuration,
    hasRounds: config.default.hasRounds,
    hasRoundsSounds: config.default.hasRoundsSounds,
    roundsCount: config.default.roundsCount,
    roundsDuration: config.default.roundsDuration,
    roundsTimeoutDuration: config.default.roundsTimeoutDuration,
    roundsWarnBeforeEndingDuration: config.default.roundsWarnBeforeEndingDuration,
    locale: config.default.locale,
    voice: config.default.voice,
    appTitle: null,
    message: {
      type: 'info',
      text: ''
    }
  },

  mutations: {
    [types.SET_HAS_TRAINER] (state, value) {
      Vue.set(state, 'hasTrainer', value)
    },
    [types.SET_BATCH_COUNT] (state, value) {
      Vue.set(state, 'batchCount', value)
    },
    [types.SET_BATCH_SPEED] (state, value) {
      Vue.set(state, 'batchSpeed', value)
    },
    [types.SET_BATCH_TIMEOUT_DURATION] (state, value) {
      Vue.set(state, 'batchTimeoutDuration', value)
    },
    [types.SET_HAS_ROUNDS] (state, value) {
      Vue.set(state, 'hasRounds', value)
    },
    [types.SET_HAS_ROUNDS_SOUNDS] (state, value) {
      Vue.set(state, 'hasRoundsSounds', value)
    },
    [types.SET_ROUNDS_COUNT] (state, value) {
      Vue.set(state, 'roundsCount', value)
    },
    [types.SET_ROUNDS_DURATION] (state, value) {
      Vue.set(state, 'roundsDuration', value)
    },
    [types.SET_ROUNDS_TIMEOUT_DURATION] (state, value) {
      Vue.set(state, 'roundsTimeoutDuration', value)
    },
    [types.SET_ROUNDS_WARN_BEFORE_ENDING_DURATION] (state, value) {
      Vue.set(state, 'roundsWarnBeforeEndingDuration', value)
    },
    [types.SET_LOCALE] (state, value) {
      Vue.set(state, 'locale', value)
    },
    [types.SET_VOICE] (state, value) {
      Vue.set(state, 'voice', value)
    },
    [types.SET_APP_TITLE] (state, value) {
      Vue.set(state, 'appTitle', value)
    },
    [types.SET_MESSAGE] (state, value) {
      Vue.set(state, 'message', value)
    }
  },

  actions: {
    updateHasTrainer ({ commit }, value) {
      commit('SET_HAS_TRAINER', value)
    },

    updateBatchCount({ commit }, value) {
      commit('SET_BATCH_COUNT', value)
    },

    updateBatchSpeed({ commit }, value) {
      commit('SET_BATCH_SPEED', value)
    },

    updateBatchTimeoutDuration({ commit }, value) {
      commit('SET_BATCH_TIMEOUT_DURATION', value)
    },

    updateHasRounds ({ commit }, value) {
      commit('SET_HAS_ROUNDS', value)
    },

    updateHasRoundsSounds({ commit }, value) {
      commit('SET_HAS_ROUNDS_SOUNDS', value)
    },

    updateRoundsCount({ commit }, value) {
      commit('SET_ROUNDS_COUNT', value)
    },

    updateRoundsDuration({ commit }, value) {
      commit('SET_ROUNDS_DURATION', value)
    },

    updateRoundsTimeoutDuration({ commit }, value) {
      commit('SET_ROUNDS_TIMEOUT_DURATION', value)
    },

    updateRoundsWarnBeforeEndingDuration({ commit }, value) {
      commit('SET_ROUNDS_WARN_BEFORE_ENDING_DURATION', value)
    },

    updateLocale ({ commit }, value) {
      commit('SET_LOCALE', value)
    },

    updateVoice ({ commit }, value) {
      commit('SET_VOICE', value)
    },

    updateAppTitle ({ commit }, value) {
      commit('SET_APP_TITLE', value)
    },

    sendMessage ({ commit }, value) {
      commit('SET_MESSAGE', value)
    },

    clearMessage ({ commit }) {
      commit('SET_MESSAGE', { type: 'info', text: '' })
    }
  },

  getters: {
    hasTrainer: state => state.hasTrainer,
    getBatchCount: state => state.batchCount,
    getBatchSpeed: state => state.batchSpeed,
    getBatchTimeoutDuration: state => state.batchTimeoutDuration,
    hasRounds: state => state.hasRounds,
    hasRoundsSounds: state => state.hasRoundsSounds,
    getRoundsCount: state => state.roundsCount,
    getRoundsDuration: state => state.roundsDuration,
    getRoundsTimeoutDuration: state => state.roundsTimeoutDuration,
    getRoundsWarnBeforeEndingDuration: state => state.roundsWarnBeforeEndingDuration,
    getLocale: state => state.locale,
    getVoice: state => state.voice,
    getMessage: state => state.message,
    getAppTitle: state => state.appTitle
  },
})
