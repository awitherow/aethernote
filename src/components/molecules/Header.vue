<template lang="pug">
  #header
    h1 {{ text }}
</template>

<script>
export default {
  name: 'AppHeader',
  data: () => ({
    text: 'Aether'
  })
}
</script>

<style scoped>
#header {
  background: black;
}

h1 {
  font-size: 24px;
  margin: 0;
  color: white;
  padding: 15px 30px;
}
</style>
