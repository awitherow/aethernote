import Vue from 'vue'
import Vuex from 'vuex'

import * as notes from '../api/notes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    navLinks: false,
    notes: []
  },
  mutations: {
    isLoading (state, payload) {
      state.loading = payload.data
    },
    navLinksShown (state, data) {
      state.navLinks = data
    },
    updateNotes (state, payload) {
      state.notes = payload.notes
    }
  },
  actions: {
    loadNotes ({ commit, state }) {
      commit('isLoading', { data: 1 })
      notes.get(res => {
        commit('updateNotes', { notes: res.data })
        commit('isLoading', { data: 0 })
      })
    },
    addNote ({ commit, state, dispatch }, payload) {
      commit('isLoading', { data: 1 })
      notes.add(payload.newNote, () => {
        dispatch('loadNotes')
        commit('isLoading', { data: 0 })
      })
    }
  }
})
