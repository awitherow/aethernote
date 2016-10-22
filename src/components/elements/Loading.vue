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
  position: fixed;
  background: white;
  color: black;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 42px;
  color: $gold;
}
</style>
