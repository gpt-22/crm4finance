<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
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

    <AppPagination
      @changePage="changePage"
      :pagesCount="pagesCount"
      :active-page="activePage"
    />
  </div>

</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import AppPagination from '@/components/AppPagination'

export default {
  name: 'HistoryTable',
  mixins: [paginationMixin],
  components: { AppPagination },
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
