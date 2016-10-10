<template lang=pug>
  #note-list(v-show="!loading")
    #add-note
      fieldset
        label(for="content")
        input(
          name="prio"
          v-model="newNote.content"
        )
      fieldset
        label(for="prio")
        input(
          name="prio"
          type="checkbox"
          v-model="newNote.prio"
        )
    ul
      li(v-for="note in notes") {{ note.title }}
</template>

<script>
export default {
  name: 'Notelist',
  props: ['notes', 'loading'],
  data: () => ({
    newNote: {
      content: '',
      prio: false,
      status: 'inbox',
      context: 'personal'
    }
  })
}
</script>

<style scoped>
</style>
