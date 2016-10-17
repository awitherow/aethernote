import Vue from 'vue'
import Vuex from 'vuex'

import * as notes from './api/notes'
import * as profile from './api/profile'

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
    },
    updateProfile (state, payload) {
      state.profile = payload.profile
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
    loadProfile ({ commit, state }) {
      commit('isLoading', { data: 1 })
      profile.get(res => {
        commit('updateProfile', { profile: res.data })
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
