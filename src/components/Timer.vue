<template>
  <v-layout align-center justify-center
            class="text-xs-center brown--text text--darken-2"
            v-touch="{
              left: swipeLeft,
              right: swipeRight
            }"
  >
    <h2 class="display-1 font-weight-bold mt-0">
      <span v-if="isTimeout">
        {{ $t('timer.timeout') }}
        <span v-if="hasRounds" class="deep-orange--text">
          {{ roundsCurrent }}/{{ roundsCount }}
        </span>
      </span>
      <span v-else-if="timers.tick.isRunning">
        {{ $t('timer.subtitle') }}
        <span v-if="hasRounds" class="deep-orange--text">
          {{ roundsCurrent }}/{{ roundsCount }}
        </span>
      </span>
      <span v-else-if="paused">
        {{ $t('timer.paused') }}
        <span v-if="hasRounds" class="deep-orange--text">
          {{ roundsCurrent }}/{{ roundsCount }}
        </span>
      </span>
      <span v-else>
        {{ $t('timer.stopped') }}
      </span>
    </h2>

    <time id="timer" class="white elevation-2" @click="floatingAction">
      <span id="clock-string" class="display-3 font-weight-bold deep-orange--text">
        {{ timerString }}
      </span>
      <template v-for="s in numbersOfSeconds">
        <span v-if="s%5" :key="s" :class="`stroke stroke-small stroke-${s}`"></span>
        <span v-else :key="s" :class="`stroke stroke-${s}`"></span>
      </template>
      <span class="arrow" ref="arrow-seconds"></span>
    </time>

    <v-card v-if="hasRounds || hasTrainer"
            class="brown lighten-4"
            flat
            width="100%">
      <v-card-text class="brown--text text--darken-2">
        <div v-if="hasRounds">
          {{ $t('timer.previewRoundsDuration') }}:
          <span class="font-weight-medium orange--text text--accent-4 mr-2">
            {{ this.roundsDuration|time }}
          </span>
          {{ $t('timer.previewRoundsTimeoutDuration') }}:
          <span class="font-weight-medium orange--text text--accent-4">
            {{ this.roundsTimeoutDuration|time }}
          </span>
        </div>
        <div v-if="hasTrainer">
          {{ $t('timer.previewBatchCount') }}:
          <span class="font-weight-medium orange--text text--accent-4 mr-2">
            {{ this.batchCount }}
          </span>
          {{ $t('timer.previewBatchTimeoutDuration') }}:
          <span class="font-weight-medium mr-2 orange--text text--accent-4">
            {{ this.batchTimeoutDuration|time }}
          </span>
        </div>
      </v-card-text>
    </v-card>

    <confirm-dialog
        ref="confirmation-dialog"
        :title="$t('timer.confirmationTitle')"
        :cancel-text="$t('timer.confirmationCancelText')"
        :confirm-text="$t('timer.confirmationConfirmText')"
    />

    <v-btn v-if="paused"
           @click="stop"
           dark fab large fixed bottom left
           color="white">
      <v-icon color="orange accent-4">stop</v-icon>
    </v-btn>
    <v-btn @click="floatingAction"
           dark fab large fixed bottom right
           color="orange accent-4">
      <v-icon>{{ floatingIcon }}</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { mixin as VueTimers } from 'vue-timers'

  export default {
    mixins: [VueTimers],

    data () {
      return {
        isTimeout: false,
        paused: false,
        roundsCurrent: 1,

        timerCurrent: null,
        timerString: '00:00',

        batch: [],
        batchPointer: 0,

        floatingIcon: 'play_arrow'
      }
    },

    computed: {
      ...mapGetters({
        hasTrainer: 'hasTrainer',
        batchCount: 'getBatchCount',
        batchSpeed: 'getBatchSpeed',
        batchTimeoutDuration: 'getBatchTimeoutDuration',
        hasRounds: 'hasRounds',
        hasRoundsSounds: 'hasRoundsSounds',
        roundsCount: 'getRoundsCount',
        roundsDuration: 'getRoundsDuration',
        roundsTimeoutDuration: 'getRoundsTimeoutDuration',
        roundsWarnBeforeEndingDuration: 'getRoundsWarnBeforeEndingDuration',
        voice: 'getVoice',
        locale: 'getLocale'
      }),

      numbersOfSeconds () {
        const numbers = []
        for (let i = 1; i <= 60; i++) {
          numbers.push(i)
        }
        return numbers
      },

      // Sounds
      endRoundSound: () => {
        const audio = new Audio('sounds/end.wav')
        audio.volume = 1
        return audio
      },
      startRoundSound: () => {
        const audio = new Audio('sounds/start.wav')
        audio.volume = 1
        return audio
      },
      warnBeforeEndingSound: () => {
        const audio = new Audio('sounds/warn.wav')
        audio.volume = 1
        return audio
      },

      batchSounds () {
        const path = ['sounds', this.locale, this.voice].join('/')
        const files = new Array(8)
        const audios = []
        for (let i = 1; i <= files.length; i++) {
          const audio = new Audio(`${path}/${i}.wav`)
          audio.playbackRate = (this.batchSpeed / 10)
          audio.volume = 1
          audio.addEventListener('ended', () => {
            this.playBatch()
          })
          audios.push(audio)
        }
        return audios
      }
    },

    timers: {
      tick: {
        isSwitchTab: true,
        immediate: true,
        repeat: true,
        time: 1000
      },
      durationEnding: {
        isSwitchTab: true,
        repeat: true,
        time: 0
      },
      warnBeforeEnding: {
        isSwitchTab: true,
        time: 0
      },
      durationBatch: {
        time: 0
      },
    },

    methods: {
      ...mapActions([
        'updateAppTitle',
        'updateTransitionName'
      ]),

      floatingAction () {
        if (this.timers.tick.isRunning) {
          this.pause()
          this.floatingIcon = 'play_arrow'
        } else if (this.paused) {
          this.resume()
          this.floatingIcon = 'pause'
        } else {
          this.start()
          this.floatingIcon = 'pause'
        }
      },

      // Sounds play here
      durationBatch () {
        if (
          this.hasTrainer
          && this.timers.tick.isRunning
          && !this.isTimeout
        ) {
          this.playBatch()
        }
      },

      /**
       * Willie bag have 8 zones
       */
      playBatch () {
        this.$timer.stop('durationBatch')
        if (this.batchPointer < this.batchCount) {
          const rand = Math.floor(Math.random() * 8)
          this.batchSounds[rand].play()
          this.batchPointer++
        } else {
          this.batchPointer = 0
          this.$timer.start('durationBatch')
        }
      },

      /**
       * Logic for rounds timer
       */
      durationEnding () {
        this.reset()
        // Check rounds count
        if (this.roundsCurrent < this.roundsCount) {
          // Switch timeout status
          this.isTimeout = !this.isTimeout
          if (this.isTimeout) {
            this.timers.durationEnding.time = this.roundsTimeoutDuration * 1000
            this.playAudio(this.endRoundSound, () => {
              this.run()
            })
          } else {
            this.roundsCurrent++
            this.timers.durationEnding.time = this.roundsDuration * 1000
            this.playAudio(this.startRoundSound, () => {
              this.run()
            })
          }
        } else {
          this.playAudio(this.endRoundSound, () => {
            this.clear()
          })
        }
      },

      warnBeforeEnding () {
        this.playAudio(this.warnBeforeEndingSound)
      },

      /**
       * Run timers
       */
      run () {
        this.$timer.start('tick')
        // If rounds turned on
        if (this.hasRounds) {
          this.$timer.start('durationEnding')
          // Warn before 10 seconds to ending
          if (!this.isTimeout) {
            this.$timer.start('warnBeforeEnding')
          }
        }
        this.durationBatch()
      },

      /**
       * Start round
       */
      start () {
        this.playAudio(this.startRoundSound, () => {
          this.run()
        })
      },

      /**
       * Continue from the pause
       */
      resume () {
        this.paused = false
        this.run()
      },

      /**
       * Pause widget and save time position
       */
      pause () {
        this.paused = true
        this.stopAllTimers()
        this.timers.durationEnding.time -= this.timerCurrent.getSeconds() * 1000
      },

      /**
       * Logic when stop button clicked
       */
      stop () {
        // Require confirmation
        this.$refs['confirmation-dialog']
          .requireConfirmation()
          .then(confirmed => {
            if (confirmed) {
              this.clear()
            }
          })
      },

      /**
       * Stop all timers and reset widget
       */
      reset () {
        this.stopAllTimers()
        // Reset widget
        this.timerCurrent = new Date(2010, 0, 1)
        this.timerString = '00:00'
        this.$refs['arrow-seconds']
          .style.transform = `rotate(0deg)`
      },

      /**
       * Reset to initial statement
       */
      clear () {
        this.floatingIcon = 'play_arrow'
        this.paused = false
        this.isTimeout = false
        this.roundsCurrent = 1
        this.reset()
      },

      /**
       * Change current time and update widget
       */
      tick () {
        this.timerCurrent.setSeconds(this.timerCurrent.getSeconds() + 1)
        this.timerString = new Intl.DateTimeFormat('en-US', {
          minute: 'numeric',
          second: 'numeric'
        }).format(this.timerCurrent)
        const pos = 360 / 60 * this.timerCurrent.getSeconds()
        this.$refs['arrow-seconds']
          .style.transform = `rotate(${pos}deg)`
      },

      stopAllTimers () {
        for (let timer in this.timers) {
          if (this.timers.hasOwnProperty(timer)) {
            this.$timer.stop(timer)
          }
        }
      },

      /**
       * Play sound and call function after this
       *
       * @param audio
       * @param endedCallback
       */
      playAudio (audio, endedCallback) {
        // Plays only if sounds settings was turned on
        if (this.hasRoundsSounds) {
          audio.addEventListener('ended', endedCallback)
          audio.play()
        } else {
          endedCallback()
        }
      },

      swipeLeft () {
        this.updateTransitionName('swipe-left')
        this.$router.push('settings')
      },

      swipeRight () {
        this.updateTransitionName('swipe-right')
        this.$router.push('about')
      }
    },

    created () {
      this.updateAppTitle(this.$t('timer.title'))

      // Initial timers settings
      this.timers.durationEnding.time
        = this.roundsDuration * 1000
      this.timers.warnBeforeEnding.time
        = (this.roundsDuration - this.roundsWarnBeforeEndingDuration - 1) * 1000
      this.timers.durationBatch.time
        = this.batchTimeoutDuration * 1000
    },

    mounted () {
      this.clear()
    },

    beforeDestroy () {
      this.clear()
    },

    beforeRouteLeave (to, from, next) {
      if (this.timers.tick.isRunning) {
        this.pause()
        this.$refs['confirmation-dialog']
          .requireConfirmation()
          .then(confirmed => {
            next(confirmed)
          })
      } else if (this.paused) {
        this.$refs['confirmation-dialog']
          .requireConfirmation()
          .then(confirmed => {
            next(confirmed)
          })
      } else {
        next()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #timer
    box-shadow inset 0 0 0 0.02em rgba(0, 0, 0, .8)
    display inline-block
    border-radius 0.5em
    position relative
    font-size 250px
    overflow hidden
    height 1em
    width 1em

    &::after
      content ''
      background-color #fff
      border-radius 0.5em
      margin-left -0.5em
      margin-top -0.5em
      position absolute
      font-size 0.01em
      display block
      height 1em
      width 1em
      left 50%
      top 50%

  #clock-string
    position absolute
    width 100%
    left 0
    right 0
    top 35%

  .arrow,
  .stroke
    margin-left -0.5em
    margin-top -0.5em
    font-size inherit
    position absolute
    display block
    height 1em
    width 1em
    left 50%
    top 50%

    &::after
      content ''
      border-radius 0 0 0.02em 0.02em
      background-color rgba(0, 0, 0, .4)
      margin-left -0.01em
      position absolute
      display block
      height 0.05em
      width 0.02em
      top 0.02em
      left 50%

  .arrow
    &::after
      content ''
      border-radius 0.01em 0.01em 0.005em 0.005em
      background-color #ff6d00
      margin-bottom -0.02em
      margin-left -0.014em
      font-size inherit
      position absolute
      display block
      height 0.09em
      width 0.03em
      bottom 50%
      left 50%

  .stroke-small
    &::after
      content ''
      border-radius 0 0 0.0125em 0.0125em
      height 0.025em
      width 0.015em

  .stroke-1
    transform rotate(6deg)

  .stroke-2
    transform rotate(12deg)

  .stroke-3
    transform rotate(18deg)

  .stroke-4
    transform rotate(24deg)

  .stroke-5
    transform rotate(30deg)

  .stroke-6
    transform rotate(36deg)

  .stroke-7
    transform rotate(42deg)

  .stroke-8
    transform rotate(48deg)

  .stroke-9
    transform rotate(54deg)

  .stroke-10
    transform rotate(60deg)

  .stroke-11
    transform rotate(66deg)

  .stroke-12
    transform rotate(72deg)

  .stroke-13
    transform rotate(78deg)

  .stroke-14
    transform rotate(84deg)

  .stroke-15
    transform rotate(90deg)

  .stroke-16
    transform rotate(96deg)

  .stroke-17
    transform rotate(102deg)

  .stroke-18
    transform rotate(108deg)

  .stroke-19
    transform rotate(114deg)

  .stroke-20
    transform rotate(120deg)

  .stroke-21
    transform rotate(126deg)

  .stroke-22
    transform rotate(132deg)

  .stroke-23
    transform rotate(138deg)

  .stroke-24
    transform rotate(144deg)

  .stroke-25
    transform rotate(150deg)

  .stroke-26
    transform rotate(156deg)

  .stroke-27
    transform rotate(162deg)

  .stroke-28
    transform rotate(168deg)

  .stroke-29
    transform rotate(174deg)

  .stroke-30
    transform rotate(180deg)

  .stroke-31
    transform rotate(186deg)

  .stroke-32
    transform rotate(192deg)

  .stroke-33
    transform rotate(198deg)

  .stroke-34
    transform rotate(204deg)

  .stroke-35
    transform rotate(210deg)

  .stroke-36
    transform rotate(216deg)

  .stroke-37
    transform rotate(222deg)

  .stroke-38
    transform rotate(228deg)

  .stroke-39
    transform rotate(234deg)

  .stroke-40
    transform rotate(240deg)

  .stroke-41
    transform rotate(246deg)

  .stroke-42
    transform rotate(252deg)

  .stroke-43
    transform rotate(258deg)

  .stroke-44
    transform rotate(264deg)

  .stroke-45
    transform rotate(270deg)

  .stroke-46
    transform rotate(276deg)

  .stroke-47
    transform rotate(282deg)

  .stroke-48
    transform rotate(288deg)

  .stroke-49
    transform rotate(294deg)

  .stroke-50
    transform rotate(300deg)

  .stroke-51
    transform rotate(306deg)

  .stroke-52
    transform rotate(312deg)

  .stroke-53
    transform rotate(318deg)

  .stroke-54
    transform rotate(324deg)

  .stroke-55
    transform rotate(330deg)

  .stroke-56
    transform rotate(336deg)

  .stroke-57
    transform rotate(342deg)

  .stroke-58
    transform rotate(348deg)

  .stroke-59
    transform rotate(354deg)
</style>

