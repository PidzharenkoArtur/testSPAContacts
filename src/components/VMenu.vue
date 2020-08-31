<template>
  <div class="menu">
    <div v-if="isStyleMenu" :style="styleMenu"></div> 
    <svg class="menu-open" @click="switchMenu" style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="#fb8c00" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
    </svg>
    <VCard v-if="isMenu" class="menu-container">
      <template #top>
        <VButton class="close" size="null">
          <svg @click="switchMenu" class="delete" style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#fb8c00" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </VButton>
      </template>
      <div class="menu-list">
        <slot/>
      </div>
    </VCard>
  </div>
</template>

<script>
import VCard from '@/components/VCard'
import VButton from '@/components/VButton'

export default {
  name: 'VMenu',
  props: {
    _isMenu: {},
  },
  data() {
    return {
      isStyleMenu: false,
      isMenu: false,
      styleMenu: {
        top: '0',
        content: "''",
        width: ' 100%',
        height: ' 100%'  ,
        position: 'fixed',
        left: '0',
        background: 'rgba(0,0,0,0.4)'  
      }
    }
  },
  methods: {
    switchMenu() {
      this.isMenu = !this.isMenu
      this.isStyleMenu = !this.isStyleMenu
    }
  },
  watch: {
    _isMenu() {
      this.isMenu = !this.isMenu 
      this.isStyleMenu=!this.isStyleMenu
    }
  },
  components: {
    VCard,
    VButton
  },
}
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  cursor: pointer;
  right: -28px;
  top: 0px;
  height: 24px;
  border: 2px solid;
  border-left: 0;
  background: rgb(235, 236, 240);
  .close {
    position: absolute;
    right: 0;
  }
  &-open, .delete {
    
    &:hover {
      background: rgba(0,0,0, 0.1);
    }
  }
  &-container {
    background: white;
    position: absolute;
    width: 100px;
    height: auto;
    left: 10px;
    top: 0px;
    padding: 10px;
    z-index: 1;
  }

  &-list {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: normal;
    gap: 15px; 
  }
}
</style>
