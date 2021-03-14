export const authMixin = {
  data() {
    return {
      email: '',
      emailValidationStarted: false,
      emailMinLength: 11,

      password: '',
      passwordValidationStarted: false,
      passwordMinLength: 6
    }
  },
  computed: {
    emailNotEmpty() {
      return this.email.length
    },
    hasEmailMinLength() {
      return this.email.length >= this.emailMinLength
    },
    emailCharsLeft() {
      return this.emailMinLength - this.email.length
    },
    emailIsEmail() {
      const re = /\S+@\S+\.\S{2,3}$/
      return re.test(this.email)
    },

    passwordNotEmpty() {
      return this.password.length
    },
    hasPasswordMinLength() {
      return this.password.length >= this.passwordMinLength
    },
    passwordCharsLeft() {
      return this.passwordMinLength - this.password.length
    }
  },
  methods: {
    emailIsValid() {
      return this.emailNotEmpty && this.emailIsEmail && this.hasEmailMinLength
    },
    passwordIsValid() {
      return this.passwordNotEmpty && this.hasPasswordMinLength
    }
  },
  directives: {
    focus: {
      inserted: function (input) {
        input.focus()
      }
    }
  }
}
