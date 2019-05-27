<template>
  <v-layout row wrap
            class="brown--text text--darken-2"
            v-touch="{
              left: swipeLeft,
              right: swipeRight
            }"
  >
    <v-flex xs12>
      <h2 class="caption text-uppercase brown--text text--lighten-2">
        {{ $t('settings.subtitleRounds') }}
      </h2>
      <v-checkbox
          v-model="rounds"
          :label="$t('settings.hasRoundsLabel')"
          color="orange accent-4"
          class="mt-2 mb-0"
      />
    </v-flex>
    <v-flex v-if="rounds" xs12>
      <number-field
          :label="$t('settings.roundsCountLabel')"
          @add="add('roundsCount')"
          @remove="remove('roundsCount')"
          @touch-add-start="touchAddStart('roundsCount')"
          @touch-remove-start="touchRemoveStart('roundsCount')"
          @touch-add-end="touchAddEnd()"
          @touch-remove-end="touchRemoveEnd()"
      >
        {{ roundsCount }}
      </number-field>

      <number-field
          :label="$t('settings.roundsDurationLabel')"
          @add="add('roundsDuration')"
          @remove="remove('roundsDuration')"
          @touch-add-start="touchAddStart('roundsDuration')"
          @touch-remove-start="touchRemoveStart('roundsDuration')"
          @touch-add-end="touchAddEnd()"
          @touch-remove-end="touchRemoveEnd()"
      >
        {{ roundsDuration|time }}
      </number-field>

      <number-field
          :label="$t('settings.roundsTimeoutDurationLabel')"
          @add="add('roundsTimeoutDuration')"
          @remove="remove('roundsTimeoutDuration')"
          @touch-add-start="touchAddStart('roundsTimeoutDuration')"
          @touch-remove-start="touchRemoveStart('roundsTimeoutDuration')"
          @touch-add-end="touchAddEnd()"
          @touch-remove-end="touchRemoveEnd()"
      >
        {{ roundsTimeoutDuration|time }}
      </number-field>

      <v-checkbox
          v-model="roundsSounds"
          :label="$t('settings.hasRoundsSoundsLabel')"
          color="orange accent-4"
          class="mt-3 mb-0"
      />

      <number-field
          v-if="roundsSounds"
          :label="$t('settings.roundsWarnBeforeEndingDurationLabel')"
          @add="add('roundsWarnBeforeEndingDuration')"
          @remove="remove('roundsWarnBeforeEndingDuration')"
          @touch-add-start="touchAddStart('roundsWarnBeforeEndingDuration')"
          @touch-remove-start="touchRemoveStart('roundsWarnBeforeEndingDuration')"
          @touch-add-end="touchAddEnd()"
          @touch-remove-end="touchRemoveEnd()"
      >
        {{ roundsWarnBeforeEndingDuration|time }}
      </number-field>
    </v-flex>

    <v-flex xs12 class="mt-5">
      <h2 class="caption text-uppercase brown--text text--lighten-2">
        {{ $t('settings.subtitleTrainer') }}
      </h2>
      <v-checkbox
          v-model="trainer"
          :label="$t('settings.hasTrainerLabel')"
          color="orange accent-4"
          class="mt-2 mb-0"
          :disabled="!rounds"
      />
    </v-flex>
    <v-flex v-if="trainer" xs12>
      <v-select
          v-model="voice"
          :items="voices"
          :label="$t('settings.voicesLabel')"
          append-icon="record_voice_over"
          value="june"
          color="orange accent-4"
          background-color="brown lighten-4"
          box
          required
      />

      <number-field
          :label="$t('settings.batchCountLabel')"
          @add="add('batchCount')"
          @remove="remove('batchCount')"
          @touch-add-start="touchAddStart('batchCount')"
          @touch-remove-start="touchRemoveStart('batchCount')"
          @touch-add-end="touchAddEnd()"
          @touch-remove-end="touchRemoveEnd()"
      >
        {{ batchCount }}
      </number-field>

      <number-field
          :label="$t('settings.batchTimeoutDurationLabel')"
          @add="add('batchTimeoutDuration')"
          @remove="remove('batchTimeoutDuration')"
          @touch-add-start="touchAddStart('batchTimeoutDuration')"
          @touch-remove-start="touchRemoveStart('batchTimeoutDuration')"
          @touch-add-end="touchAddEnd()"
          @touch-remove-end="touchRemoveEnd()"
      >
        {{ batchTimeoutDuration|time }}
      </number-field>

      <number-field
          :label="$t('settings.batchSpeedLabel')"
          @add="add('batchSpeed')"
          @remove="remove('batchSpeed')"
          @touch-add-start="touchAddStart('batchSpeed')"
          @touch-remove-start="touchRemoveStart('batchSpeed')"
          @touch-add-end="touchAddEnd()"
          @touch-remove-end="touchRemoveEnd()"
      >
        {{ batchSpeed|double }}
      </number-field>
    </v-flex>


    <v-flex xs12 class="mt-4">
      <h2 class="caption text-uppercase brown--text text--lighten-2">
        {{ $t('settings.subtitleApp') }}
      </h2>
    </v-flex>
    <v-flex xs12 class="mt-2">
      <v-select
          v-model="locale"
          :items="languages"
          :label="$t('settings.languagesLabel')"
          append-icon="language"
          value="en"
          color="orange accent-4"
          background-color="brown lighten-4"
          box
          required
      />
    </v-flex>
    <v-flex xs12>
      <v-btn block color="brown lighten-2" outline @click="restoreSettings">
        {{ $t('settings.setDefaultButtonLabel') }}
      </v-btn>
    </v-flex>

    <confirm-dialog
        ref="confirmation-dialog"
        :title="$t('settings.setDefaultConfirmationTitle')"
        :cancel-text="$t('settings.setDefaultCancelText')"
        :confirm-text="$t('settings.setDefaultConfirmText')"
    />

  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NumberField from '@/components/NumberField'
