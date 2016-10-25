<template>
  <div>
    Hello! {{ $route.params.id }}
  </div>
</template>

<script>
let local = {}

export default {
  name: 'Note',
  data: () => (local)
}
</script>

<style lang="scss" scoped>
</style>
