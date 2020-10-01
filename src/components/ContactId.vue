<template>
  <VCard width="540px" padding="10px" class="contact-id">
    <VButton 
    text="true"  
    @click="back"
    class="back"
    >
      <svg @click="$router.push('/')" style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z" />
      </svg>
      <div>
        back
      </div> 
    </VButton>
    <VField
    v-for="(field, index) in contactItemFields"
    :key="index"
    :_name="field.name"
    :_value="field.value"
    :index="index"
    @saveField="saveField({event:$event, index: index})"
    @deleteField="deleteField"
    class="input"
    /> 
    <VButton
      v-if="isAddField" 
      text="true"
      @click="addField" class="hover">
      <svg  style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
      </svg>
      <div>
        add
      </div>
    </VButton>
    <VDialog
    v-if="isDialogDelete"
    @confirm="confirmDelete" 
    message="Are you sure, you want to do this?"
    />
  </VCard>
</template>

<script>
import VField from '@/components/VField'
import VButton from '@/components/VButton'
import VDialog from '@/components/VDialog'
import VCard from '@/components/VCard'

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ContactId',
  data() {
    return {
      isAddField: true,
      isDialogDelete: false,
      currentIndex: 0,
    }
  },
  computed: {
    ...mapState([
      'contactsList'
    ]),

    contactItem() {
      return this.contactsList.find((item, index) => {
        return index === +this.$route.params.id
      });
    },
    contactItemFields() {
      if (this.contactItem && !this.contactItem.fields.length) {
        this.addField()
      }
      return this.contactItem.fields
    },
    contactItemId() {
      return +this.$route.params.id
    },
    lastItem() {
      return this.contactItemFields.length-1
    }
  },
  mounted() {
    if (!this.contactItemFields[this.lastItem].name) {
      this.hideButtonAddField(false)  
    }
  },
  methods: {
    hideButtonAddField(b) {
      this.isAddField = b
    },
    back() {
      this.clearListField({
        type: 'contactsList',
        id: this.contactItemId
      })
      this.$router.push('/')
    },
    addField() {
      this.hideButtonAddField()
      this.addListField({
        type: 'contactsList',
        id: this.contactItemId,
        field: {
          name: '',
          value: ''
        } 
      })
    },
    saveField(data) {
      this.hideButtonAddField(true)
      this.saveListField({
        type: 'contactsList',
        id: this.contactItemId,
        indexField: data.index,
        field: {
          name: data.event.name,
          value: data.event.value
        } 
      })
    },
    deleteField(index) {
      this.isDialogDelete = !this.isDialogDelete
      this.currentIndex = index
    },
    confirmDelete(result) {
      this.isDialogDelete = !this.isDialogDelete

      if (!result) return
      this.deleteListField({
        type: 'contactsList',
        id: this.contactItemId,
        indexField: this.currentIndex 
      })

      this.$emit('rerender')
    },
    ...mapMutations([
      'addListField',
      'saveListField',
      'deleteListField',
      'clearListField',
    ])
  },
  components: {
    VField,
    VButton,
    VDialog,
    VCard
  }
}
</script>

<style lang="scss" scoped>
.contact-id {
  .contact-creation {
    margin-bottom: 0;
  }
  .hover {
    cursor: pointer;
    &:hover {
      color: #fb8c00;
    }
  }
  .back {
    margin-bottom: 20px;
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
