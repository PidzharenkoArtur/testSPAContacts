<template>
  <div  class="contact-list">
    <ContactItem
    v-for="(list, i) in lists"
    :item="list" 
    :index="i"
    :key="i"
    >
      <template #menu-list>
        <div @click="editContact(i)" class="item">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
          </svg>
          Edit
        </div>  
      </template>
    </ContactItem>
  </div>
</template>

<script>
import ContactItem from '@/components/ContactItem'

export default {
  name: 'ContactList',
  props: {
    lists: {
      type:Array
    }
  },
  methods: {
    editContact(i) {
      this.$router.push('contact/'+i) 
    },
  },
  components: {
    ContactItem
  }
}
</script>
<style lang="scss" scoped>
.contact-list{
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
