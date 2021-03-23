<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Preloader v-if="loading" />
    <h3
      v-else-if="!categories.length"
      class="center"
    >
      Для начала <router-link to="/categories">создайте первую категорию</router-link>
    </h3>
    <form
      v-else
      @submit.prevent="onSubmit"
      class="form"
    >
      <div class="input-field" >
        <select
          v-model="selectedCategory"
          ref="select"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category"
          >{{ category.title }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          v-model.number="amount"
          id="amount"
          type="number"
        >
        <label for="amount">Сумма</label>
        <template v-if="formSubmitted">
          <span v-if="amount === ''" class="helper-text invalid">Введите сумму</span>
          <span v-else-if="amount < 1" class="helper-text invalid">Минимум 1</span>
        </template>
      </div>

      <div class="input-field">
        <input
          v-model="description"
          id="description"
          type="text"
        >
        <label for="description">Описание</label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Record',
  data() {
    return {
      loading: true,
      select: null,
      categories: [],
      selectedCategory: null,
      type: 'income',
      amount: '',
      description: '',
      formSubmitted: false
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    if (this.categories.length) {
      this.selectedCategory = this.categories[0]
    }
    this.loading = false
    // wait for Vue to add form in template after setting loading=false
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.select)
    }, 0)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters(['accountInfo'])
  },
  methods: {
    canUserCreateRecord() {
      return !(this.type === 'outcome' && this.accountInfo.money < this.amount)
    },
    async createRecord() {
      const categoryID = this.selectedCategory.id
      const newRecordData = {
        type: this.type,
        amount: this.amount,
        description: this.description,
        date: new Date().toJSON()
      }
      await this.$store.dispatch('createRecord', {
        categoryID,
        newRecordData
      })
    },
    async onSubmit() {
      this.formSubmitted = true
      if (this.selectedCategory && this.amount !== '' && this.amount > 0) {
        console.log('form is valid')
        // check if user can create outcome record
        if (this.canUserCreateRecord()) {
          // create category
          try {
            await this.createRecord()
            this.$successMessage('Новая запись успешно создана')

            // change account money
            const newMoney = this.type === 'income'
              ? this.accountInfo.money + this.amount
              : this.accountInfo.money - this.amount
            console.log(newMoney)
            await this.$store.dispatch('updateAccountInfo', { money: newMoney })

            // clean form
            this.selectedCategory = null
            this.type = 'income'
            this.amount = ''
            this.description = ''
            this.formSubmitted = false
          } catch (error) {}
        } else {
          this.$errorMessage(`Недостаточно средств: ${this.amount - this.accountInfo.money}`)
        }
      }
    }
  }
}
</script>
