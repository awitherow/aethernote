<template>
  <transition name="fade">
    <div
      class="overlay"
      id="nav-overlay"
      v-show="navLinks">

      <ul>
        <li v-for="link in linkList">
          <a v-bind:href="link.href">
            {{ link.text }}
          </a>
        </li>
      </ul>

      <button
        v-on:click="closeNavlinks"
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
    }
  }
}
</script>

<style lang="scss">
@import '../../common/styles/index.scss';

#nav-overlay {
  ul {
    padding: 0;
    margin: 0;
    text-transform: uppercase;
    text-align: center;

    li {
      list-style: none;
      font-size: 18px;
      padding-bottom: 5px;

      a {
        color: $gold;
        text-decoration: none;

        &:hover {
          color: white;
        }
      }
    }
  }

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
        background-color: $gold;
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
