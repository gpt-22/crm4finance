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
export default {
  name: 'MainLayoutSidebar',
  props: ['value'],
  data() {
    return {
      links: [
        { to: '/', text: 'Счет' },
        { to: '/history', text: 'История' },
        { to: '/planning', text: 'Планирование' },
        { to: '/record', text: 'Новая запись' },
        { to: '/categories', text: 'Категории' }
      ],
      activeLink: null
    }
  }
}
</script>
