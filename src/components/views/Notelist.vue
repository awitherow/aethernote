<template>
  <div id="note-list" v-show="!loading">
    <form id="add-note">
      <fieldset class="add-input">
        <label for="content">Add new note:</label>
        <input
          name="content"
          v-model="newNote.content"
          />
      </fieldset>
      <fieldset>
        <label for="prio">Has priority?</label>
        <input
          name="prio"
          type="checkbox"
          v-model="newNote.prio"
          />
      </fieldset>
      <button v-on:click.prevent="add">+</button>
    </form>
    <ul>
      <li v-for="note in notes">
        {{ note.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Notelist',
  data: () => ({
    newNote: {
      content: '',
      prio: false,
      status: 'inbox',
      context: 'personal'
    },
    notes: []
  }),
  created () {
    this.loadNotes()
  },
  computed: mapState({
    loading: state => state.loading,
    notes: state => state.notes
  }),
  methods: {
    ...mapActions([ 'loadNotes', 'addNote' ]),
    add () {
      const { content, prio, status } = this.newNote
      this.addNote({ newNote: { content, prio, status } })
      this.newNote = {
        content: '',
        prio: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #add-note {
    display: flex;
    padding: 10px 25px 0 25px;

    .submit {
      font: 14px Roboto Condensed;
      padding: 5px 10px;
    }

    .add-input {
      flex: auto;
    }

    fieldset {
      position: relative;
      padding: 0 10px;
      min-width: 15px;

      input {
        border-bottom: 1px solid black;
        padding: 7.5px;
        width: 100%
      }

      input[type="checkbox"] {
        font-size: 24px;
        margin: 5px;
      }

      label {
        display: none;
      }
    }
  }
</style>
