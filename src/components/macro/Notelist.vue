<template lang=pug>
  #note-list(v-show="!loading")
    ul
      li(v-for="note in notes") {{ note.title }}
</template>

<script>
export default {
  name: 'Notelist',
  props: ['notes', 'loading']
}
</script>

<style scoped>
</style>
