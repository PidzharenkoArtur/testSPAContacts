<template>
  <ContactId :key="componentKey" @rerender="componentKey++"/> 
</template>

<script>
import ContactId from '../components/ContactId'
export default {
  name: 'Contact',
  data() {
    return {
      componentKey:0
    }
  },
  components: {
    ContactId
  }
}
</script>
