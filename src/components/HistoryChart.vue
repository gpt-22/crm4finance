<template>
  <div class="history-chart">
    <canvas ref="pieChart" id="pieChart" class="pie-chart"></canvas>
  </div>
</template>

<script>
export default {
  name: 'HistoryChart',
  props: {
    categoriesTitles: {
      type: Array,
      required: true
    },
    outcomes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      myChart: {
        type: 'pie',
        data: {
          labels: this.categoriesTitles,
          datasets: [{
            label: '# Расходы по категориям',
            data: this.outcomes,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {}
      }
    }
  },
  mounted() {
    const ctx = this.$refs.pieChart
    // eslint-disable-next-line no-undef,no-new
    new Chart(ctx, this.myChart)
  }
}
</script>

<style scoped>
  .history-chart {
    position: relative;
  }
</style>
