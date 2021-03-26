import store from '@/store'
import ru from '@/assets/locales/ru-RU.json'
import en from '@/assets/locales/en-US.json'

const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function (key) {
  const locale = store.getters.accountInfo.locale || 'ru-RU'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
