<template>
  <div class="todo-all">
    <ToDoList
    :isMenu="true"
    :noteIndex="noteIndex" 
    :list="toDoList"
    @inputTextarea="valueTextarea=$event"
    @focus="focus"
    @indexToDo="currentIndexToDo=$event"
    />
    <ToDoCreation
    :valueTextarea="valueTextarea"
    :currentIndexToDo="currentIndexToDo"
    :isFocus="isFocus"
    />
  </div>
</template>

<script>
import ToDoCreation from '../components/ToDoCreation'
import ToDoList from '../components/ToDoList'

export default {
  name: 'ToDoAll',
  props: {
    noteIndex: {
      type: Number
    },
    toDoList: {
      type: Array
    }
  },
  data() {
    return {
      valueTextarea: null,
      currentIndexToDo: null,
      isFocus: null,
    }
  },
  methods: {
    focus(e) {
      this.isFocus=e
    }
  },
  components: {
    ToDoList,
    ToDoCreation
  }
}
</script>

<style lang="scss" scoped>
.todo-all {
  display: flex;
  flex-direction: column;
}
</style>

