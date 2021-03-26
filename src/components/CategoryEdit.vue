<template>
  <div>
    <div class="page-subtitle">
      <h4>{{ 'CategoryEditTitle' | localize }}</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field" >
        <select
          ref="select"
          v-model="selected"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category"
          >{{ category.title }}</option>
        </select>
        <label>
          {{ 'CategoryEditSelectLabel' | localize }}
        </label>
      </div>

      <div class="input-field">
        <input
          v-model.trim="newTitle"
          type="text"
          id="name"
        >
        <label for="name" class="active">
          {{ 'CategoryEditCategoryTitleLabel' | localize }}
        </label>
        <template v-if="formSubmitted">
          <span
            v-if="!newTitle.length"
            class="helper-text invalid"
          >
            {{ 'CategoryEditCategoryTitleHintRequired' | localize }}
          </span>
        </template>
      </div>

      <div class="input-field">
        <input
          v-model.number="newLimit"
          id="limit"
          type="number"
        >
        <label for="limit" class="active">
          {{ 'CategoryEditCategoryLimitLabel' | localize }}
        </label>
        <template v-if="formSubmitted">
          <span v-if="!newLimit" class="helper-text invalid">
            {{ 'CategoryEditCategoryLimitHintRequired' | localize }}
          </span>
          <span v-else-if="newLimit < minLimit" class="helper-text invalid">
            {{ 'CategoryEditCategoryLimitHintMinimum' | localize }} {{ minLimit }}
          </span>
        </template>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'CategoryEditButton' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import localize from '../filters/localize.filter'

export default {
  name: 'CategoryEdit',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      select: null,
      selected: this.categories[0],
      newTitle: this.categories[0].title,
      newLimit: this.categories[0].limit,
      formSubmitted: false,
      minLimit: 100
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  watch: {
    selected(newValue, oldValue) {
      this.newTitle = newValue.title
      this.newLimit = newValue.limit
    }
  },
  methods: {
    isNewValuesAreValid() {
      return this.newTitle.length && this.newLimit && this.newLimit >= this.minLimit
    },
    areNewValuesNotEqualPrev() {
      return this.newTitle !== this.selected.title || this.newLimit !== this.selected.limit
    },
    async onSubmit() {
      this.formSubmitted = true
      if (this.isNewValuesAreValid() && this.areNewValuesNotEqualPrev()) {
        try {
          const newCategoryData = {
            id: this.selected.id,
            title: this.newTitle,
            limit: this.newLimit
          }
          await this.$store.dispatch('updateCategory', newCategoryData)
          this.formSubmitted = false
          this.$successMessage(
            `${
              localize('SuccessMessagePart1')
            } ${this.selected.title} ${
              localize('SuccessMessagePart2')
            }`
          )
          this.$emit('updated', newCategoryData)
        } catch (error) {}
      }
    }
  }
}
</script>
