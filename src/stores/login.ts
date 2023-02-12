import { defineStore } from 'pinia'
import axios from "axios";

export const useLoginStore = defineStore('login', {

    state: () => ({
        username: null,
        isLogin: false,
        token: ""
    }),
    getters: {

    },
    actions: {
        login(username, password) {

        },

        register(username, password, email) {

        }
    }
})
