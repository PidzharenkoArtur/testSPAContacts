import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        contactsList: JSON.parse(localStorage.getItem('contactsList')) || [],
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

        addListField(state, item) {
            state[item.type][item.id].fields.push(item.field)
            this.commit('setLocalStorage', item.type)
        },

        saveListField(state, item) {
            state[item.type][item.id].fields[item.indexField] = item.field
            this.commit('setLocalStorage', item.type)
        },
        
        deleteListField(state, item) {
            state[item.type][item.id].fields.splice(item.indexField, 1)
            this.commit('setLocalStorage', item.type)
        },

        clearListField(state, item) {
            let itemList = state[item.type][item.id]
            if (!itemList) return
            
            let fields = itemList.fields
            fields.forEach((el, i)=> {
                if (!el.name && !el.value) {
                    fields.splice(i,1)    
                }
            })

            if (!fields.length) {
                state[item.type].splice(item.id, 1);
            }
            this.commit('setLocalStorage', item.type)
        },

        setLocalStorage(state, type) {
            localStorage.setItem(type, JSON.stringify(state[type]));
        }
    },

});