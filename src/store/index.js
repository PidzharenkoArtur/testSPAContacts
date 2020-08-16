import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        notesList: JSON.parse(localStorage.getItem('notesList')) || [],
        indexHistoryNotesList: null
    },
    mutations: {
        addList(state, item) {
            state[item.type].unshift(item)
            this.commit('setLocalStorage', item.type)
        },
        
        removeList(state, item) {
            state[item.type].splice(item.index, 1);
            
            this.commit('setLocalStorage', item.type)
        },
        
        addToDoInList({notesList}, item) {
            let {notesListId, type, ...rest} = item
            notesList[notesListId].todo.push(rest)

            this.commit('setLocalStorage', 'notesList')
        },
        removeToDoInList({notesList}, item) {
            notesList[item.noteIndex].todo.splice(item.index, 1);
            
            this.commit('setLocalStorage', item.type)
        },

        addPropertyTodoList({notesList}, item) {
            notesList[item.notesListId].todo[item.indexTodo][item.property.name] = item.property.value
            
            this.commit('setLocalStorage', 'notesList')
        },

        setLocalStorage(state, type) {
            localStorage.setItem(type, JSON.stringify(state[type]));
        }
    },

});