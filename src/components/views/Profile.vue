<template lang="pug">
  #profile(v-if="profileOpen")
    h1 Hello
      span(v-if="profile") {{ profile.name ? profile.name : '...' }}
    div(v-if="profile")
      h2 Stats
      ul
        li Exp: {{ profile.exp }}
</template>

<script>
export default {
  name: 'Profile',
  props: ['profileOpen', 'profile'],
  data: () => ({
    text: 'Profile page!'
  })
}
</script>

<style lang="stylus" scoped>
#profile
  background black
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  color white
  padding: 15px 30px;

h1
  font-size 24px
  margin 0

h2
  font-size 20px

span
  padding-left 7px
</style>
