<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form @submit.prevent="onSubmit" class="form">
      <div class="input-field">
        <input
          v-model="name"
          id="description"
          type="text"
        >
        <label for="description" :class="{active: name.length}">
          {{ 'ProfileNameLabel' | localize }}
        </label>
        <template v-if="formSubmitted">
          <span v-if="!name.length" class="helper-text invalid">
            {{ 'ProfileNameHint' | localize }}
          </span>
        </template>
      </div>

      <div class="switch">
        <label>
          {{ 'ProfileLangRU' | localize }}
          <input
            v-model="isEnglishLang"
            type="checkbox"
          >
          <span class="lever"></span>
          {{ 'ProfileLangEN' | localize }}
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'ProfileUpdate' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data() {
    return {
      name: '',
      isEnglishLang: false,
      formSubmitted: false
    }
  },
  created() {
    this.name = this.accountInfo.name
    this.isEnglishLang = this.accountInfo.locale === 'en-US'
  },
  computed: {
    ...mapGetters(['accountInfo'])
  },
  methods: {
    isNameChanged() {
      return this.name.length && this.name !== this.accountInfo.name
    },
    isLangChanged() {
      return this.isEnglishLang === (this.accountInfo.locale === 'ru-RU')
    },
    async onSubmit() {
      this.formSubmitted = true
      if (this.isNameChanged() || this.isLangChanged()) {
        await this.$store.dispatch('updateAccountInfo', {
          name: this.name,
          locale: this.isEnglishLang ? 'en-US' : 'ru-RU'
        })
      }
    }
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2.5em;
  }
</style>
