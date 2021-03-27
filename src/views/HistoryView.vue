<template>
  <div>
    <div class="page-title">
      <h3>{{ 'HistoryTitle' | localize }}</h3>
    </div>

    <Preloader v-if="loading" />

    <h3
      v-else-if="!records.length"
      class="center"
    >
      {{ 'HistoryNoRecordsPart1' | localize }}
      <router-link to="/record">
        {{ 'HistoryNoRecordsPart2' | localize }}
      </router-link>
    </h3>

    <section v-else>
      <history-chart
        :categories-titles="categoriesTitles"
        :outcomes="outcomes"></history-chart>
      <history-table :entries="records"></history-table>
    </section>
  </div>
</template>

<script>
import HistoryChart from '@/components/HistoryChart'
import HistoryTable from '@/components/HistoryTable'
import datetime from '@/filters/format-datetime.filter'
import localize from '@/filters/localize.filter'

export default {
  name: 'History',
  metaInfo() {
    return {
      title: this.$title('HistoryTitle')
    }
  },
  components: {
    HistoryChart,
    HistoryTable
  },
  data() {
    return {
      loading: true,
      categoriesTitles: [],
      outcomes: [],
      records: []
    }
  },
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories')
    this.categoriesTitles = categories.map(category => category.title)

    const records = []
    categories.forEach(category => {
      const categoryRecords = ('records' in category)
        ? Object.keys(category.records).map(key => {
          const record = category.records[key]
          record.id = key
          return record
        })
        : []

      this.calcCategoryOutcomes(categoryRecords)

      categoryRecords.forEach(record => {
        record.categoryID = category.id
        record.categoryTitle = category.title
        record.typeClass = record.type === 'income' ? 'green' : 'red'
        record.typeText = (record.type === 'income')
          ? localize('Income')
          : localize('Outcome')
        record.date = datetime(new Date(record.date))
      })
      records.push(...categoryRecords)
    })
    this.records = records
    this.loading = false
  },
  methods: {
    calcCategoryOutcomes(categoryRecords) {
      this.outcomes.push(categoryRecords
        .filter(record => record.type === 'outcome')
        .reduce((outcomes, record) => outcomes + record.amount, 0))
    }
  }
}
</script>
