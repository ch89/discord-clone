import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            channel: null
        }
    },
    mutations: {
        change(state, channel) {
            state.channel = channel
        }
    }
})