<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">
        {{ 'DashboardBillTitle' | localize }}
      </span>

      <p
        v-for="currency in update.currencies"
        :key="currency.ticker"
        class="currency-line"
      >
        <span>{{ currencyToString(currency) }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardBill',
  props: ['update'],
  methods: {
    currencyToString(currency) {
      const amount = this.$store.getters.accountInfo.money / currency.value
      return `${amount.toFixed(0)} ${currency.symbol}`
    }
  }
}
</script>
