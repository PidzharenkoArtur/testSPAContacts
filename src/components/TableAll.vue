<template>
  <div class="table-all">
    <TableCreation/>
    <TableList 
    v-if='tableList&&tableList.length > 0'
    :lists="tableList"
    />
  </div>
</template>

<script>
import TableCreation from '../components/TableCreation'
import TableList from '../components/TableList'
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'NoteAll',
  data() {
    return {
      tableList: null
    }
  },
  watch: {
    tablesList(val) {
      this.tableList = val
    }
  },
  computed: {
    ...mapState([
      'tablesList'
    ])
  },
  methods: {
    listsTable() {
      return this.tablesList.filter((el,i)=> {
        if (!el.name.length && !el.surname.length && !el.phone.length && !el.email.length) {
          this.removeItem({
            type: 'tablesList',
            index: i
          })
          return false
        }

        return true
      })
    },
    isListsTable() {
      return this.listsTable.length > 0
    },
    ...mapMutations([
      'removeItem',
    ]),
  },
  mounted() {
    this.tableList = this.listsTable()
  },
  components: {
    TableList,
    TableCreation
  }
}
</script>

<style lang="scss" scoped>
.table-all {
  display: flex;
  flex-direction: column;
}
</style>

