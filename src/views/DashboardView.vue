<template>
    <div>
      <div class="page-title">
        <h3>Счет</h3>

        <button class="btn waves-effect waves-light btn-small" @click="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <Preloader v-if="loading" />

      <div v-else class="row">
        <div class="col s12 m6 l4">
          <dashboard-bill :update="update"></dashboard-bill>
        </div>

        <div class="col s12 m6 l8">
          <dashboard-currencies :update="update"></dashboard-currencies>
        </div>
      </div>
    </div>
</template>

<script>
import messages from '@/utils/messages'
import DashboardBill from '@/components/DashboardBill'
import DashboardCurrencies from '@/components/DashboardCurrencies'

export default {
  name: 'Dashboard',
  components: {
    DashboardBill,
    DashboardCurrencies
  },
  data() {
    return {
      loading: true,
      currencies: null
    }
  },
  async mounted() {
    const routMessage = this.$route.query.message
    if (routMessage) {
      this.$successMessage(messages[routMessage])
    }

    const currencies = [
      { ticker: 'RUB', symbol: '₽', value: 1 },
      { ticker: 'USD', symbol: '$', value: null },
      { ticker: 'EUR', symbol: '€', value: null }
    ]
    const queries = currencies.slice(1).map(c => c.ticker + '_RUB').join(',')
    const response = await this.$store.dispatch('fetchCurrencies', queries)
    currencies.forEach(c => {
      if (!c.value) c.value = response[c.ticker + '_RUB'].val
    })
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }
    const updateTime = new Intl.DateTimeFormat('ru-RU', options).format(new Date())
    this.update = {
      dateTime: updateTime,
      currencies: currencies
    }
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      const currencies = [
        { ticker: 'RUB', symbol: '₽', value: 1 },
        { ticker: 'USD', symbol: '$', value: null },
        { ticker: 'EUR', symbol: '€', value: null }
      ]
      const queries = currencies.slice(1).map(c => c.ticker + '_RUB').join(',')
      const response = await this.$store.dispatch('fetchCurrencies', queries)
      currencies.forEach(c => {
        if (!c.value) c.value = response[c.ticker + '_RUB'].val
      })
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
      let updateTime = new Date()
      updateTime = new Intl.DateTimeFormat('ru-RU', options).format(updateTime)
      this.update = {
        dateTime: updateTime,
        currencies: currencies
      }
      this.loading = false
    }
  }
}
</script>
