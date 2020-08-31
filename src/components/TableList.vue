<template>
  <VCard width="400px;" class="table-list">
    <div class="caption">
      <div class="title">
        name   
      </div>
      <div class="title">
        surname   
      </div>
      <div class="title">
        phone   
      </div>
      <div class="title title-last">
        email   
      </div>
    </div>
    <div class="body">
      <TableItem
      v-for="(list, i) in lists"
      :item="list" 
      :index="i"
      :key="i"
      >
        <template #menu-list>
          <div @click="editTable(i)" class="item">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
            </svg>
            Edit
          </div>  
        </template>
      </TableItem>
    </div>
  </VCard>
</template>

<script>
import TableItem from '@/components/TableItem'
import VCard from '@/components/VCard'

export default {
  name: 'TableList',
  props: {
    lists: {
      type:Array
    }
  },
  methods: {
    editTable(i) {
      this.$router.push('table/'+i) 
    },
  },
  components: {
    TableItem,
    VCard
  }
}
</script>
<style lang="scss" scoped>
.table-list{
  display: flex;
  flex-wrap: wrap;
  border: 2px solid;
  .caption {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background: rgb(251, 100, 0);
    color: white;
    font-weight: bold;  

    .title {
      border-right: 2px solid black;
      padding: 10px;
      padding-left: 0;
      padding-right: 0;
      width: 25%;
      text-align: center;
    }
    .title-last {
      border-right: 0;
    }  
  }
  .body {
    width: 100%;  
  }
  .item {
    display: flex;
    align-items: center;
    &:hover {
      color: #fb8c00; 
    }
  }
}
</style>
