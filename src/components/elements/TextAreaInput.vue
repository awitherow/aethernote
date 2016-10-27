<template>
  <fieldset :id="id + '-fieldset'">
    <label :for="id">{{label}}</label>
    <textarea id="content" :value="value" @input="onInput" />
  </fieldset>
</template>

<script>
export default {
  name: 'TextAreaInput',
  props: ['id', 'value', 'label', 'onInput']
}
</script>

<style lang="scss">
</style>
