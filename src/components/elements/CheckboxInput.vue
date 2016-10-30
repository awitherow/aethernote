<template>
  <fieldset :id="id + '-fieldset'">
    <label :for="id" v-if="this.icon">{{ iconLabel }}</label>
    <label :for="id" v-else>{{ label }}</label>
    <input
      :id="id"
      type="checkbox"
      :checked="checked"
      @change="onChange"
      />
  </fieldset>
</template>

<script>
const iconMap = {
  heart: '<3',
  heartBroken: '</3'
}

export default {
  name: 'CheckboxInput',
  props: ['id', 'checked', 'icon', 'label', 'onChange'],
  computed: {
    iconLabel: function () {
      if (this.checked) {
        return iconMap[this.icon]
      } else {
        switch (this.icon) {
          case 'heart':
            return iconMap['heartBroken']
        }
      }
    }
  }
}
</script>
