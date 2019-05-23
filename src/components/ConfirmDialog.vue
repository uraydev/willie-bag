<template>
  <v-layout row justify-center>
    <v-dialog v-model="visibility" :max-width="maxWidth" persistent>
      <v-card class="text-xs-center brown lighten-5">
        <v-card-title class="title brown--text text--darken-3">
          {{ title }}
        </v-card-title>
        <v-card-text v-show="!!desc">
          {{ desc }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="brown lighten-2" flat @click="handleCancel">
            {{ cancelText }}
          </v-btn>
          <v-spacer />
          <v-btn color="orange accent-4" flat @click="handleConfirm">
            {{ confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    title: String,
    desc: {
      type: String,
      default: ''
    },
    confirmText: String,
    cancelText: String
  },

  data() {
    return {
      confirmed: null,
      visibility: false,
      maxWidth: 290
    }
  },

  methods: {
    requireConfirmation() {
      this.visibility = true
      return new Promise(resolve => {
        this.confirmed = resolve
      })
    },

    handleConfirm() {
      this.visibility = false
      this.confirmed(true)
    },

    handleCancel() {
      this.visibility = false
      this.confirmed(false)
    }
  }
}
</script>

