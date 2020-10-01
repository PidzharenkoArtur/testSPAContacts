<template>
  <div class="contact-creation">
    <VButton
    :disabled="disabled"
    size="middle"
    color="green"
    @click="disabled&&clickCreateContactItem()"
    >
    Add contact
    </VButton>
  </div>
</template>

<script>
import VButton from '@/components/VButton'
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'ContactCreation',
  props: {
    disabled: {
      type: Boolean,
      default:true  
    },
    contactItemId: {
      type: Number,  
    }
  },
  computed: {
    isContactItemId() {
      return this.contactItemId !== undefined
    },
    ...mapState([
      'contactsList'
    ]),

    contactsListLength() {
      return this.contactsList.length-1
    }
  },
  
  methods: {
    clickCreateContactItem() {
      if (this.isContactItemId) {
        this.editList({
          type:'contactsList',
          id: this.contactItemId, 
          fields: [],
        })

        this.$router.push('/') 
        return
      }

      this.addList({
        type:'contactsList',
        fields: [],
      }) 
      this.$router.push('contact/'+this.contactsListLength) 
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
.contact-creation{
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
</style>
