<template>
  <fieldset :id="id + '-fieldset'">
    <label :for="id">{{label}}</label>
    <input
      :id="id"
      type="checkbox"
      :checked="checked"
      @change="onChange"
      />
  </fieldset>
</template>

<script>
export default {
  name: 'CheckboxInput',
  props: ['id', 'checked', 'label', 'onChange']
}
</script>
