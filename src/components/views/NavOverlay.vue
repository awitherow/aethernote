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
        />

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

<style lang="scss">
@import '../../common/styles/index.scss';

#nav-overlay {
  button {
    border: none;

    &.close {
      position: absolute;
      right: 10px;
      top: 30px;
      width: 32px;
      height: 32px;

      &:before,
      &:after {
        position: absolute;
        left: 15px;
        top: 0;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: $grey;
      }

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
