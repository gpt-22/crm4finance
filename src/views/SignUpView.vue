<template>
  <form
    @submit.prevent="onSubmit"
    class="card auth-card"
  >
    <div class="card-content">
      <span class="card-title">Регистрация</span>

      <div class="input-field">
        <input
          v-model="email"
          @input="emailValidationStarted=true"
          id="email"
          type="text"
          class="validate"
          autofocus
        >
        <label for="email">Email</label>
        <template v-if="emailValidationStarted">
          <small v-if="!emailNotEmpty" class="helper-text invalid">
            Введите email
          </small>
          <small v-else-if="!hasEmailMinLength" class="helper-text invalid">
            Минимум {{ emailMinLength }} символов (Осталось {{ emailCharsLeft }})
          </small>
          <small v-else-if="!emailIsEmail" class="helper-text invalid">
            Некорректный email
          </small>
        </template>
      </div>

      <div class="input-field">
        <input
          v-model="password1"
          @input="password1ValidationStarted=true"
          id="password"
          type="password"
          class="validate"
        >
        <label for="password">Пароль</label>
        <template v-if="password1ValidationStarted">
          <small v-if="!password1NotEmpty" class="helper-text invalid">
            Введите пароль
          </small>
          <small v-else-if="!hasPassword1MinLength" class="helper-text invalid">
            Миниум {{ passwordMinLength }} символов (Осталось {{ password1CharsLeft }})
          </small>
        </template>
      </div>

      <div class="input-field">
        <input
          v-model="password2"
          @input="password2ValidationStarted=true"
          id="repeatedPassword"
          type="password"
          class="validate"
        >
        <label for="repeatedPassword">Повторите пароль</label>
        <template v-if="password2ValidationStarted">
          <small v-if="!password2NotEmpty" class="helper-text invalid">
            Введите пароль
          </small>
          <small v-else-if="!hasPassword2MinLength" class="helper-text invalid">
            Миниум {{ passwordMinLength }} символов (Осталось {{ password2CharsLeft }})
          </small>
          <small v-else-if="!passwordsMatch" class="helper-text invalid">
            Пароли не совпадают
          </small>
        </template>
      </div>

      <div class="input-field">
        <input
          v-model="name"
          @input="nameValidationStarted=true"
          id="name"
          type="text"
          class="validate"
        >
        <label for="name">Имя</label>
        <small v-if="nameValidationStarted && !nameNotEmpty" class="helper-text invalid">
          Введите имя
        </small>
      </div>

      <p>
        <label>
          <input
            v-model="agreeWithRules"
            type="checkbox"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled="!formIsValid"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Уже есть аккаунт?
        <router-link to="/sign-in">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      emailValidationStarted: false,
      emailMinLength: 11,
      password1: '',
      password1ValidationStarted: false,
      password2: '',
      password2ValidationStarted: false,
      passwordMinLength: 6,
      name: '',
      nameValidationStarted: false,
      agreeWithRules: false
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

    password1NotEmpty() {
      return this.password1.length
    },
    hasPassword1MinLength() {
      return this.password1.length >= this.passwordMinLength
    },
    password1CharsLeft() {
      return this.passwordMinLength - this.password1.length
    },

    password2NotEmpty() {
      return this.password2.length
    },
    hasPassword2MinLength() {
      return this.password2.length >= this.passwordMinLength
    },
    password2CharsLeft() {
      return this.passwordMinLength - this.password2.length
    },

    passwordsMatch() {
      return this.password1 === this.password2
    },

    nameNotEmpty() {
      return this.name.length
    },

    formIsValid() {
      const passwordsOk = this.password1IsValid && this.password2IsValid && this.passwordsMatch
      return this.emailIsValid && passwordsOk && this.nameNotEmpty && this.agreeWithRules
    }
  },
  methods: {
    emailIsValid() {
      return this.emailNotEmpty && this.emailIsEmail && this.hasEmailMinLength
    },
    password1IsValid() {
      return this.password1NotEmpty && this.hasPassword1MinLength
    },
    password2IsValid() {
      return this.password2NotEmpty && this.hasPassword2MinLength
    },
    onSubmit() {
      const formData = {
        email: this.email,
        password1: this.password1,
        password2: this.password2,
        name: this.name
      }
      console.log('form is valid:', formData)
    }
  }
}

/* TODO
*   rewrite sign-in copypaste => plugin/mixin */
</script>
