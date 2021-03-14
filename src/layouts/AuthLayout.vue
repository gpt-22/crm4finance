<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
  name: 'AuthLayout',
  computed: {
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
