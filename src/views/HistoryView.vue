<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <Preloader v-if="loading" />

    <h3
      v-else-if="!records.length"
      class="center"
    >
      Записей нет. <router-link to="/categories">Создайте первую!</router-link>
    </h3>

    <section v-else>
      <history-chart></history-chart>
      <history-table :records="records"></history-table>
    </section>
  </div>
</template>

<script>
import HistoryChart from '@/components/HistoryChart'
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'History',
  components: {
    HistoryChart,
    HistoryTable
  },
  data() {
    return {
      loading: true,
      categories: [],
      records: []
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')

    const records = []

    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
    this.categories.forEach(category => {
      const categoryRecords = ('records' in category)
        ? Object.keys(category.records).map(key => {
          const record = category.records[key]
          record.id = key
          return record
        })
        : []

      console.log(categoryRecords)
      categoryRecords.forEach(record => {
        record.categoryTitle = category.title
        record.typeClass = record.type === 'income' ? 'green' : 'red'
        record.typeText = record.type === 'income' ? 'Доход' : 'Расход'
        const dateObj = new Date(record.date)
        record.date = new Intl.DateTimeFormat('ru-RU', options).format(dateObj)
      })
      records.push(...categoryRecords)
    })
    this.records = records
    this.loading = false
  }
}
</script>
