import Vue from 'vue'
import Vuex from 'vuex'

import * as notes from './api/notes'
import * as profile from './api/profile'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    navLinks: false,
    notes: [],
    status: 'inbox'
  },
  getters: {
    entriesTypeNote: state => {
      return state.notes.filter(todo =>
        todo.type === 'note' && todo.status === state.status
      )
    }
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
    },
    updateProfile (state, payload) {
      state.profile = payload.profile
    },
    updateStatus (state, payload) {
      state.status = payload
    }
  },
  actions: {
    loadNotes ({ commit }) {
      commit('isLoading', { data: true })
      notes.get(res => {
        commit('updateNotes', { notes: res.data })
        commit('isLoading', { data: false })
      })
    },
    loadProfile ({ commit }) {
      commit('isLoading', { data: true })
      profile.get(res => {
        commit('updateProfile', { profile: res.data })
        commit('isLoading', { data: false })
      })
    },
    addNote ({ commit, dispatch }, payload) {
      commit('isLoading', { data: true })
      notes.add(payload.newNote, () => {
        dispatch('loadNotes')
        commit('isLoading', { data: false })
      })
    },
    editNote ({ commit, dispatch }, payload) {
      commit('isLoading', { data: true })
      const { orig, diff } = payload
      notes.update(orig, diff, () => {
        dispatch('loadNotes')
        commit('isLoading', { data: false })
      })
    },
    deleteNote ({ commit, dispatch }, payload) {
      commit('isLoading', { data: true })
      const { id } = payload
      notes.remove(id, () => {
        dispatch('loadNotes')
      })
    },
    switchStatus ({ commit }, payload) {
      commit('updateStatus', payload)
    }
  }
})
