<template>
  <form
    @submit.prevent="onSubmit"
    class="card auth-card"
    autocomplete="off"
  >
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
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
          v-model="password"
          @input="passwordValidationStarted=true"
          id="password"
          type="password"
          class="validate"
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
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled="!formIsValid"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Нет аккаунта?
        <router-link to="/sign-up">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SignIn',
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
    emailIsValid() {
      return this.emailNotEmpty && this.emailIsEmail && this.hasEmailMinLength
    },
    passwordNotEmpty() {
      return this.password.length
    },
    hasPasswordMinLength() {
      return this.password.length >= this.passwordMinLength
    },
    passwordCharsLeft() {
      return this.passwordMinLength - this.password.length
    },
    passwordIsValid() {
      return this.passwordNotEmpty && this.hasPasswordMinLength
    },
    formIsValid() {
      return this.emailIsValid && this.passwordIsValid
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log('form is valid:', formData)
    }
  }
}
</script>
