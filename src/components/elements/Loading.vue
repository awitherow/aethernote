<template>
  <div id="loading" v-show="loading">
    <span class="loading dots2"/>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['loading']
}
</script>

<style lang="scss">
@import '../../common/styles/index.scss';
#loading {
  font-size: 42px;
  color: $gold;
}
</style>
