<template>
  <input
  v-model="value"
  autofocus
  class="input"
  placeholder="Заголовок"
  />
</template>

<script>

export default {
  name: 'VInput',
  props: {
    _value: {
      type:String
    }
  },
  data() {
    return {
      value: null
    }
  },
  watch: {
    _value(val) {
      this.value = val
    },
    value(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.input{
  font-weight: bold;
  padding: 9px;
  border:2px solid #fb8c00;
  border-radius: 5px; 
  outline: none;
}

</style>
