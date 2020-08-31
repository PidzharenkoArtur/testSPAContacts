<template>
  <div class="table-creation">
    <VButton
    :disabled="disabled"
    size="middle"
    color="green"
    @click="disabled&&clickCreateTableItem()"
    >
    Add user
    </VButton>
  </div>
</template>

<script>
import VButton from '@/components/VButton'
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'TableCreation',
  props: {
    disabled: {
      type: Boolean,
      default:true  
    },
    tableItemId: {
      type: Number,  
    },
    name: {
      type: String,
      default: ''
    },
    surname: {
      type: String,
      default: ''
    } ,
    phone: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    json: {
      type: String,
      default: ''
    } 
  },
  computed: {
    isTableItemId() {
      return this.tableItemId !== undefined
    },
    ...mapState([
      'tablesList'
    ]),

    tablesListLength() {
      return this.tablesList.length-1
    }
  },
  
  methods: {
    clickCreateTableItem() {
      if (this.isTableItemId) {
        this.editList({
          type:'tablesList',
          id: this.tableItemId, 
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          email: this.email,
          json: this.json,
        })

        this.$router.push('/') 
        return
      }

      this.addList({
        type:'tablesList',
        name: this.name,
        surname: this.surname,
        phone: this.phone,
        email: this.email,
        json: this.json,
      }) 
      this.$router.push('table/'+this.tablesListLength) 
    },
    
    ...mapMutations([
      'addList',
      'editList'
    ]),
  },
  components: {
    VButton
  },
}
</script>
<style lang="scss" scoped>
.table-creation{
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
</style>
