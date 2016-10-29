<template>
  <div id="note-list" v-show="!loading">

    <form id="note-list__add-note">

      <TextInput
        id="content"
        label="Add new note:"
        :value="newNote.content"
        :onInput="changeHandler"
        />

      <CheckboxInput
        id="prio"
        label="Prio?"
        :checked="newNote.prio"
        :onChange="changeHandler"
        />

      <button class="submit" @click.prevent="add"> &#43; </button>
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
          break
        case 'prio':
          this.newNote.prio = e.target.checked
          break
        case 'content':
          this.newNote.content = e.target.value
          break
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../common/styles/index.scss';

#note-list {
  margin: 8px;
  background: rgba(255,255,255,0.9);
  padding: 8px;

  &__add-note {
    display: flex;
    margin-bottom: 8px;

    #content-fieldset {
      flex: auto;
      padding: 0;

      label {
        display: none;
      }

      input {
        border-bottom: 1px solid black;
        font-size: 14px;
        padding: 8px;
        width: 94%;
      }
    }

    #prio-fieldset {
      padding: 0;
      margin: 0 8px;

      input[type="checkbox"] {
        display: none;
        
        &:checked {
          + label {
            background: #1874b5;
            border-color: #1874b5;
            color: #fff;
            transition: all 125ms ease-out;
          }
        }
      }

      label {
        border: 1px solid black;
        color: #444;
        cursor: pointer;
        font-size: 11px;
        display: inline-block;
        padding: 10px;
        text-transform: uppercase;
        transition: none;
      }
    }

    button {
      font-size: 16px;
      border: 1px solid black;
      padding: 0 16px;
    }
  }
}
</style>
