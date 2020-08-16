<template>
  <div class="todo-list">
    <ToDoItem
    v-for="(item, i) in list"
    :item="item"
    widthTextToDo="100%" 
    :index="i"
    :list="list"
    :noteIndex="noteIndex"
    :key="i"
    :lengthList="list.length-1"
    :isMenuTodo="isMenu"
    @inputTextarea="$emit('inputTextarea', $event)"
    @indexToDo="$emit('indexToDo', $event)"
    @focus="$emit('focus', $event)"
    >
    </ToDoItem>
  </div>
</template>

<script>
import ToDoItem from '@/components/ToDoItem'

export default {
  name: 'ToDoList',
  props: {
    noteIndex: {
      type: Number
    },
    list: {
      type:Array
    },
    isMenu: {
      type: Boolean
    }
  },
  components: {
    ToDoItem
  }
}
</script>
<style lang="scss" scoped>
.todo-list{
  display: flex;
  flex-wrap: wrap;

  .item {
    display: flex;
    align-items: center;
    &:hover {
      color: #fb8c00; 
    }
  }
}
</style>
