<template>
  <transition name="fade">
    <div
      class="overlay"
      id="nav-overlay"
      v-show="navLinks">

      <ul>
        <li v-for="link in linkList">
          <button
            @click="routeTo(link.href)"
            >{{ link.text }}</button>
        </li>
      </ul>

      <button
        @click="closeNavlinks"
        v-show="navLinks"
        class="close"
        > &#9587; </button>

    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavOverlay',
  data: () => ({
    linkList: [
      {
        text: 'NoteList',
        href: '/'
      },
      {
        text: 'Profile',
        href: '/profile'
      },
      {
        text: 'Journal',
        href: '/journal'
      }
    ]
  }),
  computed: {
    ...mapState([ 'navLinks' ])
  },
  methods: {
    closeNavlinks () {
      this.$store.commit('navLinksShown', false)
    },
    routeTo (route) {
      this.$router.push(route)
      this.closeNavlinks()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/styles/index.scss';

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
}

ul {
  list-style: none;
  padding: 0;
  text-align: center;

  button {
    font-size: 18px;
  }
}
</style>
