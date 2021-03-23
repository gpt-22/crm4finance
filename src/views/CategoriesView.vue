<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Preloader v-if="loading" />
      <div v-else class="row">
        <div class="col s12 m6">
          <category-create
            @created="onCreated"
          ></category-create>
        </div>
        <div class="col s12 m6">
          <category-edit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="onUpdated"
          ></category-edit>
          <h2 v-else>Создайте свою первую категорию :)</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'Categories',
  components: {
    CategoryCreate,
    CategoryEdit
  },
  data() {
    return {
      loading: true,
      categories: [],
      updateCount: 0
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    onCreated(newCategory) {
      this.categories.push(newCategory)
    },
    onUpdated(updatedCategory) {
      const idx = this.categories.findIndex(category => category.id === updatedCategory.id)
      this.categories[idx].title = updatedCategory.title
      this.categories[idx].limit = updatedCategory.limit
      this.updateCount++
    }
  }
}
</script>
