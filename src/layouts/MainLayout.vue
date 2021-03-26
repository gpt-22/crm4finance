<template>
    <div class="app-main-layout">

      <main-layout-navbar @toggle-sidebar="toggleSidebar"></main-layout-navbar>

      <main-layout-sidebar
        v-model="isSidebarOpened"
        :key="locale"
      ></main-layout-sidebar>

      <main
        class="app-content"
        :class="{ full: !isSidebarOpened }"
      >
        <div class="app-page">
          <Preloader v-if="loading" />
          <router-view v-else />
        </div>
      </main>

      <div
        v-tooltip="'Добавить запись'"
        data-position="top"
        class="fixed-action-btn"
      >
        <router-link to="/record" class="btn-floating btn-large blue">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
</template>

<script>
import MainLayoutNavbar from '@/components/MainLayoutNavbar'
import MainLayoutSidebar from '@/components/MainLayoutSidebar'

export default {
  name: 'MainLayout',
  components: {
    MainLayoutNavbar,
    MainLayoutSidebar
  },
  data() {
    return {
      isSidebarOpened: true,
      loading: true
    }
  },
  async mounted() {
    const accountInfo = this.$store.getters.accountInfo
    if (accountInfo && accountInfo.constructor === Object && !Object.keys(accountInfo).length) {
      await this.$store.dispatch('fetchAccountInfo')
    }

    this.loading = false
  },
  computed: {
    locale() {
      return this.$store.getters.accountInfo.locale
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpened = !this.isSidebarOpened
    }
  }
}
</script>
