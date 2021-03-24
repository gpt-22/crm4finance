<template>
  <ul class="pagination center">
    <li
      :class="activePage === 1 ? 'disabled' : 'waves-effect'"
      @click="$emit('changePage', prevPage)"
    >
      <router-link :to="$route.path">
        <i class="material-icons">chevron_left</i>
      </router-link>
    </li>

    <li
      v-for="(page, idx) in pagesCount"
      :key="page"
      @click="$emit('changePage', idx + 1)"
      :class="(idx + 1) === activePage ? 'active' : 'waves-effect'"
    >
      <router-link :to="$route.path">
        {{ idx + 1 }}
      </router-link>
    </li>

    <li
      @click="$emit('changePage', nextPage)"
      :class="activePage === pagesCount ? 'disabled' : 'waves-effect'"
    >
      <router-link :to="$route.path">
        <i class="material-icons">chevron_right</i>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HistoryPagination',
  props: {
    pagesCount: {
      type: Number,
      required: true
    },
    activePage: {
      type: Number,
      required: true
    }
  },
  computed: {
    prevPage() {
      return (this.activePage === 1)
        ? this.activePage
        : this.activePage - 1
    },
    nextPage() {
      return (this.activePage === this.pagesCount)
        ? this.activePage
        : this.activePage + 1
    }
  }
}
</script>
