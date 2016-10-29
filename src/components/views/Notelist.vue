<template>
  <div id="note-list" v-show="!loading">

    <form id="note-list__add-note">
      <fieldset>
        <label for="prio">Has priority?</label>
        <input
          name="prio"
          type="checkbox"
          v-model="newNote.prio"
          />
      </fieldset>
      <button class="submit" @click.prevent="add">Add</button>
      <TextInput
        id="content"
        label="Add new note:"
        :value="newNote.content"
        :onInput="changeHandler"
        />
    </form>

    <Dropdown
      id="status"
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
import CheckboxInput from '../elements/CheckboxInput'
import TextInput from '../elements/TextInput'

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
    Dropdown,
    CheckboxInput,
    TextInput
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
    changeHandler (e) {
      switch (e.target.id) {
        case 'status':
          this.switchStatus(e.target.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/styles/index.scss';
    #content-fieldset {
      flex: auto;
      padding: 8px 0 0 0;

      label {
        display: none;
      }

      input {
        border-bottom: 1px solid black;
        font-size: 14px;
        padding: 5px 0;
        width: 100%;
      }
    }
</style>
