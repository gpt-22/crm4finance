<template>
  <div>
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">
        История
      </router-link>
      <a @click.prevent href="/" class="breadcrumb">
        {{ recordType }}
      </a>
    </div>

    <Preloader v-if="loading" />

    <div v-else-if="record" class="row">
      <div class="col s12 m6">
        <div class="card" :class="recordClass">
          <div class="card-content white-text">
            <p>Описание: {{ record.description }}</p>
            <p>Сумма: {{ record.amount }}</p>
            <p>Категория: {{ category.title }}</p>
            <small>{{ recordDate }}</small>
          </div>
        </div>
      </div>
    </div>

    <h3 v-else class="center">
      Записи с id {{ $route.params.id }} нет. <router-link to="/record">Создать запись</router-link>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'Record-detail',
  data() {
    return {
      loading: true,
      category: null,
      record: null
    }
  },
  async mounted() {
    const categoryID = this.$route.params.category_id
    this.category = await this.$store.dispatch('fetchCategoryByID', {
      ID: categoryID
    })
    this.record = await this.$store.dispatch('fetchRecordByID', {
      categoryID,
      ID: this.$route.params.id
    })
    this.loading = false
  },
  computed: {
    recordClass() {
      return this.record.type === 'income' ? 'green' : 'red'
    },
    recordType() {
      let type
      if (this.record) {
        type = this.record.type === 'income' ? 'Доход' : 'Расход'
      } else type = 'Запись'
      return type
    },
    recordDate() {
      const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      const dateObj = new Date(this.record.date)
      return new Intl.DateTimeFormat('ru-RU', options).format(dateObj)
    }
  }
}
</script>
