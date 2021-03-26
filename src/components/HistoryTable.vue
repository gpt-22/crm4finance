<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{{ 'HistoryTableSum' | localize }}</th>
          <th>{{ 'HistoryTableDate' | localize }}</th>
          <th>{{ 'HistoryTableCategories' | localize }}</th>
          <th>{{ 'HistoryTableType' | localize }}</th>
          <th>{{ 'HistoryTableOpen' | localize }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(record, idx) in paginatedEntries"
          :key="record.id"
        >
          <td>{{ idx + 1 }}</td>
          <td>{{ record.amount }}</td>
          <td>{{ record.date }}</td>
          <td>{{ record.categoryTitle }}</td>
          <td>
            <span
              class="white-text badge"
              :class="record.typeClass"
            >
              {{ record.typeText }}
            </span>
          </td>
          <td>
            <button
              @click="goToRecordDetail(record.categoryID, record.id)"
              v-tooltip="'Посмотреть запись'"
              data-position="left"
              class="btn-small btn"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      @changePage="changePage"
      :pagesCount="pagesCount"
      :active-page="activePage"
    />
  </div>

</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'

export default {
  name: 'HistoryTable',
  mixins: [paginationMixin],
  data() {
    return {
      pageEntriesCount: 5
    }
  },
  methods: {
    goToRecordDetail(categoryID, recordID) {
      this.$router.push(`/record-detail/${categoryID}/${recordID}/`)
    }
  }
}
</script>
