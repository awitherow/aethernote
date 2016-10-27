<template>
  <fieldset :id="id + '-fieldset'">
    <label :for="id">{{label}}</label>
    <select
      :id="id"
      name="select"
      @change="onChange"
      v-model="currentOption">
        <option v-for="option in options">{{option}}</option>
    </select>
  </fieldset>
</template>

<script>
export default {
  name: 'Dropdown',
  props: ['id', 'selected', 'options', 'label', 'onChange'],
  computed: {
    currentOption () {
      return this.selected
    }
  }
}
</script>
