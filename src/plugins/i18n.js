import Vue from 'vue'
import VueI18n from 'vue-i18n'
import russian from '@/locale/ru'
import english from '@/locale/en'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'ru',
  messages: {
    ru: russian,
    en: english
  }
})
