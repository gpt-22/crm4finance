<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggle-sidebar')" >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | datetime }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{ 'NavbarLinkProfile' | localize }}
              </router-link>
            </li>
            <li class="divider"></li>
            <li>
              <a href="#" @click.prevent="logout" class="black-text">
                <i class="material-icons">assignment_return</i>
                {{ 'NavbarLinkSignOut' | localize }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainLayoutNavbar',
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null
    }
  },
  mounted() {
    // eslint-disable-next-line
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
    clearInterval(this.interval)
  },
  computed: {
    name() {
      return this.$store.getters.accountInfo.name
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('signOut')
      await this.$router.push('/sign-in?message=sign-out')
    }
  }
}
</script>
