import store from '@/store'

const options = {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}

export default function (date) {
  const locale = store.getters.accountInfo.locale || 'ru-RU'
  return new Intl.DateTimeFormat(locale, options).format(date)
}
