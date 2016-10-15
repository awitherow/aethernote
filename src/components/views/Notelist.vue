<template>
  <div id="note-list">
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
      <button v-on:click.prevent="addNote">+</button>
    </form>
    <ul>
      <li v-for="note in notes">
        {{ note.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import * as notes from '../../api/notes'

export default {
  name: 'Notelist',
  data: () => ({
    newNote: {
      content: '',
      prio: false,
      status: 'inbox',
      context: 'personal'
    },
    notes: {}
  }),
  created () {
    this.fetchNotes()
  },
  methods: {
    fetchNotes () {
      notes.get((notes) => {
        this.notes = notes.data
      })
    },
    addNote () {
      const { content, prio, status, context } = this.newNote
      notes.add({ content, prio, status, context }, () => {
        this.fetchNotes()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #add-note {
    display: flex;
    padding: 10px 25px 0 25px;

    fieldset,
    input,
    button {
      border: none;
    }

    .add-input {
      flex: auto;
    }

    fieldset {
      position: relative;
      padding: 0 10px;
      min-width: 15px;

      label {
        display: none;
      }

      input {
        border-bottom: 1px solid black;
        padding: 5px;
        width: 100%
      }
    }

    button {
      font-size: 18px;
      font-weight: 300;
      padding: 0 5px;
      background: none;
    }
  }
</style>
