<template>
  <VCard 
  class="table-item"
  color="#ebecf0"
  width="100%"
  boxShadow="none"
  >
  <template #top>
    <div class="settings">
      <VMenu :_isMenu="isMenu"> 
        <slot name="menu-list"/>
        <div @click="deleteItem()" class="item">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
          Delete
        </div>
        
      </VMenu>
    </div>
  </template>
  <slot name="tableRow">
    <div class="tr">
      <div class="td td-first">
        {{item.name}}  
      </div>
      <div class="td">
        {{item.surname }}   
      </div>
      <div class="td">
        {{item.phone }}   
      </div>
      <div class="td td-last">
        {{item.email}}    
    </div>
  </div>  
  </slot>
  </VCard>
</template>

<script>
import VCard from '@/components/VCard'
import VMenu from '@/components/VMenu'
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'TableItem',
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
      isMenu: false,
    }
  },
  methods: {
    deleteItem() {
      this.removeItem({
        type: 'tablesList',
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
    VMenu
  }
}
</script>
<style lang="scss" scoped>
.table-item {
  font-size: 16px;
  box-sizing: border-box;
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
    border-bottom: 1px solid;
    padding-left: 0;
    padding-right: 0;
    width: 25%;
    padding: 10px;
    text-align: center;
    word-break: break-word;
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