import { mixin as VueTimers } from 'vue-timers'
import config from '@/config'

export default {
  mixins: [VueTimers],
  components: {
    NumberField
  },

  data() {
    return {
      languages: config.languages,
      touchedValueName: null
    }
  },

  computed: {
    ...mapGetters([
      'hasTrainer',
      'getBatchCount',
      'getBatchSpeed',
      'getBatchTimeoutDuration',
      'hasRounds',
      'hasRoundsSounds',
      'getRoundsCount',
      'getRoundsDuration',
      'getRoundsTimeoutDuration',
      'getRoundsWarnBeforeEndingDuration',
      'getVoice',
      'getLocale'
    ]),

    rules() {
      return {
        ...config.rules,
        roundsWarnBeforeEndingDuration: { min: 3, max: this.roundsDuration - 1, step: 1 }
      }
    },

    voices: {
      cache: false,
      get() {
        switch (this.locale) {
          case 'en':
            return config.voices['en']
          case 'ru':
          default:
            return config.voices['ru']
        }
      }
    },

    trainer: {
      get() {
        return this.hasTrainer
      },
      set(value) {
        this.$ls.set('hasTrainer', value)
        this.updateHasTrainer(value)
      }
    },

    batchCount: {
      get() {
        return this.getBatchCount
      },
      set(value) {
        this.$ls.set('batchCount', value)
        this.updateBatchCount(value)
      }
    },

    batchSpeed: {
      get() {
        return this.getBatchSpeed
      },
      set(value) {
        this.$ls.set('batchSpeed', value)
        this.updateBatchSpeed(value)
      }
    },

    batchTimeoutDuration: {
      get() {
        return this.getBatchTimeoutDuration
      },
      set(value) {
        this.$ls.set('batchTimeoutDuration', value)
        this.updateBatchTimeoutDuration(value)
      }
    },

    rounds: {
      get() {
        return this.hasRounds
      },
      set(value) {
        if (!value) {
          this.trainer = true
        }
        this.$ls.set('hasRounds', value)
        this.updateHasRounds(value)
      }
    },

    roundsSounds: {
      get() {
        return this.hasRoundsSounds
      },
      set(value) {
        this.$ls.set('hasRoundsSounds', value)
        this.updateHasRoundsSounds(value)
      }
    },

    roundsCount: {
      get() {
        return this.getRoundsCount
      },
      set(value) {
        this.$ls.set('roundsCount', value)
        this.updateRoundsCount(value)
      }
    },

    roundsDuration: {
      get() {
        return this.getRoundsDuration
      },
      set(value) {
        this.$ls.set('roundsDuration', value)
        this.updateRoundsDuration(value)
      }
    },

    roundsTimeoutDuration: {
      get() {
        return this.getRoundsTimeoutDuration
      },
      set(value) {
        this.$ls.set('roundsTimeoutDuration', value)
        this.updateRoundsTimeoutDuration(value)
      }
    },

    roundsWarnBeforeEndingDuration: {
      get() {
        return this.getRoundsWarnBeforeEndingDuration
      },
      set(value) {
        this.$ls.set('roundsWarnBeforeEndingDuration', value)
        this.updateRoundsWarnBeforeEndingDuration(value)
      }
    },

    locale: {
      get() {
        return this.getLocale
      },
      set(value) {
        this.$ls.set('locale', value)
        this.updateLocale(value)
        this.$i18n.locale = value
        this.updateAppTitle(this.$t('settings.title'))
        this.voice = (this.locale === 'en') ? 'june' : 'elena'
      }
    },

    voice: {
      get() {
        return this.getVoice
      },
      set(value) {
        this.$ls.set('voice', value)
        this.updateVoice(value)
      }
    },
  },

  timers: {
    addTouched: {
      repeat: true,
      time: 200
    },
    removeTouched: {
      repeat: true,
      time: 200
    }
  },

  methods: {
    ...mapActions([
      'updateHasTrainer',
      'updateBatchCount',
      'updateBatchSpeed',
      'updateBatchTimeoutDuration',
      'updateHasRounds',
      'updateHasRoundsSounds',
      'updateRoundsCount',
      'updateRoundsDuration',
      'updateRoundsTimeoutDuration',
      'updateRoundsWarnBeforeEndingDuration',
      'updateLocale',
      'updateVoice',
      'updateAppTitle',
      'sendMessage',
      'updateTransitionName'
    ]),

    add(name) {
      if (this[name] < this.rules[name].max) {
        this[name] += this.rules[name].step
      } else {
        if (this.timers.addTouched.isRunning) {
          this.$timer.stop('addTouched')
        }
        this.sendMessage({
          type: 'warning',
          text: this.$t('settings.validations.max')
        })
      }
    },

    remove(name) {
      if (this[name] > this.rules[name].min) {
        this[name] -= this.rules[name].step
      } else {
        if (this.timers.removeTouched.isRunning) {
          this.$timer.stop('removeTouched')
        }
        this.sendMessage({
          type: 'warning',
          text: this.$t('settings.validations.min')
        })
      }
    },

    addTouched() {
      this.add(this.touchedValueName)
    },

    removeTouched() {
      this.remove(this.touchedValueName)
    },

    touchAddStart(name) {
      this.touchedValueName = name
      this.$timer.start('addTouched')
    },

    touchAddEnd() {
      this.$timer.stop('addTouched')
    },

    touchRemoveStart(name) {
      this.touchedValueName = name
      this.$timer.start('removeTouched')
    },

    touchRemoveEnd() {
      this.$timer.stop('removeTouched')
    },

    restoreSettings() {
      this.$refs['confirmation-dialog']
        .requireConfirmation()
        .then(() => {
          this.trainer = config.default.hasTrainer
          this.batchCount = config.default.batchCount
          this.batchSpeed = config.default.batchSpeed
          this.batchTimeoutDuration = config.default.batchTimeoutDuration
          this.rounds = config.default.hasRounds
          this.roundsSounds = config.default.hasRoundsSounds
          this.roundsCount = config.default.roundsCount
          this.roundsDuration = config.default.roundsDuration
          this.roundsTimeoutDuration = config.default.roundsTimeoutDuration
          this.roundsWarnBeforeEndingDuration = config.default.roundsWarnBeforeEndingDuration
          this.locale = config.default.locale
          this.voice = config.default.voice

          this.sendMessage({
            type: 'success',
            text: this.$t('settings.setDefaultMessage')
          })
        })
    },

    swipeLeft() {
      this.updateTransitionName('swipe-left')
      this.$router.push('about')
    },

    swipeRight() {
      this.updateTransitionName('swipe-right')
      this.$router.push('timer')
    }
  },

  created() {
    this.updateAppTitle(this.$t('settings.title'))
  }
}
</script>
