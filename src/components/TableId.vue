<template>
<VCard width="400px" padding="10px" class="table-id">
  <VInput
  @input="name=$event"
  :_value="tableItem.name"
  placeholder="name"
  class="input"/>
  <VInput
  @input="surname=$event"
  :_value="tableItem.surname"
  placeholder="surname" 
  class="input"/>
  <VInput
  @input="phone=$event"
  :_value="tableItem.phone"
  placeholder="phone" 
  class="input"/>
  <VInput
  @input="email=$event"
  :_value="tableItem.email"
  placeholder="email"
  class="input"/>
  or input JSON
  <VInput
  @input="parseJson"
  :_value="tableItem.json"
  placeholder='[{"name":"1","surname":"2","phone":"3","email":"4"}]'
  class="input"/>
  <div class="bottom">
    <TableCreation
    :disabled="isDisabled"
    :tableItemId="tableItemId"
    :name="name || tableItem.name"
    :surname="surname || tableItem.surname" 
    :phone="phone || tableItem.phone" 
    :email="email || tableItem.email"
    :json="json || tableItem.json"    
    class="table-creation"
    />
    <svg @click="$router.push('/') " class="back" style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z" />
    </svg>
  </div>
</VCard>
</template>

<script>
import VInput from '@/components/VInput'
import VCard from '@/components/VCard'
import TableCreation from '@/components/TableCreation'

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'TableId',
  data() {
    return {
      name: '',
      surname: '',
      phone: '',
      email: '',
      json: '',
      isJson: false
    }
  },
  computed: {
    isDisabled() {
      return (!!this.name.length && 
      !!this.surname.length &&
      !!this.phone.length && 
      !!this.email.length) || this.isJson
    },
    ...mapState([
      'tablesList'
    ]),

    tableItem() {
      return this.tablesList.find((item, index) => {
        return index === +this.$route.params.id
      });
    },
    
    tableItemId() {
      return +this.$route.params.id
    }
  },
  methods: {
    parseJson(val) {
      try {
        let obj = JSON.parse(val)
        let el = obj[0]
        this.setField(el)
        this.json = val

        if (!!el.name.length && !!el.surname.length && !!el.phone.length && !!el.email.length) {
          this.isJson = true  
        }
        
      } catch (error) {
        this.isJson = false
        return false  
      }
    },
    setField(data) {
      this.name = data.name
      this.surname = data.surname  
      this.phone = data.phone  
      this.email = data.email
      this.json = data.json
    }
  },
  mounted(){
    this.setField(this.tableItem)
  },
  components: {
    VInput,
    VCard,
    TableCreation
  }
}
</script>

<style lang="scss" scoped>
.table-id {
  .input {
    margin-bottom: 10px;
  }
  .table-creation {
    margin-bottom: 0;
  }
  .bottom {
    display: flex;
    justify-content: space-between;

    .back {
      cursor: pointer;
      &:hover {
        color: #fb8c00; 
      }   
    }
  }
}
.item {
  display: flex;
  align-items: center;
  &:hover {
    color: #fb8c00; 
  }
}
</style>
