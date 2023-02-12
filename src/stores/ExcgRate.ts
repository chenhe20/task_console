
import { defineStore } from 'pinia'
import axios from 'axios'

export const useExcgRateStore = defineStore('excgRate', {

    state: () => ({
        excgRates: []
    }),
    getters: {

    },
    actions: {
        fetchRecentExcgRate() {
            axios.get("http://3.84.116.122:8088/excgrate/recent").then(res => {
                this.excgRates = res.data.data
            }).catch(error => {
                console.log(error)
            })
        }
    }
})
