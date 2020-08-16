<template>
  <button
  class="button"
  :title="title"
  v-on="$listeners"
  :class="classButton"
  >
    <slot/>
  </button>
</template>

<script>

export default {
  name: 'NoteCreation',
  props: {
    size: {
      type: String
    },
    title: {
      type: String
    },
    color: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classButton() {
      let classElement = '';

      for (const prop in this.$props) {
        classElement += prop + '--' + this.$props[prop] + ' '
      }

      return classElement
    }
  },
  
}
</script>

<style lang="scss" scoped>
.button{
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  padding: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}
.color--green {
  background-color: #4caf50;
  border-color: #4caf50;
}
.color--red {
  background-color: red;
  border-color: red;
}
.size--null {
  padding: 0;
  font-size: 0;  
}
.size--large {
  font-size: 20px;
}
.size--small {
  padding: 5px;
  font-size: 16px;
}
.size--middle {
  padding: 10px;
  font-size: 16px;
}
.disabled--false {
  cursor: default;
  background-color: #777;
  border-color: #777; 

  &:hover {
    opacity: 1;
  }
}
</style>
