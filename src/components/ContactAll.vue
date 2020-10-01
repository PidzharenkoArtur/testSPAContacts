<template>
  <div class="contact-all">
    <ContactCreation/>
    <ContactList 
    :lists="contactsList"
    />
  </div>
</template>

<script>
import ContactCreation from '../components/ContactCreation'
import ContactList from '../components/ContactList'
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ContactAll',
  computed: {
    ...mapState([
      'contactsList'
    ])
  },
  
  components: {
    ContactList,
    ContactCreation
  }
}
</script>

<style lang="scss" scoped>
.contact-all {
  display: flex;
  flex-direction: column;
}
</style>

