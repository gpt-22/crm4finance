<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'
import messages from '@/utils/messages'

export default {
  components: {
    MainLayout,
    AuthLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    },
    error() {
      // returns the error from Firebase to display
      return this.$store.getters.error
    }
  },
  watch: {
    error(newErrorFromComputed, oldError) {
      // when the error is changed show toast error message
      this.$errorMessage(messages[newErrorFromComputed.code] || 'Что пошло не так...')
    }
  }
}
</script>

<style lang="less">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
