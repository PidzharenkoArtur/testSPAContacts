<template>
  <input
  v-model="value"
  autofocus
  class="input"
  :placeholder="placeholder"
  />
</template>

<script>

export default {
  name: 'VInput',
  props: {
    _value: {
      type:String
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      value: this._value
    }
  },
  watch: {
    value(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.input{
  width: 100%;
  box-sizing: border-box;
  font-weight: bold;
  padding: 9px;
  border:2px solid #fb8c00;
  border-radius: 5px; 
  outline: none;
}

</style>
