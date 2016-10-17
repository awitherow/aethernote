<template>
  <div id="profile">
    <h1>Hello</h1>
    <span v-if="profile">
      {{ profile.name ? profile.name : '...' }}
    </span>
    <div v-if="profile">
      <h2>Stats</h2>
      <ul>
        <li>Exp: {{ profile.exp }}</li>
      </ul>
    </div>
</template>

<script>
import * as profile from '../../api/profile'

export default {
  name: 'Profile',
  data: () => ({
    profile: {}
  }),
  created () {
    this.fetchProfile()
  },
  methods: {
    fetchProfile () {
      profile.get(profile => {
        this.profile = profile.data
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../common/styles/index.scss';

#profile {
  height: 100%;
  color: $gold;
  padding: 15px 30px;
}

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
</style>
