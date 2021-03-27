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
          v-focus
          id="email"
          type="text"
          class="validate"
          autocomplete="email"
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
          v-model="password"
          @input="passwordValidationStarted=true"
          id="password"
          type="password"
          class="validate"
          autocomplete="new-password"
        >
        <label for="password">Пароль</label>
        <template v-if="passwordValidationStarted">
          <small v-if="!passwordNotEmpty" class="helper-text invalid">
            Введите пароль
          </small>
          <small v-else-if="!hasPasswordMinLength" class="helper-text invalid">
            Миниум {{ passwordMinLength }} символов (Осталось {{ passwordCharsLeft }})
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
          autocomplete="new-password"
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
          autocomplete="given-name"
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
import { authMixin } from '@/mixins/auth.mixin'

export default {
  name: 'SignUp',
  metaInfo() {
    return {
      title: this.$title('SignUpTitle')
    }
  },
  mixins: [authMixin],
  data() {
    return {
      password2: '',
      password2ValidationStarted: false,
      name: '',
      nameValidationStarted: false,
      agreeWithRules: false
    }
  },
  computed: {
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
      return this.password === this.password2
    },

    nameNotEmpty() {
      return this.name.length
    },

    formIsValid() {
      const passwordsOk = this.passwordIsValid && this.password2IsValid && this.passwordsMatch
      return this.emailIsValid && passwordsOk && this.nameNotEmpty && this.agreeWithRules
    }
  },
  methods: {
    password2IsValid() {
      return this.password2NotEmpty && this.hasPassword2MinLength
    },
    async onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('signUp', formData)
        await this.$router.push('/')
      } catch (error) {
        // the error will be caught in AuthLayout
      }
    }
  }
}
</script>
