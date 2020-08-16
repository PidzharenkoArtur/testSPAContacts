<template>
  <div 
  :style="styleElement"
  class="card">
    <div :style="styleElementTop" class="top">
      <slot name="top"/>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VCard',
  props: {
    width: {
      type:String
    },
    color: {
      type:String
    },
    boxShadow: {
      type: String
    },
    marginBottom: {
      type: String  
    },
    borderLeft: {
      type: String
    }
  },
  data() {
    return {
      styleElement: {
        width: this.width,
        background: this.color,
        boxShadow: this.boxShadow,
        borderLeft: this.borderLeft  
      },
      styleElementTop: {
        marginBottom: this.marginBottom   
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  border-radius: 5px; 
  padding: 5px;
  width: 355px;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
}
</style>
