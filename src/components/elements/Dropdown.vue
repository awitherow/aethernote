<template>
  <fieldset :id="id + '-fieldset'">
    <label :for="id">{{label}}</label>
    <select
      :id="id"
      name="select"
      @change="handleChange"
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
  },
  methods: {
    handleChange (e) {
      this.onChange(this.id, e.target.value)
    }
  }
}
</script>
