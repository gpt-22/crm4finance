<template>
  <ul
    class="sidenav app-sidenav"
    :class="{ 'open': value }"
  >
    <router-link
      v-for="(link, idx) in links"
      :key="link.to"
      :to="link.to"
    >
      <li
        @click="activeLink = idx"
        :class="{active: activeLink === idx}"
      >
        <a href="#" class="waves-effect waves-orange pointer">{{ link.text }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import localize from '@/filters/localize.filter'

export default {
  name: 'MainLayoutSidebar',
  props: ['value'],
  data() {
    return {
      links: [
        { to: '/', text: localize('SidebarLinkDashboard') },
        { to: '/history', text: localize('SidebarLinkHistory') },
        { to: '/planning', text: localize('SidebarLinkPlanning') },
        { to: '/record', text: localize('SidebarLinkNewRecord') },
        { to: '/categories', text: localize('SidebarLinkCategories') }
      ],
      activeLink: null
    }
  }
}
</script>
