import Vue from 'vue'

export const ACTIVE = 'ACTIVE'
const data = {
    isMini: false,
    isProdMini: false
}
export default {
    state: JSON.parse(sessionStorage.getItem('activeList')) || data,
    mutations: {
        [ACTIVE](state, activeList) {
            sessionStorage.setItem('activeList', JSON.stringify(activeList))
            Object.assign(state, activeList)
        }
    },
    actions: {
        [ACTIVE]({commit}, activeList) {
            commit(ACTIVE, activeList)
        }
    }
}