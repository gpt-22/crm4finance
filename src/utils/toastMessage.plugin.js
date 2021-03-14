export default {
  install(Vue, options) {
    Vue.prototype.$defaultMessage = function (html) {
      // eslint-disable-next-line no-undef
      M.toast({ html })
    }

    Vue.prototype.$successMessage = function (html) {
      // eslint-disable-next-line no-undef
      M.toast({ html, classes: 'green' })
    }

    Vue.prototype.$errorMessage = function (html) {
      // eslint-disable-next-line no-undef
      M.toast({ html, classes: 'red' })
    }
  }
}
