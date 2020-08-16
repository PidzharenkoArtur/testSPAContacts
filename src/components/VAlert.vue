<template>
  <div
  class="alert"
  :title="title"
  :class="classButton"
  >
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'NoteCreation',
  props: {
    title: {
      type: String
    },
    color: {
      type: String
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
.alert {
  color: white;
  padding: 5px;
  font-size: 12px;
  border-radius: 5px;
  width: 100%; 
}
.color--green {
  background-color: #4caf50;
  border-color: #4caf50;
}
.color--red {
  background-color: red;
  border-color: red;
}

</style>
