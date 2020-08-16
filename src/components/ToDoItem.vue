<template>
  <VCard
  :key="isState" 
  class="todo-item"
  color="white"
  boxShadow="0 3px 5px rgba(0, 0, 0, 0.5)"
  marginBottom="0px"
  :borderLeft="item.mark?'4px solid #4caf50':''"
  width="100%"
  >
  <template #top>
    <div :style="styleElementTextToDo" v-if="isEdit" class="text">
      {{item.text}}
    </div>
    <textarea
    v-if="!isEdit" 
    @input="inputText"
    @blur="blurTextarea"
    @focus="focusTextarea"
    rows='1'
    placeholder="Введите текст"
    class="textarea" 
    ref="textarea" >
    </textarea>
    <div v-if="showMenu" class="settings">
      <VMenu :_isMenu="isState"> 
        <slot name="menu-list"/>
        <div @click="editText()" class="item">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
          </svg>
          Редактировать текст
        </div>
        <div v-if="!item.mark" @click="markTask()" class="item">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
          </svg>
          Отметить задачу
        </div>
        <div @click="deleteToDo()" class="item">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
          Удалить задачу
        </div>
        
      </VMenu>
    </div>
  </template>
  <slot name="todo"/>
  </VCard>
    
</template>

<script>
import VCard from '@/components/VCard'
import VMenu from '@/components/VMenu'

import { mapMutations } from 'vuex';

export default {
  name: 'ToDoItem',
  props: {
    noteIndex: {
      type: Number
    },
    item: {
      type:Object
    },
    index: {
      type: Number
    },
    isMenuTodo: {
      type: Boolean
    },
    widthTextToDo: {
      type: String
    }
  },
  data() {
    return {
      styleElementTextToDo: {
        width: this.widthTextToDo
      },
      isDialog: false,
      isState: false,
      isEdit: false,
    }
  },
  computed: {
    showMenu() {
      return this.isMenuTodo && this.isEdit
    }
  },
  mounted() {
    this.includeModeToDo()
  },
  methods: {
    toggleMenu() {
      this.isState = !this.isState
    },
    includeModeToDo() {
      if (this.item.text) {
        this.isEdit=true
        return
      } 

      this.$refs.textarea.focus()
    },
    editText() {
      this.isEdit = !this.isEdit

      this.$nextTick(() => {
        this.$refs.textarea.value = this.item.text
        this.$refs.textarea.focus()
      });
      this.toggleMenu() 
    },
    markTask() {
      this.addPropertyTodoList({
        property: {
          name: "mark",
          value: true
        },
        notesListId: this.noteIndex,
        indexTodo: this.index
      })
      this.toggleMenu()
    },
    deleteToDo() {
      this.removeToDoInList({
        type: 'notesList',
        index: this.index,
        noteIndex: this.noteIndex
      })
      this.toggleMenu() 
    },
    focusTextarea() {
      this.$emit('focus', true)
    },
    blurTextarea(e) {
      this.$emit('focus', false)

      if (!e.target.value) {
        this.deleteToDo()
        return
      }
      this.isEdit = !this.isEdit
    },
    inputText(e) {
      this.expandingTextarea(e) 
      
      this.$emit('inputTextarea', e.target.value)
      this.$emit('indexToDo', this.index)
    },

    expandingTextarea(e) {
      let el = e.target

      setTimeout(()=>{
        el.style.cssText = 'padding:0;';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
      },100)
    },
   
    ...mapMutations([
      'removeToDoInList',
      'addPropertyTodoList',
    ]),
  },
  components: {
    VCard,
    VMenu
  }
}
</script>
<style lang="scss" scoped>
.todo-item {
  margin-bottom: 10px;
  font-size: 15px;
  .textarea {
    overflow: hidden;
    overflow-wrap: break-word;
    resize: none;
    width: 100%;
    height: auto;
    margin: auto;
    background-color: #fff;
    border: none;
    box-shadow: none;
    outline: none;
    padding:5px;
  }
  .text {
    font-weight: normal;
    word-break: break-word;
  }
  .settings {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    .item {
      display: flex;
      align-items: center;
      &:hover {
        color: #fb8c00; 
      }
    }
    .delete, .edit {
      cursor: pointer;
    }
  }
  
}
</style>
