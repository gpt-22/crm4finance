<template>
  <form
    @submit.prevent="onSubmit"
    class="card auth-card"
  >
    <div class="card-content">
      <span class="card-title">Вход в домашнюю бухгалтерию</span>

      <div class="input-field">
        <input
          v-model="email"
          @input="emailValidationStarted=true"
          v-focus
          id="email"
          type="text"
          class="validate"
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
import { authMixin } from '@/mixins/authMixin'
import messages from '@/utils/messages'

export default {
  name: 'SignIn',
  mixins: [authMixin],
  mounted() {
    const routMessage = this.$route.query.message
    if (routMessage) {
      this.$successMessage(messages[routMessage])
    }
  },
  computed: {
    formIsValid() {
      return this.emailIsValid() && this.passwordIsValid()
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log('form is valid:', formData)
      this.$router.push('/')
    }
  }
}
</script>
