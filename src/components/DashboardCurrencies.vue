<template>
  <div class="card orange darken-3 bill-card">
    <div class="card-content white-text">
      <div class="card-header">
        <span class="card-title">
          {{ 'DashboardCurrenciesTitle' | localize }}
        </span>
      </div>
      <table>
        <thead>
        <tr>
          <th>{{ 'DashboardCurrenciesCurrency' | localize }}</th>
          <th>{{ 'DashboardCurrenciesExchangeRate' | localize }}</th>
          <th>{{ 'DashboardCurrenciesUpdateTime' | localize }}</th>
        </tr>
        </thead>

        <tbody>
          <tr
            v-for="c in update.currencies"
            :key="c.ticker"
          >
            <td>{{ c.symbol }}</td>
            <td>{{ c.value.toFixed(2) }}</td>
            <td>{{ update.dateTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCurrencies',
  props: ['update']
}
</script>
