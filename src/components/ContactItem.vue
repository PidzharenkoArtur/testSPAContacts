<template>
  <VCard
  v-if="item.fields.length" 
  class="contact-item"
  color="#ebecf0"
  boxShadow="none"
  width="70%"
  >
  <div class="caption">
    <div
    :style="'width:' + 100 / item.fields.length +'%'" 
    class="title"
    v-for="(field, index) in item.fields" 
    :key="index"
    >
      {{field.name}}   
    </div>
  </div>
  <template #top>
    <div class="settings">
      <VMenu :_isMenu="isMenu"> 
        <slot name="menu-list"/>
        <div @click="deleteItem" class="item">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
          Delete
        </div>
        
      </VMenu>
    </div>
  </template>
  <slot name="contactRow">
    <div class="tr">
      <div
      :style="'width:' + 100 / item.fields.length +'%'" 
      v-for="(field, index) in item.fields" 
      :key="index"
      class="td td-first"
      >
        {{field.value}}
      </div>
  </div>  
  </slot>
  <VDialog
    v-if="isDialogDelete"
    @confirm="confirmDelete" 
    message="Are you sure, you want to do this?"
    />
  </VCard>
</template>

<script>
import VCard from '@/components/VCard'
import VMenu from '@/components/VMenu'
import VDialog from '@/components/VDialog'

import { mapMutations, mapState } from 'vuex';

export default {
  name: 'ContactItem',
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
      isDialogDelete: false,
      isMenu: false,
    }
  },
  methods: {
    deleteItem() {
      this.isDialogDelete = !this.isDialogDelete
    },    
    confirmDelete(result) {
      this.isDialogDelete = !this.isDialogDelete
      if(!result) return

      this.removeItem({
        type: 'contactsList',
        index: this.index
      })
      this.isMenu = !this.isMenu
    },
    ...mapMutations([
      'removeItem',
    ]),
  },
  components: {
    VCard,
    VMenu,
    VDialog
  }
}
</script>
<style lang="scss" scoped>
.contact-item {
  font-size: 16px;
  border: 2px solid;
  box-sizing: border-box;
  margin-right: 40px;
  margin-bottom: 40px;  
  .caption {
    display: flex;
    width: 100%;
    background: rgb(251, 100, 0);
    color: white;
    font-weight: bold;  

    .title {
      border-right: 2px solid black;
      padding: 10px;
      padding-left: 0;
      padding-right: 0;
      box-sizing: border-box;
      text-align: center;
    }
    .title-last {
      border-right: 0;
    }  
  }
  .title {
    word-break: break-word;
  }
  .tr {
    display: flex;
    width: 100%;
  }
  .td {
    border: 1px solid;
    border-top: 2px solid;
    border-right: 2px solid;
    border-bottom: 0px;
    padding-left: 0;
    padding-right: 0;
    padding: 10px;
    text-align: center;
    word-break: break-word;
    box-sizing: border-box;
  }
  .td-last {
    border-right: 0;
  }
  .td-first {
    border-left: 0; 
  } 
  .settings {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    position: relative;
    top: -2px;
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
