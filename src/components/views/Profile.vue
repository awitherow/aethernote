<template>
  <div id="profile" v-if="profileOpen">
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
export default {
  name: 'Profile',
  props: ['profileOpen', 'profile'],
  data: () => ({
    text: 'Profile page!'
  })
}
</script>

<style scoped>
#profile {
  background: black;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
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
