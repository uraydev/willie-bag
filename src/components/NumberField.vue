<template>
  <v-card flat class="mb-2">
    <v-card-title class="pt-2 px-3 pb-0">
      <span class="brown--text text--darken-3">
        {{ label }}
      </span>
    </v-card-title>
    <v-card-text class="pt-0 px-3 pb-2">
      <v-layout>
        <v-flex grow>
          <span class="display-2 font-weight-medium brown--text text--darken-1">
            <slot>NaN</slot>
          </span>
        </v-flex>
        <v-flex shrink>
          <v-btn @click="$emit('remove')"
                 @touchstart="$emit('touch-remove-start')"
                 @touchend="$emit('touch-remove-end')"
                 fab dark icon small outline color="brown lighten-2" class="ma-0">
            <v-icon dark>remove</v-icon>
          </v-btn>
          <v-btn @click="$emit('add')"
                 @touchstart="$emit('touch-add-start')"
                 @touchend="$emit('touch-add-end')"
                 fab dark icon small outline color="brown lighten-2" class="mr-0">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    label: String
  }
}
</script>
