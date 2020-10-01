<template>
<div class="dialog">
  <VCard class="card" width="300px">
      <div>{{message}}</div> 
      <VButton class="button-confirm" :disabled="true" size="small" color="green" @click="confirm">yes</VButton>
      <VButton :disabled="true" size="small" color="red" @click="cancel">no</VButton>
  </VCard>
</div>
</template>

<script>
import VCard from '@/components/VCard'
import VButton from '@/components/VButton'

export default {
  name: 'VDialog',
  props: {
    message: {
      type: String
    }
   
  },
  data() {
    return {}
  },
  methods: {
    confirm() {
      this.$emit('confirm', true)
    },
    cancel() {
      this.$emit('confirm', false)
    }
  },
  components: {
    VCard,
    VButton
  }
 
}
</script>

<style lang="scss" scoped>
.dialog {
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  .card {
    background: white;
    padding: 10px;
    display: flex;
  }

  background: rgba(0, 0, 0, 0.2);
  .top {
    font-size: 18px;
    padding-left: 10px;
    margin-bottom: 10px;
    margin-top: -10px;
  }
  .button-confirm {
    margin-right: 10px;
    margin-left: 10px;
  }
}

</style>
