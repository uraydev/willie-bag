<template>
  <div v-if="visibility" class="message text-xs-center">
    <div class="message-text-container elevation-1 font-weight-thin caption text-no-wrap">
      <div class="message-text">
        <v-icon v-if="message.type === 'success'"
                small color="green darken-2">check_circle</v-icon>
        <v-icon v-else-if="message.type === 'info'"
                small color="blue darken-2">info</v-icon>
        <v-icon v-else-if="message.type === 'warning'"
                small color="orange darken-2">warning</v-icon>
        <v-icon v-else-if="message.type === 'error'"
                small color="red darken-2">error</v-icon>&nbsp;{{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mixin as VueTimers } from 'vue-timers'

export default {
  mixins: [VueTimers],

  props: {
    timeout: {
      type: Number,
      default: 3000
    }
  },

  data() {
    return {
      visibility: false
    }
  },

  timers: {
    dismiss: {
      time: 3000
    }
  },

  computed: {
    ...mapGetters({
      message: 'getMessage'
    })
  },

  methods: {
    ...mapActions([
      'clearMessage'
    ]),

    dismiss() {
      this.clearMessage()
      this.$timer.stop('dismiss')
    }
  },

  watch: {
    message(value) {
      this.visibility = Boolean(value.text)
      if (this.visibility) {
        this.$timer.start('dismiss')
      }
    }
  },

  created () {
    this.timers.dismiss.time = this.timeout
  }
}
</script>

<style lang="stylus" scoped>
.message
  position fixed
  top 80px
  width 100%
  z-index 10000
.message-text-container
  display inline-block
  background rgba(255,255,255,.95)
  border-radius 5px
  padding 3px 7px
.message-text
  display flex
  justify-content center
  flex-wrap nowrap
</style>
