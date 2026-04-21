import { createI18n } from 'vue-i18n'
import ca from './locales/ca'
import en from './locales/en'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'ca',
  fallbackLocale: 'en',
  messages: {
    ca,
    en
  }
})

export default i18n
