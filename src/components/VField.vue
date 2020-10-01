<template>
<div class="field">
  <div v-if="isEdit" class="field-item">
    <input
    v-model="name"
    class="input"
    placeholder="Fill name"
    />
    <input
    v-model="value"
    class="input"
    placeholder="Fill value"
    />
  </div>
  <div v-else class="field-item-noedit">
    <div>{{name || 'some name'}}</div>
    :
    <div>{{value || 'some value'}}</div>  
  </div>
  <div class="action">
    <VButton
    @click="edit"
    v-if="!isEdit"
    text="true"
    >
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
      </svg>  
      edit
    </VButton>
    <VButton
    v-if="!isEdit && name"
    text="true"
    @click="$emit('deleteField',index)"
    >  
      <svg class="hover" style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
      </svg>
      delete
    </VButton>
    <VButton
    v-if="isSave && isEdit"
    @click="save"
    text="true"
    >
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
      </svg>
      save
    </VButton>
    <VButton
    v-if="isEdit"
    @click="cancel"
    text="true"
    >
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M16.5 8C14 8 12 10 12 12.5S14 17 16.5 17 21 15 21 12.5 19 8 16.5 8M16.5 15.5C14.8 15.5 13.5 14.2 13.5 12.5C13.5 11.9 13.7 11.4 13.9 11L18 15.1C17.6 15.3 17.1 15.5 16.5 15.5M19.1 14L15 9.9C15.4 9.6 15.9 9.5 16.5 9.5C18.2 9.5 19.5 10.8 19.5 12.5C19.5 13.1 19.3 13.6 19.1 14M12.1 7.7L10.6 6.2L13.9 2.9C14.5 2.3 15.4 2.3 16 2.9L18.2 5C18.6 5.4 18.7 5.8 18.6 6.3C18 6.1 17.3 6 16.6 6C14.8 6 13.3 6.7 12.1 7.7M10.5 14.9L9 16.3C8.4 16.9 7.5 16.9 6.9 16.3L6.2 17H2L4.8 14.2C4.2 13.6 4.2 12.7 4.8 12.1L9.5 7.4L11.1 9C10.4 10 10 11.2 10 12.5C10 13.3 10.2 14.1 10.5 14.9Z" />
      </svg> 
      cancel
    </VButton>
    
  </div>
  <VDialog
    v-if="isDialogCancel"
    @confirm="confirmCancel" 
    message="Are you sure, you want to do this?"
  />
</div>
</template>

<script>
import VButton from '@/components/VButton'
import VDialog from '@/components/VDialog'

export default {
  name: 'VField',
  props: {
    _name: {
      type:String
    },
    _value: {
      type:String
    },
    index: {
      type:Number 
    }
  },
  data() {
    return {
      isEdit:false,
      isDialogCancel: false,
      value: this._value,
      name: this._name,
    }
  },
  computed: {
    isSave() {
      return (this.value && this.name) ?true:false
    }
  },
  watch: {
    name(val) {
      this.$emit('inputName', {name: val, value: this.value})
    },
    value(val) {
      this.$emit('inputValue', {value: val, name: this.name})
    }
  },
  methods: {
    edit() {
      this.isEdit=!this.isEdit
    },
    save() {
      this.isEdit = !this.isEdit
      this.$emit('saveField',{value: this.value, name: this.name})
    },
    cancel() {
      this.isDialogCancel = !this.isDialogCancel
    },
    confirmCancel(result) {
      this.isDialogCancel = !this.isDialogCancel
      if (!result) return
      this.value = this._value
      this.name = this._name
      this.isEdit = !this.isEdit
    }
  },
  components: {
    VButton,
    VDialog
  }
}
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
  margin-bottom: 10px;
  .field-item {
    display: flex;
    padding: 5px;
    justify-content: space-between;

    .input{
      margin-right: 2px;
      box-sizing: border-box;
      font-weight: bold;
      padding: 9px;
      border:2px solid #fb8c00;
      border-radius: 5px; 
      outline: none;
      min-height: 48px;
   
    }
  }
  .field-item-noedit {
    display: flex;
    padding: 5px;
    gap: 10px;
  }
  .action {
    display: flex;
    padding: 5px;
    flex-wrap: wrap;
  }
}
</style>
