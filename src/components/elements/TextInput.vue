<template>
  <fieldset :id="id + '-fieldset'">
    <label :for="id">{{label}}</label>
    <input :type="computedType" :id="id" :value="value" @input="onInput" />
  </fieldset>
</template>

<script>
export default {
  name: 'TextInput',
  props: ['id', 'value', 'type', 'label', 'onInput'],
  computed: {
    computedType: function () {
      return this.type ? this.type : 'text'
    }
  }
}
</script>
