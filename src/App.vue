<template>
  <v-app>
    <message :timeout="1500" />

    <v-toolbar app dark color="deep-orange">
      <v-toolbar-title class="title">
        {{ getAppTitle }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-for="item in menuItems"
             :to="item.to"
             :key="item.icon"
             flat icon
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container class="fill-height pt-4 pb-5">
        <transition
            :name="getTransitionName"
            mode="out-in"
            @enter="handleEnterTransition"
        >
          <router-view />
        </transition>
      </v-container>
    </v-content>

    <v-btn v-if="$route.name !== 'timer'"
           to="timer"
           dark fab large fixed bottom right
           color="orange accent-4"
    >
      <v-icon>timer</v-icon>
    </v-btn>

    <v-footer fixed dark class="pa-3" color="brown lighten-2">
      <v-layout class="text-xs-center">
        <v-flex>
          &copy; {{ year }} by <a :href="author.url" class="brown--text text--lighten-4">
            {{ author.name }}
          </a>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      author: {
        name: 'nikonorosv',
        url: 'https://nikonorovsv.com'
      },
      menuItems: [
        { icon: 'help', to: 'about' },
        { icon: 'settings', to: 'settings' },
      ]
    }
  },

  computed: {
    ...mapGetters([
      'getAppTitle',
      'getTransitionName'
    ]),
    year: () => new Date().getFullYear()
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
      'updateTransitionName'
    ]),

    setLocalSettings() {
      // Trainer
      this.updateHasTrainer(this.$ls.get('hasTrainer'))
      this.updateBatchCount(this.$ls.get('batchCount'))
      this.updateBatchSpeed(this.$ls.get('batchSpeed'))
      this.updateBatchTimeoutDuration(this.$ls.get('batchTimeoutDuration'))

      // Timer
      this.updateHasRounds(this.$ls.get('hasRounds'))
      this.updateHasRoundsSounds(this.$ls.get('hasRoundsSounds'))
      this.updateRoundsCount(this.$ls.get('roundsCount'))
      this.updateRoundsDuration(this.$ls.get('roundsDuration'))
      this.updateRoundsTimeoutDuration(this.$ls.get('roundsTimeoutDuration'))
      this.updateRoundsWarnBeforeEndingDuration(this.$ls.get('roundsWarnBeforeEndingDuration'))

      // Locale
      this.updateVoice(this.$ls.get('voice'))
      this.updateLocale(this.$ls.get('locale'))
      this.$i18n.locale = this.$ls.get('locale')
    },

    handleEnterTransition() {
      this.updateTransitionName('fade')
    }
  },

  created() {
    this.setLocalSettings()
  }
}
</script>

<style lang="stylus">
  @import '~vuetify/src/stylus/theme.styl'
  $material-light.background = #efebe9
  @import '~vuetify/src/stylus/main.styl'

  .material-icons
    display flex

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .swipe-left
    &-enter-active,
    &-leave-active
      transition transform .1s ease-in
    &-enter
      transform translateX(100%)
    &-leave-to
      transform translateX(0)


  .swipe-right
    &-enter-active,
    &-leave-active
      transition transform .1s ease-in
    &-enter
      transform translateX(0)
    &-leave-to
      transform translateX(100%)

  .fade
    &-enter-active,
    &-leave-active
      transition opacity .3s
    &-enter
      opacity 0
    &-leave-to
      opacity 1
</style>
