<template>
  <div id="note-list" v-show="!loading">

    <form id="note-list__add-note">
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
      <button class="submit" @click.prevent="add">Add</button>
    </form>

    <Dropdown
      id="status-select"
      label="Status"
      :onChange="changeHandler"
      :selected="status"
      :options="statusTypes"/>

    <ul id="note-list__list">
      <li v-for="note in notes">
        <router-link :to="{
          name: 'note',
          params: { id: note.id }
          }">{{ note.title }}</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import statusTypes from '../../common/config/status-types'

import Dropdown from '../elements/Dropdown'

const local = {
  newNote: {
    content: '',
    prio: false,
    status: 'inbox'
  },
  statusTypes
}

export default {
  name: 'Notelist',
  components: {
    Dropdown
  },
  data: () => (local),
  created () {
    this.loadNotes()
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      status: state => state.status
    }),
    ...mapGetters({
      notes: 'entriesTypeNote'
    })
  },
  methods: {
    ...mapActions([ 'loadNotes', 'addNote', 'switchStatus' ]),
    add () {
      const { content, prio, status } = this.newNote
      this.addNote({ newNote: { content, prio, status } })
      this.newNote = {
        content: '',
        prio: false
      }
    },
    changeHandler (id, value) {
      switch (id) {
        case 'status-select':
          this.switchStatus(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#note-list {
  padding: 0 25px;

  &__add-note {
    display: flex;
    margin-top: 10px;

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

  &__list {
    margin: 0;
    padding-left: 0;
    list-style: none;

    li {
      margin: 5px 0;
    }
  }

  #status-select-fieldset {
    margin: 15px 0 10px 0;
    padding: 0;


  }
}

</style>
