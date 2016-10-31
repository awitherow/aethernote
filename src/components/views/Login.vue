<template>
  <form id="profile" @submit.prevent="attemptLogin">

    <TextInput
      id="username"
      label="username"
      :value="username"
      :onInput="update"
      />

    <TextInput
      id="password"
      label="password"
      type="password"
      :value="password"
      :onInput="update"
      />

      <input type="submit" />

  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TextInput from '../elements/TextInput'

let local = {
  username: '',
  password: ''
}

export default {
  name: 'Login',
  components: {
    TextInput
  },
  data: () => (local),
  created () {
    if (this.authenticated) this.$router.go('/')
  },
  computed: mapState({
    authenticated: state => state.authenticated
  }),
  methods: {
    ...mapActions(['authenticate']),
    update (e) {
      this[e.target.id] = e.target.value
    },
    attemptLogin () {
      this.authenticate({
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/styles/index.scss';
</style>
