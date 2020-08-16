<template>
  <div class="note-all">
    <NoteCreation/>
    <NoteList :lists="notesList"/>
  </div>
</template>

<script>
import NoteCreation from '../components/NoteCreation'
import NoteList from '../components/NoteList'
import { mapState } from 'vuex';

export default {
  name: 'NoteAll',
  computed: {
    ...mapState([
      'notesList'
    ])
  },
  components: {
    NoteList,
    NoteCreation
  }
}
</script>

<style lang="scss" scoped>
.note-all {
  display: flex;
  flex-direction: column;
}
</style>

