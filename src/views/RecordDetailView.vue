<template>
  <div>
    <div class="breadcrumb-wrap">
      <router-link to="/history?page=1" class="breadcrumb">
        {{ 'RecordDetailBreadcrumb' | localize }}
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
            <p>{{ 'RecordDetailDescription' | localize }} {{ record.description }}</p>
            <p>{{ 'RecordDetailSummary' | localize }} {{ record.amount }}</p>
            <p>{{ 'RecordDetailCategory' | localize }} {{ category.title }}</p>
            <small>{{ recordDate }}</small>
          </div>
        </div>
      </div>
    </div>

    <h3 v-else class="center">
      {{ 'RecordDetailNoRecordPart1' | localize }} {{ $route.params.id }}
      {{ 'RecordDetailNoRecordPart2' | localize }}
      <router-link to="/record">
        {{ 'RecordDetailNoRecordPart3' | localize }}
      </router-link>
    </h3>
  </div>
</template>

<script>
import localize from '@/filters/localize.filter'
import datetime from '@/filters/format-datetime.filter'

export default {
  name: 'Record-detail',
  metaInfo() {
    return {
      title: this.$title('RecordDetailTitle')
    }
  },
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
        type = (this.record.type === 'income')
          ? localize('Income')
          : localize('Outcome')
      } else type = localize('Record')
      return type
    },
    recordDate() {
      return datetime(new Date(this.record.date))
    }
  }
}
</script>
