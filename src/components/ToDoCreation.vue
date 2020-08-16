<template>
  <div class="todo-creation">
    <div class="button-left">
      <template v-if="isFocus">
        <VAlert
        v-if="valueText"
        color="green"
        size="small"
        >
          Теперь задача сохранена
        </VAlert> 
        <VAlert
        v-if="!valueText"
        color="red"
        size="small"
        >
          Введите текст, чтобы сохранить задачу
        </VAlert>
      </template> 
      <VButton
      v-if="!isFocus"
      class="button-create"
      size="small"
      @click="clickCreateTodo()"
      >
        + Создать задачу
      </VButton>
    </div>
  </div>
</template>

<script>
import VButton from '@/components/VButton'
import VAlert from '@/components/VAlert'
import { mapMutations } from 'vuex';

export default {
  name: 'ToDoCreation',
  props: {
    valueTextarea: {
      type: String
    },
    isFocus: {
      type: Boolean
    },
    currentIndexToDo: {
      type: Number
    }
  },
  data() {
    return {
      valueText: this.valueTextarea,
      toggleButtonSave: false
    }
  },
  methods: {
    toggleButtonS() {
      this.toggleButtonSave = !this.toggleButtonSave  
    },

    clickCreateTodo() {
      this.valueText = ''
      this.addToDoInList({
        type:'toDoList',
        notesListId: this.$route.params.id
      })
      this.toggleButtonS()
    },
    
    ...mapMutations([
      'addToDoInList',
      'addPropertyTodoList',
    ]),
  },
  
  watch: {
    isFocus(val) {
      if(!this.valueTextarea) return

      if (!val) {
        this.addPropertyTodoList({
          type:'toDoList',
          property: {
            name: "text",
            value: this.valueTextarea
          },
          notesListId: this.$route.params.id,
          indexTodo: this.currentIndexToDo
        })
      }
    },
    valueTextarea(val) {
      this.valueText = val
    }
  },
  components: {
    VButton,
    VAlert
  },
}
</script>
<style lang="scss" scoped>
.todo-creation{
  display: flex;
  justify-content: space-between;
  .button-create {
    color: #172b4d;
  }
  .button-left {
    display: flex;
  }
  .svg, .button-return, .button-create {
    display: flex;
    align-items: center;
    &:hover {
      background: rgba(0,0,0, 0.1);
      border-radius: 5px; 
    }
  }
}
</style>
