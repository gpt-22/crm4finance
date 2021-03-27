<template>
  <div>
    <div class="page-title">
      <h3>{{ 'PlanningTitle' | localize }}</h3>
      <h4>{{ 'PlanningBalance' | localize }} {{ accountInfo.money }} ₽</h4>
    </div>

    <Preloader v-if="loading" />

    <h3
      v-else-if="!categories.length"
      class="center"
    >
      {{ 'PlanningTitleNoCategoriesPart1' | localize }}
      <router-link to="/categories">
        PlanningTitleNoCategoriesPart1
      </router-link>
    </h3>

    <section v-else>
      <div
        v-for="category in categories"
        :key="category.id"
      >
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spentMoney }} {{ 'PlanningTitleOf' | localize }} {{ category.limit }}
        </p>
        <div class="progress" v-tooltip="category.tooltipValue">
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
import localize from '@/filters/localize.filter'

export default {
  name: 'Planning',
  metaInfo() {
    return {
      title: this.$title('PlanningTitle')
    }
  },
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
      let tooltipValue
      if (spentMoney > category.limit) {
        tooltipValue = `${localize('PlanningTitleLimitExceeded')} \
         ${spentMoney - category.limit} ₽`
      } else if (spentMoney === category.limit) {
        tooltipValue = localize('PlanningTitleLimitReached')
      } else {
        tooltipValue = `${localize('PlanningTitleLimitLeft')} \
        ${category.limit - spentMoney} ₽`
      }
      mutatedCategory.spentMoney = spentMoney
      mutatedCategory.percent = formattedPercent
      mutatedCategory.color = this.getColor(formattedPercent)
      mutatedCategory.tooltipValue = tooltipValue
      return mutatedCategory
    })

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
