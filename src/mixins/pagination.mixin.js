export default {
  props: {
    entries: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activePage: +this.$route.query.page || 1,
      pageEntriesCount: 3
    }
  },
  computed: {
    pagesCount() {
      return Math.ceil(this.entries.length / this.pageEntriesCount)
    },
    paginatedEntries() {
      return this.entries.slice(
        this.pageEntriesCount * (this.activePage - 1),
        this.pageEntriesCount * this.activePage
      )
    }
  },
  methods: {
    changePage(idx) {
      this.activePage = idx
      this.$router.push(`${this.$route.path}?page=${idx}`)
    }
  }
}
