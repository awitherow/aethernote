<template>
  <fieldset :id="id + '-fieldset'">
    <label :for="id">{{label}}</label>
    <input :id="id" :value="value" @input="onInput" />
  </fieldset>
</template>


<script>
export default {
  name: 'TextInput',
  props: ['id', 'value', 'label', 'onInput']
}
</script>
