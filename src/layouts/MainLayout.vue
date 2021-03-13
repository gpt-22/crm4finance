<template>
  <div class="app-main-layout">

    <main-layout-navbar @toggle-sidebar="toggleSidebar"></main-layout-navbar>

    <main-layout-sidebar v-model="isSidebarOpened"></main-layout-sidebar>

    <main
      class="app-content"
      :class="{ full: !isSidebarOpened }"
    >
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link to="/record" class="btn-floating btn-large blue">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import MainLayoutNavbar from '@/components/main-layout/MainLayoutNavbar'
import MainLayoutSidebar from '@/components/main-layout/MainLayoutSidebar'

export default {
  name: 'MainLayout',
  components: {
    MainLayoutNavbar,
    MainLayoutSidebar
  },
  data() {
    return {
      isSidebarOpened: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpened = !this.isSidebarOpened
    }
  }
}
</script>
