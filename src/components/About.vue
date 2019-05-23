<template>
  <v-layout row wrap
            class="brown--text text--darken-2"
            transition="slide-x-transition"
            v-touch="{
              left: () => { $router.push('timer') },
              right: () => { $router.push('settings') }
            }"
  >
    <v-flex xs12>
      <h2 class="headline mb-2">
        {{ $t('about.subtitle1') }}
      </h2>
      <p>{{ $t('about.desc1') }}</p>
      <v-img src="images/german.png" width="160" class="mx-auto" contain />
    </v-flex>
    <v-flex xs12 class="mt-4">
      <h2 class="headline mb-2">
        {{ $t('about.subtitle2') }}
      </h2>
      <p>{{ $t('about.desc2') }}</p>
    </v-flex>
    <v-flex xs12 class="mt-4">
      <h2 class="headline mb-2">
        {{ $t('about.subtitle3') }}
      </h2>
      <p>{{ $t('about.desc3') }}</p>
    </v-flex>
    <v-flex v-for="(blow, i) in blows" xs12 md6 class="my-3" :key="i+1">
      <h4 class="subheading font-weight-medium">
        {{ i+1 }}. {{ $t(`about.batch.blow${i+1}`) }}
      </h4>
      <v-img :src="`images/${i+1}.png`" aspect-ratio="1.6" contain />
    </v-flex>
    <v-flex xs12 class="mt-4">
      <h2 class="headline mb-2">
        {{ $t('about.subtitle4') }}
      </h2>
      <ol>
        <li>{{ $t('about.desc4_1') }}</li>
        <li>{{ $t('about.desc4_2') }}</li>
      </ol>
      <p class="mt-3">{{ $t('about.desc4_3') }}</p>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      blows: new Array(8)
    }
  },

  methods: {
    ...mapActions([
      'updateAppTitle'
    ])
  },

  created () {
    this.updateAppTitle(this.$t('about.title'))
  }
}
</script>
