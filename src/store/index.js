import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tablesList: JSON.parse(localStorage.getItem('tablesList')) || [],
        indexHistoryNotesList: null
    },
    mutations: {
        addList(state, item) {
            state[item.type].push(item)
            this.commit('setLocalStorage', item.type)
        },

        editList(state, item) {
            state[item.type][item.id] = item
            this.commit('setLocalStorage', item.type)
        },
        
        removeItem(state, item) {
            state[item.type].splice(item.index, 1);
            this.commit('setLocalStorage', item.type)
        },

        setLocalStorage(state, type) {
            localStorage.setItem(type, JSON.stringify(state[type]));
        }
    },

});