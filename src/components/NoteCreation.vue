<template>
  <VCard class="note-creation">
    <VInput
    @input="onInput"
    :_value="valueInput" 
    class="input"
    />

    <VButton
    :disabled="disabledButton"
    size="middle"
    color="green"
    @click="disabledButton && clickCreateNote()"
    >
    Создать заметку
    </VButton>
  </VCard>
</template>

<script>
import VButton from '@/components/VButton'
import VInput from '@/components/VInput'
import VCard from '@/components/VCard'
import { mapMutations } from 'vuex';

export default {
  name: 'NoteCreation',
  data() {
    return {
      disabledButton: false,
      valueInput: null,
    }
  },
  components: {
    VButton,
    VInput,
    VCard
  },
  methods: {
    onInput(val) {
      this.setDisabledButton(val)
      this.setValueInput(val)
    },
    
    setDisabledButton(val) {
      this.disabledButton = val.length > 0?true:false
    },
    setValueInput(val) {
      this.valueInput = val
    },
    clickCreateNote() {
      this.addList({
        type:'notesList',
        title: this.valueInput,
        todo: []
      })

      this.resetInput()
    },
    resetInput() {
      this.valueInput = ''
    },
    
    ...mapMutations([
      'addList',
    ]),
  }
}
</script>
<style lang="scss" scoped>
.note-creation{
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
}
</style>
