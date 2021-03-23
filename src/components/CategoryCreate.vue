<template>
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          v-model.trim="title"
          id="title"
          type="text"
        >
        <label for="title">Название</label>
        <template v-if="formSubmitted">
          <span
            v-if="!title.length"
            class="helper-text invalid"
          >
          Введите название
        </span>
        </template>
      </div>

      <div class="input-field">
        <input
          v-model.number="limit"
          id="limit"
          type="number"
        >
        <label for="limit">Лимит</label>
        <template v-if="formSubmitted">
          <span v-if="!limit" class="helper-text invalid">
            Введите лимит
          </span>
          <span v-else-if="limit < minLimit" class="helper-text invalid">
            Минимум {{ minLimit }}
          </span>
        </template>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  title: 'CategoryCreate',
  data() {
    return {
      title: '',
      limit: '',
      minLimit: 100,
      formSubmitted: false
    }
  },
  methods: {
    async onSubmit() {
      this.formSubmitted = true
      if (this.title.length && this.limit && this.limit >= this.minLimit) {
        try {
          const newCategoryData = {
            title: this.title,
            limit: this.limit
          }
          await this.$store.dispatch('createCategory', newCategoryData)

          this.title = ''
          this.limit = ''
          this.formSubmitted = false
          this.$successMessage(`Категория ${this.title} создана`)
          this.$emit('created', newCategoryData)
        } catch (error) {}
      }
    }
  }
}

/* TODO:
*   get categories from firebase
*   render select
*   update selected category view */
</script>
