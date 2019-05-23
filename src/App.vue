<template>
  <v-app>
    <message :timeout="1500" />

    <v-toolbar app dark color="deep-orange">
      <v-toolbar-title class="title white--text">
        {{ getAppTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-for="item in menuItems" :to="item.to" :key="item.icon" flat icon>
          <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content align-center>
      <v-container fluid class="fill-height pt-4 pb-5">
        <router-view />
      </v-container>
    </v-content>

    <v-footer fixed class="pa-3" color="brown lighten-2" dark>
      <v-layout align-center class="text-xs-center">
        <v-flex xs>
          &copy; {{ year }} by <a :href="author.url" class="brown--text text--lighten-4">
            {{ author.name }}
          </a>
        </v-flex>
        <v-btn v-if="$route.name !== 'timer'"
               to="timer"
               dark fab large fixed bottom right
               color="orange accent-4"
        >
          <v-icon>timer</v-icon>
        </v-btn>
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
      'getAppTitle'
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
      'updateVoice'
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
</style>
