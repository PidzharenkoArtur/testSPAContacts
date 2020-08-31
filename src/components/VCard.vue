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
    },
    padding: {
      type: String  
    }
  },
  data() {
    return {
      styleElement: {
        width: this.width,
        background: this.color,
        boxShadow: this.boxShadow,
        borderLeft: this.borderLeft,
        padding: this.padding
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
  width: 355px;

  .top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 0;
  }
}
</style>
