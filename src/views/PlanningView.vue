<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>Баланс {{ accountInfo.money }}₽</h4>
    </div>

    <Preloader v-if="loading" />

    <h3
      v-else-if="!categories.length"
      class="center"
    >
      Для начала <router-link to="/categories">создайте первую категорию</router-link>
    </h3>

    <section v-else>
      <div
        v-for="category in categories"
        :key="category.id"
      >
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spentMoney }} из {{ category.limit }}
        </p>
        <div class="progress" >
          <div
            class="determinate"
            :class="category.color"
            :style="{ width: category.percent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Planning',
  data() {
    return {
      loading: true,
      categories: [],
      money: null
    }
  },
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories')
    // console.log(categories)
    this.categories = categories.map(category => {
      const mutatedCategory = {
        ...category,
        spentMoney: 0,
        percent: 0,
        color: 'green'
      }

      const records = ('records' in category)
        ? Object.keys(category.records).map(key => category.records[key])
        : []

      const spentMoney = records
        .filter(record => record.type === 'outcome')
        .reduce((result, record) => result + +record.amount, 0)
      const spentPercent = spentMoney / category.limit
      const formattedPercent = spentPercent >= 100 ? 100 : spentPercent * 100

      mutatedCategory.spentMoney = spentMoney
      mutatedCategory.percent = formattedPercent
      mutatedCategory.color = this.getColor(formattedPercent)
      console.log(mutatedCategory.color)
      return mutatedCategory
    })

    // console.log(this.categories)

    this.loading = false
  },
  computed: {
    ...mapGetters(['accountInfo'])
  },
  methods: {
    getColor(percent) {
      let color = ''
      if (percent < 50) color = 'green'
      else if (percent < 75) color = 'yellow'
      else if (percent < 100) color = 'orange'
      else color = 'red'
      return color
    }
  }
}
</script>
