<template>
  <div id="profile" v-if="!loading">
    <h1>Hello</h1>
    <span>
      {{ profile.name }}
    </span>
    <div v-if="profile">
      <h2>Stats</h2>
      <ul>
        <li>Exp: {{ profile.exp }}</li>
      </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Profile',
  created () {
    this.loadProfile()
  },
  computed: mapState({
    loading: state => state.loading,
    profile: state => state.profile
  }),
  methods: {
    ...mapActions([ 'loadProfile' ])
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/styles/index.scss';

#profile {
  height: 100%;
  color: $black;
  padding: 15px 30px;

  h1 {
    font-size: 24px;
    margin: 0;
  }

  h2 {
    font-size: 20px;
  }

  span {
    padding-left: 7px;
  }
}
</style>
