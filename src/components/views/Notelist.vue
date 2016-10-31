<template>
  <div id="note-list" class="panel" v-show="!loading">

    <form id="note-list__add-note">

      <TextInput
        id="content"
        label="Add new note:"
        :value="newNote.content"
        :onInput="changeHandler"
        />

      <CheckboxInput
        id="prio"
        icon="heart"
        :checked="newNote.prio"
        :onChange="changeHandler"
        />

      <button class="submit" @click.prevent="add"> &#43; </button>
    </form>

    <div class="refinery">
      <Dropdown
        id="status"
        label="Status"
        :onChange="changeHandler"
        :selected="status"
        :options="statusTypes"
        />
    </div>

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
      status: state => state.status,
      authenticated: state => state.authenticated
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

  .refinery {

    #status-fieldset {
      padding: 0;

      label {
        display: none;
      }

      #status {
        font-size: 14px;
        text-transform: uppercase;
      }
    }
  }
}
</style>
