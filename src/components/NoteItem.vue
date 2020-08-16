<template>
  <div>
    <VCard 
    class="note-item"
    color="#ebecf0"
    width="300px;"
    >
    <template #top>
      <div class="title">
        {{item.title}}
      </div>
      <div class="settings">
        <VMenu :_isMenu="isMenu"> 
          <slot name="menu-list"/>
          <div @click="deleteNote()" class="item">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
            Удалить
          </div>
          
        </VMenu>
      </div>
    </template>
    <slot name="todo">
      <ToDoList
      :isMenu="false"
      :list="toDoList"
      />
    </slot>
    </VCard>
    <VDialog 
      @confirm="response"
      v-if="isDialog" 
      :message="'Вы уверенны, что хотите удалить заметку?'"
    />
  </div>
</template>

<script>
import VCard from '@/components/VCard'
import VMenu from '@/components/VMenu'
import ToDoList from '@/components/ToDoList'
import VDialog from '@/components/VDialog'
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'NoteItem',
  props: {
    item: {
      type:Object
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      isDialog: false,
      isMenu: false
    }
  },
  computed: {
    toDoList() {
      if (!this.item.todo) return
      return this.item.todo.filter((el, i)=>{return i===0 || i===1})
    }
  },
  methods: {
    deleteNote() {
      this.isDialog = !this.isDialog 
    },

    response(e) {
      this.isDialog = e

      if (e) {
        this.removeList({
          type: 'notesList',
          index: this.index
        })
        this.isDialog = !e
        this.isMenu = true
        if (this.$route.path !== '/') {
          this.$router.push('/')  
        }
      }
    },    
    
    ...mapMutations([
      'removeList',
    ]),
  },
  components: {
    VCard,
    VDialog,
    VMenu,
    ToDoList
  }
}
</script>
<style lang="scss" scoped>
.note-item {
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
  .title {
    width: 200px;
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
